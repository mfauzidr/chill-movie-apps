export type ContentType = "film" | "series";

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  isTrending: boolean;
  isContinueWatching: boolean;
  isNew?: boolean;
  isTopTen?: boolean;
  rating?: string;
  progress?: number;
  episode?: number;

  poster: string;
  banner: string;

  ageRating: string;
  duration?: string;

  totalEpisodes?: number;
  seasons?: number;
  episodeDuration?: string;

  genres: string[];
}