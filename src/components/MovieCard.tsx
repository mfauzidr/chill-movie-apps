import type { Content } from "../data/content";

interface MovieCardProps {
  content: Content;
  variant: "banners" | "poster";
  rating?: string;
  isNew?: boolean;
  isTopTen?: boolean;
}

const MovieCard = ({
  content,
  variant,
  rating,
  isNew,
  isTopTen,
}: MovieCardProps) => {
  const image = variant === "banners" ? content.banner : content.poster;

  const imageDirectory = variant === "banners" ? "banners" : "posters";

  const baseClasses =
    "relative flex shrink-0 cursor-pointer overflow-hidden rounded-md";

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
      className={`${baseClasses} h-36.25 w-23.75 p-1.75 md:h-91.25 md:w-58.5`}
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
    </div>
  );
};

export default MovieCard;
