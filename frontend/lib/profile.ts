import { apiFetch } from "./api";

export async function getProfile() {
  const res = await apiFetch("/profile");
  return res.data;
}