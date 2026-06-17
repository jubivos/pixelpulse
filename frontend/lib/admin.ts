import { apiFetch } from "./api";

export async function getAdminDashboard() {
  const res = await apiFetch("/admin/dashboard");
  return res.data;
}

export async function getAdminUsers() {
  const res = await apiFetch("/admin/users");
  return res.data;
}

export async function getAdminUser(id: number) {
  const res = await apiFetch(`/admin/users/${id}`);
  return res.data;
}

export async function deleteAdminUser(id: number) {
  const res = await apiFetch(`/admin/users/${id}`, {
    method: "DELETE",
  });

  return res.data;
}

export async function getAdminNews() {
  const res = await apiFetch("/admin/news");
  return res.data;
}

export async function deleteAdminNews(id: number) {
  const res = await apiFetch(`/admin/news/${id}`, {
    method: "DELETE",
  });

  return res.data;
}

export async function getAdminGames() {
  const res = await apiFetch("/admin/games");
  return res.data;
}

export async function deleteAdminGame(id: number) {
  const res = await apiFetch(`/admin/games/${id}`, {
    method: "DELETE",
  });

  return res.data;
}

export async function getAdminReviews() {
  const res = await apiFetch("/admin/reviews");
  return res.data;
}

export async function deleteAdminReview(id: number) {
  const res = await apiFetch(`/admin/reviews/${id}`, {
    method: "DELETE",
  });

  return res.data;
}

export async function getAdminComments() {
  const res = await apiFetch("/admin/comments");
  return res.data;
}

export async function deleteAdminComment(id: number) {
  const res = await apiFetch(`/admin/comments/${id}`, {
    method: "DELETE",
  });

  return res.data;
}

export async function createAdminNews(data: {
  title: string;
  content: string;
}) {
  const res = await apiFetch("/news", {
    method: "POST",
    body: JSON.stringify({
      news: {
        title: data.title,
        content: data.content,
        published_at: new Date().toISOString(),
      },
    }),
  });

  return res.data;
}

export async function createAdminGame(data: {
  title: string;
  description: string;
  specifications: string;
  cover_image_url: string;
  release_date: string;
}) {
  const res = await apiFetch("/games", {
    method: "POST",
    body: JSON.stringify({
      game: data,
    }),
  });

  return res.data;
}