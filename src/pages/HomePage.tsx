import Hero from "../components/Hero";
import MovieSection from "../components/MovieSection";
import { movieSections } from "../data/movies";
import { useContentStore } from "../stores/contentStore";

const HomePage = () => {
  const contents = useContentStore(
  (state) => state.contents
  
);
  return (
    <>
      <Hero />
      <main className="px-8 py-8 md:px-12 md:py-12 lg:px-32 lg:py-20">
        {movieSections.map((section) => (
          <MovieSection 
          key={section.id} 
          {...section}
          contents={contents} />
        ))}
      </main>
    </>
  );
};

export default HomePage;
