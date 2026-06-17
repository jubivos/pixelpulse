export interface NewsItem {
  id: number;
  title: string;
  content: string;
  cover_image_url: string | null;
  author: {
    id: number;
    nickname: string;
  };
  published_at: string;
  likes_count: number;
  comments_count: number;
}