// Quiz événement — logique serveur (jamais envoyée au navigateur).
// Les questions, les bonnes réponses et le code d'accès ne sont pas dans le code (le dépôt GitHub est public) :
// ils sont stockés dans Vercel Blob, envoyés avec `node scripts/quiz-config.mjs`.
// En local, si le fichier quiz-config.local.json existe à la racine, il est utilisé directement.
//
// ⚠️ Offre Hobby de Vercel Blob : 2 000 opérations « avancées » (put/list) et 10 000 « simples » (head/lecture) par mois,
// et le stockage est COUPÉ si on dépasse. Tout ici est donc conçu pour en consommer le moins possible :
// - 1 put à l'inscription, 1 put à l'envoi des réponses (chemins fixes : un doublon est refusé sans list)
// - config lue via head() et gardée en mémoire 60 s
// - classement : 1 list au maximum toutes les 30 s, chaque résultat n'est lu qu'une seule fois (immuable)
import { put, list, head } from "@vercel/blob";
import { createHmac, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index de la bonne réponse dans options
  cat?: string;   // catégorie (ex. "facs") — par défaut "base"
}

export interface QuizCategory { id: string; label: string }

export interface QuizConfig {
  eventId: string;      // identifiant de la soirée, ex. "quiz-2026-11-27"
  title: string;        // titre affiché sur la page
  subtitle?: string;
  durationSec: number;  // durée totale du quiz (300 = 5 min)
  adminKey: string;     // clé d'accès à la page /quiz/classement
  accessCode?: string;  // si défini : le quiz n'est accessible que via /quiz?c=<code> (lien du QR code)
  categories?: QuizCategory[]; // scores séparés affichés dans le classement (jamais aux joueurs)
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
  byCat?: Record<string, { score: number; total: number }>;
  timeMs: number;
  late: boolean;
  startedAt: number;
  submittedAt: number;
}

const LOCAL_CONFIG = path.join(process.cwd(), "quiz-config.local.json");
const LOCAL_DATA = path.join(process.cwd(), ".quiz-data");
const blobEnabled = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const secret = () => `ft-quiz:${process.env.BLOB_READ_WRITE_TOKEN ?? "dev-local"}`;
const hmac = (s: string) => createHmac("sha256", secret()).update(s).digest("hex").slice(0, 32);

/** Chemin (secret) de la config dans Blob — même calcul dans scripts/quiz-config.mjs */
export const configPathname = () => `quiz-config/${hmac("config")}.json`;

/* ── Config ─────────────────────────────────────────────────────── */
let cfgCache: { at: number; config: QuizConfig | null } | null = null;

export async function getConfig(): Promise<QuizConfig | null> {
  if (cfgCache && Date.now() - cfgCache.at < 60_000) return cfgCache.config;
  let config: QuizConfig | null = null;
  try {
    config = JSON.parse(await fs.readFile(LOCAL_CONFIG, "utf8"));
  } catch {
    if (blobEnabled()) {
      try {
        const h = await head(configPathname());
        config = await (await fetch(`${h.url}?v=${+new Date(h.uploadedAt)}`, { cache: "no-store" })).json();
      } catch {
        config = cfgCache?.config ?? null; // en cas de souci réseau, on garde la dernière version connue
      }
    }
  }
  cfgCache = { at: Date.now(), config };
  return config;
}

