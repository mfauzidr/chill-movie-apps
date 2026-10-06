import { createPortal } from "react-dom";
import type { Content } from "../data/content";
import Button from "./Button";

export type HoverCardPosition = {
  left: number;
  top: number;
};

interface MovieHoverCardProps {
  content: Content;
  isContinue: boolean;
  progress: number;
  episode?: number;
  position: HoverCardPosition;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MovieHoverCard = ({
  content,
  isContinue,
  progress,
  episode,
  position,
  onMouseEnter,
  onMouseLeave,
}: MovieHoverCardProps) =>
  createPortal(
    <div
      className="fixed z-40 hidden h-auto w-102 rounded-xl bg-header-background shadow-2xl shadow-gray-800 lg:block overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={position}
    >
      <img
        src={`/assets/banners/${content.banner}`}
        alt={content.title}
        className="h-64 w-full object-cover"
      />

      <div className="flex flex-col gap-4 p-7.25">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              className="flex h-11.5 w-11.5 items-center justify-center bg-white"
            >
              <img src="/assets/icons/play.svg" alt="Play" className="h-4 w-4" />
            </Button>
            <Button
              variant="outlineWhite"
              className="flex h-11.5 w-11.5 items-center justify-center"
            >
              <img src="/assets/icons/check.svg" alt="Check" className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="outlineWhite"
            className="flex h-11.5 w-11.5 items-center justify-center"
          >
            <img
              src="/assets/icons/dropdown.svg"
              alt="Dropdown"
              className="h-6 w-6"
            />
          </Button>
        </div>

        {isContinue ? (
          <>
            {content.type === "series" && (
              <span className="text-xl font-bold">Episode {episode ?? 1}</span>
            )}
            <div className="flex items-center gap-4">
              <div className="h-1 flex-1 rounded-full bg-greyscale-700">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="shrink-0 text-lg text-greyscale-300">
                {content.type === "series"
                  ? content.episodeDuration
                  : content.duration}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-5 text-xl font-bold">
            <span className="rounded-full bg-extra-background px-3 py-1 text-greyscale-300">
              {content.ageRating}
            </span>
            <span>
              {content.type === "series"
                ? `${content.episodes} Episode`
                : content.duration}
            </span>
          </div>
        )}

        <div className="flex items-center gap-7 text-lg text-greyscale-300">
          {content.genres.slice(0, 3).map((genre, index) => (
            <span key={genre} className="flex items-center gap-7 whitespace-nowrap">
              {index > 0 && (
                <span className="h-2 w-2 rounded-full bg-greyscale-300" />
              )}
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );

export default MovieHoverCard;
