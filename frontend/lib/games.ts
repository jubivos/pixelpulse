import { apiFetch } from "./api";

export async function getGames() {
  return apiFetch("/games");
}

export async function getGame(id: string) {
  return apiFetch(`/games/${id}`);
}

export async function createReview(
  gameId: number,
  data: {
    rating: number;
    content: string;
  }
) {
  return apiFetch("/reviews", {
    method: "POST",
    body: JSON.stringify({
      review: {
        game_id: gameId,
        rating: data.rating,
        content: data.content,
      },
    }),
  });
}