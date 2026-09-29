import type { Movie } from '../data/movies'

interface MovieCardProps {
  movie: Movie
  variant: 'continue' | 'poster'
}

const MovieCard = ({ movie, variant }: MovieCardProps) => {
  const imageDirectory = variant === 'continue' ? 'banners' : 'posters'
  const baseClasses = 'relative flex shrink-0 cursor-pointer rounded-md bg-cover bg-center'
  const backdrop = `linear-gradient(to bottom, rgba(24,26,28,0), rgba(24,26,28,0.4)), url('/assets/${imageDirectory}/${movie.image}')`

  if (variant === 'continue') {
    return (
      <a
        href="#"
        aria-label={`${movie.title}, rating ${movie.rating}`}
        className={`${baseClasses} h-37.75 w-77.25 items-end justify-between p-4 text-sm font-bold md:h-40 md:w-75`}
        style={{ backgroundImage: backdrop }}
      >
        <span>{movie.title}</span>
        <span className="flex items-center gap-2 text-white">
          <span className="h-2.5 w-2.5 bg-current [mask:url('/assets/icons/star.svg')_center/contain_no-repeat]" />
          {movie.rating}
        </span>
      </a>
    )
  }

  return (
    <a
      href="#"
      aria-label={movie.title}
      className={`${baseClasses} h-36.25 w-23.75 p-1.75 md:h-91.25 md:w-58.5`}
      style={{ backgroundImage: backdrop }}
    >
      {movie.isNew && <span className="absolute left-1 top-1 flex h-4 items-center rounded-xl bg-[#0f1e93] px-2 text-[8px] md:left-2 md:top-2 md:h-7 md:px-3 md:py-3 md:text-xs lg:text-sm">Rilis Baru</span>}
      {movie.isTopTen && (
        <span className="absolute right-1 top-0 flex h-5.5 w-3.5 flex-col items-center justify-center rounded-bl-xs rounded-tr-xs bg-[#b71f1d] px-0.5 text-[6.5px] font-light md:h-12 md:w-8 md:p-1 md:text-sm">
          <span>Top</span>
          <span>10</span>
        </span>
      )}
    </a>
  )
}

export default MovieCard