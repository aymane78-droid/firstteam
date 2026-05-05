import { unstable_cache } from "next/cache";

export type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
  publishedAt: string;
};

const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "1",
    title: "LA GRANDE PREVIEW NBA 2025-26",
    thumbnail:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=225&fit=crop",
    duration: "1:44:34",
    url: "https://youtube.com",
    publishedAt: "2026-04-12",
  },
  {
    id: "2",
    title: "UNE BONNE SAISON POUR LES SPURS ?",
    thumbnail:
      "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=225&fit=crop",
    duration: "1:21:11",
    url: "https://youtube.com",
    publishedAt: "2026-04-10",
  },
  {
    id: "3",
    title: "R.C. BUFORD — L'ENTRETIEN EXCLUSIF",
    thumbnail:
      "https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=400&h=225&fit=crop",
    duration: "19:00",
    url: "https://youtube.com",
    publishedAt: "2026-04-08",
  },
  {
    id: "4",
    title: "LE BRAQUAGE DE TYRESE HALIBURTON",
    thumbnail:
      "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=400&h=225&fit=crop",
    duration: "37:10",
    url: "https://youtube.com",
    publishedAt: "2026-04-05",
  },
];

function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const h = parseInt(match[1] ?? "0");
  const m = parseInt(match[2] ?? "0");
  const s = parseInt(match[3] ?? "0");
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function fetchFromYouTube(
  channelId: string,
  apiKey: string
): Promise<YouTubeVideo[]> {
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
  );
  if (!channelRes.ok) throw new Error("Channel fetch failed");
  const channelData = await channelRes.json();
  const uploadsId =
    channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) throw new Error("No uploads playlist");

  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=4&key=${apiKey}`
  );
  if (!playlistRes.ok) throw new Error("Playlist fetch failed");
  const playlistData = await playlistRes.json();
  const items: {
    snippet: {
      title: string;
      resourceId: { videoId: string };
      thumbnails: { high?: { url: string }; default?: { url: string } };
      publishedAt: string;
    };
  }[] = playlistData.items ?? [];

  const videoIds = items
    .map((item) => item.snippet.resourceId.videoId)
    .join(",");

  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${apiKey}`
  );
  const detailsData = detailsRes.ok
    ? await detailsRes.json()
    : { items: [] };
  const durationMap: Record<string, string> = {};
  for (const v of detailsData.items ?? []) {
    durationMap[v.id] = formatDuration(v.contentDetails.duration);
  }

  return items.map((item) => {
    const { snippet } = item;
    const videoId = snippet.resourceId.videoId;
    return {
      id: videoId,
      title: snippet.title,
      thumbnail:
        snippet.thumbnails?.high?.url ?? snippet.thumbnails?.default?.url ?? "",
      duration: durationMap[videoId] ?? "",
      url: `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt: snippet.publishedAt,
    };
  });
}

export const getLatestVideos = unstable_cache(
  async (): Promise<YouTubeVideo[]> => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    if (!apiKey || !channelId) return FALLBACK_VIDEOS;
    try {
      return await fetchFromYouTube(channelId, apiKey);
    } catch {
      return FALLBACK_VIDEOS;
    }
  },
  ["youtube-latest-videos"],
  { revalidate: 3600 }
);
