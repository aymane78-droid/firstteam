import type { YouTubeVideo } from "@/app/lib/youtube";

const FT_FONT = { fontFamily: "JoyrideExt, Arial Black, sans-serif" };

export default function VideoCard({ video }: { video: YouTubeVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden bg-ft-card aspect-video hover:ring-2 hover:ring-ft-yellow transition-all duration-200"
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Duration */}
      {video.duration && (
        <span
          className="absolute top-2 right-2 bg-ft-yellow text-black text-[9px] px-1.5 py-0.5"
          style={FT_FONT}
        >
          {video.duration}
        </span>
      )}

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 bg-ft-yellow flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="black" className="w-4 h-4 ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p
          className="text-white text-[9px] uppercase leading-tight line-clamp-2 group-hover:text-ft-yellow transition-colors"
          style={FT_FONT}
        >
          {video.title}
        </p>
      </div>
    </a>
  );
}
