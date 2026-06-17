import { apiFetch } from "./api";

export async function getActivities() {
  const res = await apiFetch("/activities");
  return res.data;
}

export async function getNotifications() {
  const res = await apiFetch("/notifications");
  return res.data;
}

export async function markNotificationAsRead(id: number) {
  const res = await apiFetch(`/notifications/${id}/mark_as_read`, {
    method: "PATCH",
  });

  return res.data;
}