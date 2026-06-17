export interface Game {
  id: number;
  title: string;
  description: string;
  cover_image_url: string;
  release_date: string;
  genres: string[];
  tags: string[];
  reviews_count: number;
  average_rating: number;
}