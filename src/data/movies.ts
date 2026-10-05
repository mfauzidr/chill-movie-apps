export interface Movie {
  contentId: string;
  rating?: string;
  isNew?: boolean;
  isTopTen?: boolean;
  progress?: number;
  episode?: number;
}

export interface MovieSectionData {
  id: string;
  title: string;
  variant: "banners" | "poster" | "continue";
  movies: Movie[];
}

export const movieSections: MovieSectionData[] = [
  {
    id: "lanjut-menonton",
    title: "Melanjutkan Tonton Film",
    variant: "continue",
    movies: [
      {
        contentId: "dont-look-up",
        rating: "4.5/5",
        progress: 35,
      },
      {
        contentId: "all-of-us-are-dead",
        rating: "4.2/5",
        progress: 35,
        episode: 1,
      },
      {
        contentId: "blue-lock",
        rating: "4.6/5",
        progress: 60,
        episode: 8,
      },
      {
        contentId: "a-man-called-otto",
        rating: "4.5/5",
        progress: 48,
      },
      {
        contentId: "doctor-strange-multiverse-of-madness",
        rating: "4.5/5",
        progress: 72,
      },
      {
        contentId: "duty-after-school",
        rating: "4.1/5",
        progress: 26,
        episode: 3,
      },
    ],
  },
  {
    id: "film",
    title: "Top Rating Film dan Series Hari Ini",
    variant: "poster",
    movies: [
      {
        contentId: "suzume",
        isNew: true,
      },
      {
        contentId: "jurrasic-world",
      },
      {
        contentId: "sonic-2",
      },
      {
        contentId: "all-of-us-are-dead",
        isNew: true,
      },
      {
        contentId: "big-hero-6",
      },
      {
        contentId: "the-little-mermaid",
      },
      {
        contentId: "duty-after-school",
      },
    ],
  },
  {
    id: "trending",
    title: "Film Trending",
    variant: "poster",
    movies: [
      {
        contentId: "the-tomorrow-war",
        isTopTen: true,
      },
      {
        contentId: "ant-man-and-the-wasp-quantumania",
        isTopTen: true,
      },
      {
        contentId: "guardians-of-the-galaxy",
        isTopTen: true,
      },
      {
        contentId: "a-man-called-otto",
        isTopTen: true,
      },
      {
        contentId: "the-little-mermaid",
        isTopTen: true,
      },
      {
        contentId: "sonic-2",
        isTopTen: true,
      },
      {
        contentId: "suzume",
        isTopTen: true,
      },
    ],
  },
  {
    id: "series",
    title: "Rilis Baru",
    variant: "poster",
    movies: [
      {
        contentId: "the-little-mermaid",
        isTopTen: true,
      },
      {
        contentId: "duty-after-school",
        isNew: true,
      },
      {
        contentId: "big-hero-6",
      },
      {
        contentId: "all-of-us-are-dead",
        isNew: true,
      },
      {
        contentId: "suzume",
        isNew: true,
        isTopTen: true,
      },
      {
        contentId: "jurrasic-world",
      },
      {
        contentId: "ant-man-and-the-wasp-quantumania",
        isNew: true,
        isTopTen: true,
      },
    ],
  },
];
