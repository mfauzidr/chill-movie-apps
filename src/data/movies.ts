export interface Movie {
  contentId: string;
  rating?: string;
  isNew?: boolean;
  isTopTen?: boolean;
}

export interface MovieSectionData {
  id: string;
  title: string;
  variant: "banners" | "poster";
  movies: Movie[];
}

export const movieSections: MovieSectionData[] = [
  {
    id: "lanjut-menonton",
    title: "Melanjutkan Tonton Film",
    variant: "banners",
    movies: [
      {
        contentId: "dont-look-up",
        rating: "4.5/5",
      },
      {
        contentId: "all-of-us-are-dead",
        rating: "4.2/5",
      },
      {
        contentId: "blue-lock",
        rating: "4.6/5",
      },
      {
        contentId: "a-man-called-otto",
        rating: "4.5/5",
      },
      {
        contentId: "doctor-strange-multiverse-of-madness",
        rating: "4.5/5",
      },
      {
        contentId: "duty-after-school",
        rating: "4.1/5",
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
    ],
  },
];