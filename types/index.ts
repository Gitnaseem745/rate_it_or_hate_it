// Centralized TypeScript type definitions

/**
 * Movie/Series type
 * Used for the main series voting functionality
 */
export interface Movie {
  _id: string;
  seriesId: string;
  title: string;
  imageUrl: string;
  category: string;
  rating: number;
  hate: number;
  ratedBy: string[];
}

/**
 * Series item for leaderboard display
 */
export interface SeriesItem {
  _id: string;
  title: string;
  rating: number;
  hate: number;
}

/**
 * Props for ShareButtons component
 */
export interface ShareButtonsProps {
  title?: string;
  url?: string;
}

/**
 * Meme data structure
 */
export interface Meme {
  gif: string;
  text: string;
}

/**
 * API response for rating action
 */
export interface RateResponse {
  success: boolean;
  message: string;
  movie: {
    _id: string;
    title: string;
    rating: number;
    hate: number;
  };
  meme?: Meme;
  error?: string;
}

/**
 * API response for fetching movies
 */
export interface MoviesResponse {
  success: boolean;
  movies: Movie[];
  error?: string;
}

/**
 * Series-specific meme configuration
 */
export interface SeriesMeme {
  id: string;
  name: string;
  hateMemes: string[];
  rateMemes: string[];
}
