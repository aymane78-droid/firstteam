// Clé API YouTube Data v3 — restreinte au domaine en production
export const YOUTUBE_API_KEY = "AIzaSyDIYcG894LtXuZ07FrFd8-PjXHWUATPsAM";

export const FIRST_TEAM_CHANNEL_ID = "UCVVngTl-rdwFeFBUTdW5G5w";
export const OFFENSE_CHANNEL_ID    = "UCltzJogga-SMLbzpVI_527g";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 heure
// Incrémenter cette version invalide tous les caches localStorage existants
const CACHE_VERSION = "v3";

export interface YTVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

// Alias de compatibilité pour les anciens composants
export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
  publishedAt: string;
}

function bestThumb(thumbs: Record<string, { url: string }> = {}): string {
  return (thumbs.maxres ?? thumbs.standard ?? thumbs.high ?? thumbs.medium ?? thumbs.default)?.url ?? "";
}

// Convertit un Channel ID (UC...) en playlist UULF (longues vidéos seulement, pas de Shorts)
// UC + 22 chars → UULF + 22 chars
function uulfPlaylistId(channelId: string): string {
  return "UULF" + channelId.slice(2);
}

// ── Filtrage (playlists manuelles uniquement) ─────────────────────────────

function parseDuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (parseInt(m[1] || "0") * 3600) + (parseInt(m[2] || "0") * 60) + parseInt(m[3] || "0");
}

// Filtre de sécurité pour les playlists manuelles :
// durée > 180s ET thumbnail horizontal (width > height)
function isLongVideo(
  thumbs: Record<string, { url: string; width?: number; height?: number }>,
  durationIso: string,
  title: string
): boolean {
  const t = thumbs.high ?? thumbs.medium ?? thumbs.default;
  const w = t?.width  ?? 0;
  const h = t?.height ?? 0;
  const isHorizontal = w > 0 && h > 0 && w > h;
  const duration = parseDuration(durationIso);
  const isLongEnough = duration > 180;
  const keep = isHorizontal && isLongEnough;

  if (keep) {
    console.log(`[YT-PL] ✅ KEEP  "${title}" — ${duration}s — ${w}×${h}`);
  } else {
    const reason = !isHorizontal ? `portrait ${w}×${h}` : `trop court ${duration}s`;
    console.log(`[YT-PL] ❌ SKIP  "${title}" — ${reason}`);
  }

  return keep;
}

// ── Cache localStorage ────────────────────────────────────────────────

function cacheKey(raw: string): string {
  return `${raw}_${CACHE_VERSION}`;
}

function readCache(key: string): YTVideo[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: YTVideo[]; ts: number };
    if (Date.now() - ts > CACHE_TTL_MS) { localStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
}

function writeCache(key: string, data: YTVideo[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

// ── Helper : contentDetails pour filtre durée (playlists manuelles) ──────

async function fetchDurations(ids: string[]): Promise<Map<string, string>> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${ids.join(",")}&key=${YOUTUBE_API_KEY}`
  );
  if (!res.ok) throw new Error(`YouTube API ${res.status}`);
  const json = await res.json();
  const map = new Map<string, string>();
  for (const item of (json.items ?? [])) {
    map.set(item.id, item.contentDetails.duration);
  }
  return map;
}

// ── UULF : log de surveillance ────────────────────────────────────────────

function logUulfItem(item: any) {
  const thumb = item.snippet?.thumbnails?.high ?? item.snippet?.thumbnails?.medium;
  const w = thumb?.width  ?? 0;
  const h = thumb?.height ?? 0;
  console.log(`[YT-UULF] ✅ ${item.snippet?.title} — ${w}×${h}`);
  // Garde-fou : ne devrait JAMAIS se produire avec une playlist UULF
  if (w > 0 && h > 0 && h > w) {
    console.error(`[YT-UULF] ⚠️ SHORT DETECTED IN UULF: ${item.snippet?.title}`);
  }
}

// ── Appels API publics ────────────────────────────────────────────────

// Garde sans filtre — utilisé pour les vidéos Wemby (IDs fixes).
export async function fetchVideosByIds(ids: string[]): Promise<(YTVideo | null)[]> {
  const key = cacheKey(`yt_ids_${ids.join(",")}`);
  const cached = readCache(key);
  if (cached) return ids.map(id => cached.find(v => v.id === id) ?? null);

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids.join(",")}&key=${YOUTUBE_API_KEY}`
  );
  if (!res.ok) throw new Error(`YouTube API ${res.status}`);
  const json = await res.json();

  const videos: YTVideo[] = (json.items ?? []).map((item: any) => ({
    id:          item.id,
    title:       item.snippet.title,
    description: item.snippet.description ?? "",
    thumbnail:   bestThumb(item.snippet.thumbnails),
  }));

  writeCache(key, videos);
  return ids.map(id => videos.find(v => v.id === id) ?? null);
}

