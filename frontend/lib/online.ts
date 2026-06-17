import { apiFetch } from "./api";

export async function getOnlineCount() {
  const res = await apiFetch("/online");
  return res.data.count;
}