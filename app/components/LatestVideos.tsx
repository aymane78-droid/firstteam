import Link from "next/link";
import VideoCard from "./VideoCard";
import type { YouTubeVideo } from "@/app/lib/youtube";

const FT_FONT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };

export default function LatestVideos({ videos }: { videos: YouTubeVideo[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="block w-1 h-5 bg-ft-yellow" />
          <p className="text-white text-[10px] tracking-[4px] uppercase" style={FT_FONT}>
            DERNIÈRES VIDÉOS
          </p>
        </div>
        <Link
          href="/contenus"
          className="text-ft-muted hover:text-ft-yellow text-[9px] tracking-[2px] uppercase transition-colors"
          style={FT_FONT}
        >
          TOUT VOIR →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {videos.slice(0, 4).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
