import type { Content } from "../data/content";
import { useEffect, useRef, useState } from "react";
import MovieHoverCard, { type HoverCardPosition } from "./MovieHoverCard";

interface MovieCardProps {
  content: Content;
  variant: "banners" | "poster" | "continue";
  rating?: string;
  isNew?: boolean;
  isTopTen?: boolean;
  progress?: number;
  episode?: number;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const HOVER_CLOSE_DELAY = 100;
const HOVER_CARD_WIDTH = 408;
const HOVER_CARD_HEIGHT = 460;
const VIEWPORT_GUTTER = 16;
const HOVER_CARD_GAP = 12;
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const MovieCard = ({
  content,
  variant,
  rating,
  isNew,
  isTopTen,
  progress = 0,
  episode,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: MovieCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoverCardPosition, setHoverCardPosition] =
    useState<HoverCardPosition | null>(null);
  const isContinue = variant === "continue";
  const image = variant === "poster" ? content.poster : content.banner;
  const imageDirectory = variant === "poster" ? "posters" : "banners";
  const baseClasses =
    "relative flex shrink-0 cursor-pointer overflow-hidden rounded-md";

  const cancelScheduledClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const openHoverCard = () => {
    cancelScheduledClose();
    onMouseEnter();
  };
  const scheduleHoverCardClose = () => {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => {
      onMouseLeave();
      closeTimerRef.current = null;
    }, HOVER_CLOSE_DELAY);
  };

  useEffect(() => () => cancelScheduledClose(), []);

  useEffect(() => {
    if (!isActive || !cardRef.current) {
      setHoverCardPosition(null);
      return;
    }
    const updatePosition = () => {
      const { left, top, width, height } =
        cardRef.current!.getBoundingClientRect();
      const hoverCardHeight = Math.min(
        HOVER_CARD_HEIGHT,
        window.innerHeight - VIEWPORT_GUTTER * 2,
      );
      const maxLeft = Math.max(
        VIEWPORT_GUTTER,
        window.innerWidth - HOVER_CARD_WIDTH - VIEWPORT_GUTTER,
      );
      const maxTop = Math.max(
        VIEWPORT_GUTTER,
        window.innerHeight - hoverCardHeight - VIEWPORT_GUTTER,
      );
      const topBelowCard = top + height + HOVER_CARD_GAP;
      const topAboveCard = top - hoverCardHeight - HOVER_CARD_GAP;
      const hoverCardTop =
        topBelowCard <= maxTop
          ? topBelowCard
          : topAboveCard >= VIEWPORT_GUTTER
            ? topAboveCard
            : top + height / 2 - hoverCardHeight / 2;
      setHoverCardPosition({
        left: clamp(
          left + width / 2 - HOVER_CARD_WIDTH / 2,
          VIEWPORT_GUTTER,
          maxLeft,
        ),
        top: clamp(hoverCardTop, VIEWPORT_GUTTER, maxTop),
      });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isActive]);

  if (variant === "banners") {
    return (
      <div className={`${baseClasses} h-37.75 w-77.25 md:h-40 md:w-75`}>
        <img
          src={`/assets/${imageDirectory}/${image}`}
          alt={content.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-header-background/40" />
        <div className="relative z-10 flex h-full w-full items-end justify-between p-4 text-sm font-bold">
          <span>{content.title}</span>
          <span className="flex items-center gap-2 text-text-light">
            <span className="h-2.5 w-2.5 bg-current [mask:url('/assets/icons/star.svg')_center/contain_no-repeat]" />
            {rating}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="relative"
      onMouseEnter={openHoverCard}
      onMouseLeave={scheduleHoverCardClose}
    >
      <div
        className={`${baseClasses} ${isContinue ? "h-37.75 w-77.25 md:h-40 md:w-75" : "h-36.25 w-23.75 p-1.75 md:h-91.25 md:w-58.5"}`}
      >
        <img
          src={`/assets/${imageDirectory}/${image}`}
          alt={content.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {isNew && (
          <span className="absolute left-1 top-1 z-10 flex h-4 items-center rounded-xl bg-primary-pressed px-2 text-[8px] md:left-2 md:top-2 md:h-7 md:px-3 md:py-3 md:text-xs lg:text-sm">
            Rilis Baru
          </span>
        )}
        {isTopTen && (
          <span className="absolute right-1 top-0 z-10 flex h-5.5 w-3.5 flex-col items-center justify-center rounded-bl-xs rounded-tr-xs bg-error-pressed px-0.5 text-[6.5px] font-light md:h-12 md:w-8 md:p-1 md:text-sm">
            <span>Top</span>
            <span>10</span>
          </span>
        )}
        {isContinue && (
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-header-background to-transparent px-4 pb-4 pt-10">
            <div className="h-1 rounded-full bg-greyscale-700">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {hoverCardPosition && (
        <MovieHoverCard
          content={content}
          isContinue={isContinue}
          progress={progress}
          episode={episode}
          position={hoverCardPosition}
          onMouseEnter={openHoverCard}
          onMouseLeave={scheduleHoverCardClose}
        />
      )}
    </div>
  );
};

export default MovieCard;
