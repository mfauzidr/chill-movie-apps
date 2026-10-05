import type { MovieSectionData } from "../data/movies";
import { contents } from "../data/content";
import MovieCard from "./MovieCard";
import { CarrouselButton } from "./Button";
import { useRef, useState } from "react";

type MovieSectionProps = MovieSectionData;

const MovieSection = ({ title, variant, movies }: MovieSectionProps) => {
  const [activeMovieId, setActiveMovieId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    carousel.scrollBy({
      left: (direction === "left" ? -1 : 1) * carousel.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex flex-col gap-5 py-5 md:py-7.5 lg:py-10 md:gap-6.5 lg:gap-8">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="relative">
        <div ref={carouselRef} className="relative flex items-center overflow-x-scroll scrollbar-hidden gap-4 md:gap-6">
          {movies.map((movie) => {
            const content = contents.find(
              (content) => content.id === movie.contentId,
            );

            if (!content) return null;

            return (
              <MovieCard
                key={content.id}
                content={content}
                variant={variant}
                rating={movie.rating}
                isNew={movie.isNew}
                isTopTen={movie.isTopTen}
                progress={movie.progress}
                episode={movie.episode}
                isActive={activeMovieId === content.id}
                onMouseEnter={() => setActiveMovieId(content.id)}
                onMouseLeave={() =>
                  setActiveMovieId((activeId) =>
                    activeId === content.id ? null : activeId,
                  )
                }
              />
            );
          })}
        </div>
        <CarrouselButton
          icons="left"
          aria-label={`Geser ${title} ke kiri`}
          onClick={() => scrollCarousel("left")}
        />
        <CarrouselButton
          icons="right"
          aria-label={`Geser ${title} ke kanan`}
          onClick={() => scrollCarousel("right")}
        />
      </div>
    </section>
  );
};

export default MovieSection;