// Utilise la playlist UULF (longues vidéos uniquement, pas de Shorts garantis par YouTube).
// Remplace l'ancienne version UU + filtre maison.
export async function fetchLatestVideos(channelId: string, maxResults = 4): Promise<YTVideo[]> {
  const playlistId = uulfPlaylistId(channelId);
  const key = cacheKey(`yt_uulf_${channelId}_${maxResults}`);
  const cached = readCache(key);
  if (cached) return cached;

  console.log(`[YT-UULF] Fetching from playlist: ${playlistId} (maxResults=${maxResults})`);

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
  );
  if (!res.ok) throw new Error(`YouTube API ${res.status}`);
  const json = await res.json();

  const videos: YTVideo[] = (json.items ?? []).map((item: any) => {
    logUulfItem(item);
    return {
      id:          item.snippet.resourceId.videoId,
      title:       item.snippet.title,
      description: item.snippet.description ?? "",
      thumbnail:   bestThumb(item.snippet.thumbnails),
    };
  });

  writeCache(key, videos);
  return videos;
}

// Utilise la playlist UULF — YouTube garantit zéro Short dans cette playlist.
// Plus besoin de filtrer : maxResults vidéos directement.
export async function fetchLatestLongVideos(channelId: string, count: number): Promise<YTVideo[]> {
  const playlistId = uulfPlaylistId(channelId);
  const key = cacheKey(`yt_uulf_long_${channelId}_${count}`);
  const cached = readCache(key);
  if (cached) return cached;

  console.log(`[YT-UULF] Fetching from playlist: ${playlistId} (count=${count})`);

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${count}&key=${YOUTUBE_API_KEY}`
  );
  if (!res.ok) throw new Error(`YouTube API ${res.status}`);
  const json = await res.json();

  const videos: YTVideo[] = (json.items ?? []).map((item: any) => {
    logUulfItem(item);
    return {
      id:          item.snippet.resourceId.videoId,
      title:       item.snippet.title,
      description: item.snippet.description ?? "",
      thumbnail:   bestThumb(item.snippet.thumbnails),
    };
  });

  writeCache(key, videos);
  return videos;
}

// Playlists MANUELLES (concepts + Offense L'Émission) — double filtre conservé
// car ces playlists sont créées manuellement et peuvent contenir des Shorts par erreur.
export async function fetchPlaylistVideos(playlistId: string, maxResults = 10): Promise<YTVideo[]> {
  const key = cacheKey(`yt_pl_${playlistId}_${maxResults}`);
  const cached = readCache(key);
  if (cached) return cached;

  console.log(`[YT-PL] Fetching manual playlist: ${playlistId} (maxResults=${maxResults})`);

  const results: YTVideo[] = [];
  let pageToken: string | undefined;

  while (results.length < maxResults) {
    const params = new URLSearchParams({
      part: "snippet", playlistId, maxResults: "50", key: YOUTUBE_API_KEY,
      ...(pageToken ? { pageToken } : {}),
    });
    const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`);
    if (!res.ok) throw new Error(`YouTube API ${res.status}`);
    const json = await res.json();
    const items: any[] = json.items ?? [];
    if (!items.length) break;

    // Batch contentDetails pour le filtre durée
    const ids = items.map((it: any) => it.snippet.resourceId.videoId);
    const durations = await fetchDurations(ids);

    for (const item of items) {
      const videoId = item.snippet.resourceId.videoId;
      const iso = durations.get(videoId) ?? "PT0S";
      if (isLongVideo(item.snippet.thumbnails, iso, item.snippet.title)) {
        results.push({
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description ?? "",
          thumbnail: bestThumb(item.snippet.thumbnails),
        });
        if (results.length >= maxResults) break;
      }
    }

    pageToken = json.nextPageToken;
    if (!pageToken) break;
  }

  const videos = results.slice(0, maxResults);
  writeCache(key, videos);
  return videos;
}
