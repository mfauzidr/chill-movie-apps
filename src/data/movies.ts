export interface Movie {
  title: string
  image: string
  rating?: string
  isNew?: boolean
  isTopTen?: boolean
}

export interface MovieSectionData {
  id: string
  title: string
  variant: 'continue' | 'poster'
  movies: Movie[]
}

export const movieSections: MovieSectionData[] = [
  {
    id: 'lanjut-menonton',
    title: 'Melanjutkan Tonton Film',
    variant: 'continue',
    movies: [
      { title: "Don't Look Up", image: 'banner-dl-up.webp', rating: '4.5/5' },
      { title: 'All of us are Dead', image: 'banner-aou-dead.webp', rating: '4.2/5' },
      { title: 'Blue Lock', image: 'banner-blue-lock.webp', rating: '4.6/5' },
      { title: 'A Man Called Otto', image: 'banner-tmc-otto.webp', rating: '4.5/5' },
      { title: 'Dr. Strange: Multiverse of Madness', image: 'banner-ds-mom.webp', rating: '4.5/5' },
      { title: 'Duty After School', image: 'banner-da-school.webp', rating: '4.1/5' },
    ],
  },
  {
    id: 'film',
    title: 'Top Rating Film dan Series Hari Ini',
    variant: 'poster',
    movies: [
      { title: 'Suzume', image: 'poster-suzume.webp', isNew: true },
      { title: 'John Wick', image: 'poster-jw.webp' },
      { title: 'Sonic', image: 'poster-sonic.webp' },
      { title: 'All of Us Are Dead', image: 'poster-aod.webp', isNew: true },
      { title: 'Black Hat Society', image: 'poster-bhs.webp' },
      { title: 'The Little Mermaid', image: 'poster-tlm.webp' },
      { title: 'Duty After School', image: 'poster-das.webp' },
    ],
  },
  {
    id: 'trending',
    title: 'Film Trending',
    variant: 'poster',
    movies: [
      { title: 'The Tomorrow War', image: 'poster-ttw.webp', isTopTen: true },
      { title: 'A Quiet Place', image: 'poster-amqm.webp', isTopTen: true },
      { title: 'Guardians of the Galaxy', image: 'poster-gotg.webp', isTopTen: true },
      { title: 'The Man Called Otto', image: 'poster-tmco.webp', isTopTen: true },
      { title: 'The Little Mermaid', image: 'poster-tlm.webp', isTopTen: true },
      { title: 'Sonic', image: 'poster-sonic.webp', isTopTen: true },
      { title: 'Suzume', image: 'poster-suzume.webp', isTopTen: true },
    ],
  },
  {
    id: 'series',
    title: 'Rilis Baru',
    variant: 'poster',
    movies: [
      { title: 'The Little Mermaid', image: 'poster-tlm.webp', isTopTen: true },
      { title: 'Duty After School', image: 'poster-das.webp', isNew: true },
      { title: 'Black Hat Society', image: 'poster-bhs.webp' },
      { title: 'All of Us Are Dead', image: 'poster-aod.webp', isNew: true },
      { title: 'Suzume', image: 'poster-suzume.webp', isNew: true, isTopTen: true },
      { title: 'John Wick', image: 'poster-jw.webp' },
    ],
  },
]