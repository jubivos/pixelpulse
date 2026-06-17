import { apiFetch } from "./api";

export async function getNewsComments(newsId: number) {
  return apiFetch(`/news/${newsId}/comments`);
}

export async function createNewsComment(
  newsId: number,
  data: {
    content: string;
    parent_id?: number | null;
  }
) {
  return apiFetch(`/news/${newsId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      comment: {
        content: data.content,
        parent_id: data.parent_id ?? null,
      },
    }),
  });
}