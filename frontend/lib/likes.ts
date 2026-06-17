import { apiFetch } from "./api";

export async function toggleLikeReview(reviewId: number) {
  return apiFetch("/likes/toggle", {
    method: "POST",
    body: JSON.stringify({
      likeable_type: "Review",
      likeable_id: reviewId,
    }),
  });
}

export async function toggleLikeNews(newsId: number) {
  return apiFetch("/likes/toggle", {
    method: "POST",
    body: JSON.stringify({
      likeable_type: "News",
      likeable_id: newsId,
    }),
  });
}