// Quiz événement — logique serveur (jamais envoyée au navigateur).
// Les questions ET les bonnes réponses ne sont pas dans le code (le dépôt GitHub est public) :
// elles sont stockées dans Vercel Blob (dossier "quiz-config/"), envoyées avec `node scripts/quiz-config.mjs`.
// En local, si le fichier quiz-config.local.json existe à la racine, il est utilisé directement.
import { put, list } from "@vercel/blob";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index de la bonne réponse dans options
}

export interface QuizConfig {
  eventId: string;      // identifiant de la soirée, ex. "soiree-2026-11-27"
  title: string;        // titre affiché sur la page
  subtitle?: string;
  durationSec: number;  // durée totale du quiz (240 = 4 min)
  adminKey: string;     // clé d'accès à la page /quiz/classement
  questions: QuizQuestion[];
}

export interface Participant {
  prenom: string;
  nom: string;
  age: number;
  email: string;
  scene: boolean; // « Tu es prêt à monter sur scène ? »
}

export interface QuizResult extends Participant {
  score: number;
  total: number;
  timeMs: number;
  late: boolean;
  startedAt: number;
  submittedAt: number;
}

const LOCAL_CONFIG = path.join(process.cwd(), "quiz-config.local.json");
const LOCAL_DATA = path.join(process.cwd(), ".quiz-data");
const blobEnabled = () => !!process.env.BLOB_READ_WRITE_TOKEN;

/* ── Config ─────────────────────────────────────────────────────── */
let cache: { at: number; config: QuizConfig | null } | null = null;

export async function getConfig(): Promise<QuizConfig | null> {
  if (cache && Date.now() - cache.at < 30_000) return cache.config;
  let config: QuizConfig | null = null;
  try {
    config = JSON.parse(await fs.readFile(LOCAL_CONFIG, "utf8"));
  } catch {
    if (blobEnabled()) {
      const { blobs } = await list({ prefix: "quiz-config/", limit: 100 });
      const latest = blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))[0];
      if (latest) config = await (await fetch(latest.url, { cache: "no-store" })).json();
    }
  }
  cache = { at: Date.now(), config };
  return config;
}

/* ── Stockage (Vercel Blob en ligne, dossier local en dev) ─────── */
async function writeJson(pathname: string, data: unknown) {
  const body = JSON.stringify(data);
  if (blobEnabled()) {
    await put(pathname, body, { access: "public", addRandomSuffix: true, contentType: "application/json" });
    return;
  }
  await fs.mkdir(LOCAL_DATA, { recursive: true });
  await fs.writeFile(path.join(LOCAL_DATA, `${pathname.replace(/\//g, "__")}-${Date.now()}.json`), body);
}

async function listUrls(prefix: string, limit?: number): Promise<string[]> {
  if (blobEnabled()) {
    const urls: string[] = [];
    let cursor: string | undefined;
    do {
      const res = await list({ prefix, cursor, limit: limit ?? 1000 });
      urls.push(...res.blobs.map((b) => b.url));
      cursor = res.hasMore && !limit ? res.cursor : undefined;
    } while (cursor);
    return urls;
  }
  try {
    const flat = prefix.replace(/\//g, "__");
    const files = (await fs.readdir(LOCAL_DATA)).filter((f) => f.startsWith(flat));
    return files.slice(0, limit ?? files.length).map((f) => path.join(LOCAL_DATA, f));
  } catch {
    return [];
  }
}

async function readJson<T>(urlOrFile: string): Promise<T> {
  if (urlOrFile.startsWith("http")) return (await fetch(urlOrFile, { cache: "no-store" })).json();
  return JSON.parse(await fs.readFile(urlOrFile, "utf8"));
}

/* ── Participants & résultats ───────────────────────────────────── */
export const emailHash = (email: string) =>
  createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 32);

const pParticipant = (ev: string, h: string) => `quiz/${ev}/participants/${h}`;
const pResult = (ev: string, h: string) => `quiz/${ev}/results/${h}`;

export async function hasStarted(ev: string, h: string) {
  return (await listUrls(pParticipant(ev, h), 1)).length > 0;
}
export async function saveParticipant(ev: string, h: string, p: Participant & { startedAt: number }) {
  await writeJson(pParticipant(ev, h), p);
}
export async function getResult(ev: string, h: string): Promise<QuizResult | null> {
  const [url] = await listUrls(pResult(ev, h), 1);
  return url ? readJson<QuizResult>(url) : null;
}
export async function saveResult(ev: string, h: string, r: QuizResult) {
  await writeJson(pResult(ev, h), r);
}
export async function getAllResults(ev: string): Promise<QuizResult[]> {
  const urls = await listUrls(`quiz/${ev}/results/`);
  const all = await Promise.all(urls.map((u) => readJson<QuizResult>(u).catch(() => null)));
  // un seul résultat par email (le premier envoyé)
  const byEmail = new Map<string, QuizResult>();
  for (const r of all) {
    if (!r) continue;
    const k = r.email.toLowerCase();
    const prev = byEmail.get(k);
    if (!prev || r.submittedAt < prev.submittedAt) byEmail.set(k, r);
  }
  return [...byEmail.values()].sort((a, b) =>
    Number(a.late) - Number(b.late) || b.score - a.score || a.timeMs - b.timeMs);
}

/* ── Jeton signé : l'heure de départ ne peut pas être trafiquée ─── */
const secret = () => `ft-quiz:${process.env.BLOB_READ_WRITE_TOKEN ?? "dev-local"}`;
const b64 = (s: string) => Buffer.from(s).toString("base64url");
const sig = (data: string) => createHmac("sha256", secret()).update(data).digest("base64url");

export interface TokenData extends Participant { ev: string; h: string; s: number }

export function signToken(d: TokenData) {
  const data = b64(JSON.stringify(d));
  return `${data}.${sig(data)}`;
}
export function verifyToken(token: string): TokenData | null {
  const [data, s] = String(token).split(".");
  if (!data || !s) return null;
  const expected = Buffer.from(sig(data));
  const given = Buffer.from(s);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try { return JSON.parse(Buffer.from(data, "base64url").toString()); } catch { return null; }
}

export const publicQuestions = (c: QuizConfig) => c.questions.map(({ q, options }) => ({ q, options }));
