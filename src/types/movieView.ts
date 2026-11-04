import type { Content } from "./content";

// Variants
export type MovieCardVariant = "banners" | "poster";

// Shared types
export interface HoverCardPosition {
  left: number;
  top: number;
}

export interface MovieInteractionProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Section
export interface MovieSectionConfig {
  id: string;
  title: string;
  variant: MovieCardVariant;
  isContinueWatching: boolean;
  contents: Content[];
}

// Card
export interface MovieCardProps extends MovieInteractionProps {
  content: Content;
  variant: MovieCardVariant;
  isContinueWatching: boolean;
  isActive: boolean;
}

// Hover Card
export interface MovieHoverCardProps extends MovieInteractionProps {
  content: Content;
  isContinueWatching: boolean;
  progress: number;
  episode?: number;
  position: HoverCardPosition;
}