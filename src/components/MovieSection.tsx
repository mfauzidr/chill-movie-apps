import type { MovieSectionData } from '../data/movies'
import MovieCard from './MovieCard'

const MovieSection = ({ id, title, variant, movies }: MovieSectionData) => {
  return (
    <section id={id} className="flex flex-col gap-5 py-5 md:gap-6.5 md:py-7.5 lg:gap-8 lg:py-10">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="relative">
        <div className={`scrollbar-hidden relative flex gap-4 overflow-x-scroll md:gap-6 ${variant === 'continue' ? 'items-center' : ''}`}>
          {movies.map((movie) => <MovieCard key={movie.image + movie.title} movie={movie} variant={variant} />)}
        </div>
        <button type="button" aria-label="Sebelumnya" className="absolute -left-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7e3fc3b] bg-[#2f3334] hover:cursor-pointer hover:bg-[#607379] lg:flex">
          <img src="/assets/icons/arrow-left.svg" alt="" />
        </button>
        <button type="button" aria-label="Berikutnya" className="absolute -right-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7e3fc3b] bg-[#2f3334] hover:cursor-pointer hover:bg-[#607379] lg:flex">
          <img src="/assets/icons/arrow-right.svg" className="h-6 w-6" alt="" />
        </button>
      </div>
    </section>
  )
}

export default MovieSection