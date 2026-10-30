import Hero from "../components/organisms/Hero";
import MovieSection from "../components/organisms/MovieSection";
import { useContentStore } from "../stores/contentStore";

const HomePage = () => {
  const contents = useContentStore((state) => state.contents);
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
        {sections.map((section) => (
          <MovieSection key={section.id} {...section} />
        ))}
      </main>
    </>
  );
};

export default HomePage;
