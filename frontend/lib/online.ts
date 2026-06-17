const API_URL = "http://172.24.238.248:3000";

export async function getOnlineCount() {
  const res = await fetch(`${API_URL}/online`);

  if (!res.ok) {
    return 0;
  }

  const data = await res.json();
  return data.data.count;
}