/* ── Stockage (Vercel Blob en ligne, dossier local en dev) ─────── */
class AlreadyExists extends Error {}
const localFile = (pathname: string) => path.join(LOCAL_DATA, pathname.replace(/\//g, "__"));

async function exists(pathname: string) {
  if (blobEnabled()) { try { await head(pathname); return true; } catch { return false; } }
  try { await fs.access(localFile(pathname)); return true; } catch { return false; }
}

async function writeOnce(pathname: string, data: unknown) {
  const body = JSON.stringify(data);
  if (blobEnabled()) {
    try {
      await put(pathname, body, { access: "public", addRandomSuffix: false, allowOverwrite: false, contentType: "application/json" });
    } catch (e) {
      if (await exists(pathname)) throw new AlreadyExists();
      throw e;
    }
    return;
  }
  await fs.mkdir(LOCAL_DATA, { recursive: true });
  try { await fs.writeFile(localFile(pathname), body, { flag: "wx" }); } catch { throw new AlreadyExists(); }
}

async function readOne<T>(pathname: string): Promise<T | null> {
  try {
    if (blobEnabled()) { const h = await head(pathname); return (await fetch(h.url, { cache: "no-store" })).json(); }
    return JSON.parse(await fs.readFile(localFile(pathname), "utf8"));
  } catch { return null; }
}

/* ── Participants & résultats ───────────────────────────────────── */
export const emailKey = (email: string) => hmac(`email:${email.trim().toLowerCase()}`);
const pParticipant = (ev: string, k: string) => `quiz/${ev}/p/${k}.json`;
const pResult = (ev: string, k: string) => `quiz/${ev}/r/${k}.json`;

/** Enregistre le départ. Renvoie false si cet email a déjà commencé. */
export async function registerStart(ev: string, k: string, p: Participant & { startedAt: number }) {
  try { await writeOnce(pParticipant(ev, k), p); return true; }
  catch (e) { if (e instanceof AlreadyExists) return false; throw e; }
}

/** Enregistre le résultat. Renvoie le résultat déjà enregistré s'il existe. */
export async function saveResultOnce(ev: string, k: string, r: QuizResult): Promise<QuizResult> {
  try { await writeOnce(pResult(ev, k), r); return r; }
  catch (e) {
    if (e instanceof AlreadyExists) return (await readOne<QuizResult>(pResult(ev, k))) ?? r;
    throw e;
  }
}

const resultMemo = new Map<string, QuizResult>(); // url → résultat (un résultat ne change jamais)
let boardCache: { at: number; ev: string; rows: QuizResult[] } | null = null;

export async function getAllResults(ev: string): Promise<QuizResult[]> {
  if (boardCache && boardCache.ev === ev && Date.now() - boardCache.at < 30_000) return boardCache.rows;
  let rows: QuizResult[] = [];
  if (blobEnabled()) {
    const urls: string[] = [];
    let cursor: string | undefined;
    do {
      const res = await list({ prefix: `quiz/${ev}/r/`, cursor, limit: 1000 });
      urls.push(...res.blobs.map((b) => b.url));
      cursor = res.hasMore ? res.cursor : undefined;
    } while (cursor);
    await Promise.all(urls.filter((u) => !resultMemo.has(u)).map(async (u) => {
      try { resultMemo.set(u, await (await fetch(u, { cache: "no-store" })).json()); } catch {}
    }));
    rows = urls.map((u) => resultMemo.get(u)).filter((r): r is QuizResult => !!r);
  } else {
    try {
      const flat = `quiz__${ev}__r__`;
      const files = (await fs.readdir(LOCAL_DATA)).filter((f) => f.startsWith(flat));
      rows = await Promise.all(files.map(async (f) => JSON.parse(await fs.readFile(path.join(LOCAL_DATA, f), "utf8"))));
    } catch {}
  }
  rows.sort((a, b) => Number(a.late) - Number(b.late) || b.score - a.score || a.timeMs - b.timeMs);
  boardCache = { at: Date.now(), ev, rows };
  return rows;
}

/* ── Score (total + par catégorie) ─────────────────────────────── */
export function scoreAnswers(config: QuizConfig, answers: unknown[]) {
  const byCat: Record<string, { score: number; total: number }> = {};
  let score = 0;
  config.questions.forEach((q, i) => {
    const cat = q.cat ?? "base";
    byCat[cat] ??= { score: 0, total: 0 };
    byCat[cat].total++;
    if (answers[i] === q.answer) { score++; byCat[cat].score++; }
  });
  return { score, total: config.questions.length, byCat };
}

export const categoryList = (c: QuizConfig): QuizCategory[] =>
  c.categories ?? [...new Set(c.questions.map((q) => q.cat ?? "base"))].map((id) => ({ id, label: id }));

/* ── Jeton signé : l'heure de départ ne peut pas être trafiquée ─── */
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
