import { useEffect } from "react";
import Hero from "../components/organisms/Hero";
import MovieSection from "../components/organisms/MovieSection";
import { useContentStore } from "../stores/contentStore";

const HomePage = () => {
  const contents = useContentStore((state) => state.contents);
  const isLoading = useContentStore((state) => state.isLoading);
  const error = useContentStore((state) => state.error);
  const fetchContents = useContentStore((state) => state.fetchContents);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const sections = [
    {
      id: "lanjut-menonton",
      title: "Melanjutkan Tonton Film",
      variant: "continue" as const,
      contents: contents.filter((content) => content.isContinueWatching),
    },
    {
      id: "film",
      title: "Top Rating Film dan Series Hari Ini",
      variant: "poster" as const,
      contents: contents.filter((content) => content.type === "film"),
    },
    {
      id: "trending",
      title: "Film Trending",
      variant: "poster" as const,
      contents: contents.filter((content) => content.isTrending),
    },
    {
      id: "series",
      title: "Rilis Baru",
      variant: "poster" as const,
      contents: contents.filter((content) => content.type === "series"),
    },
  ];

  return (
    <>
      <Hero />

      <main className="px-8 py-8 md:px-12 md:py-12 lg:px-32 lg:py-20">
        {isLoading && contents.length === 0 && (
          <p className="py-16 text-center text-greyscale-400">
            Loading content...
          </p>
        )}

        {error && contents.length === 0 && (
          <div className="py-16 text-center">
            <p className="mb-4 text-error">{error}</p>
            <button
              type="button"
              onClick={fetchContents}
              className="rounded-lg bg-primary px-5 py-2.5 font-bold text-white"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && contents.length === 0 && (
          <p className="py-16 text-center text-greyscale-400">
            No content available.
          </p>
        )}

        {contents.length > 0 &&
          sections.map((section) => (
            <MovieSection key={section.id} {...section} />
          ))}
      </main>
    </>
  );
};

export default HomePage;