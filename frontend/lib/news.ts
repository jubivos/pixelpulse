import { apiFetch } from "./api";

export async function getNews() {
  return apiFetch("/news");
}

export async function getNewsItem(id: string) {
  return apiFetch(`/news/${id}`);
}