import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MovieSection from "../components/MovieSection";
import Navbar from "../components/Navbar";
import { movieSections } from "../data/movies";
import { Content } from "../data/content";

interface HomePageProps {
  contents: Content[];
}

const HomePage = ({ contents }: HomePageProps) => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="px-8 py-8 md:px-12 md:py-12 lg:px-32 lg:py-20">
        {movieSections.map((section) => (
          <MovieSection 
          key={section.id} 
          {...section}
          contents={contents} />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
