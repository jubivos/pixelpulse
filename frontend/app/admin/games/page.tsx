"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminGames, deleteAdminGame } from "@/lib/admin";

type AdminGame = {
  id: number;
  title: string;
  description: string;
  release_date: string | null;
  genres: string[];
  tags: string[];
  reviews_count: number;
  average_rating: number | null;
};

export default function AdminGamesPage() {
  const [games, setGames] = useState<AdminGame[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = () => {
    setLoading(true);

    getAdminGames()
      .then(setGames)
      .catch((err) => {
        console.error("ADMIN GAMES ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Точно удалить игру?");

    if (!confirmed) return;

    try {
      await deleteAdminGame(id);
      fetchGames();
    } catch (err: any) {
      console.error("DELETE GAME ERROR:", err);
      alert(err?.error?.message || "Не удалось удалить игру");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА ИГР...
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="back-button">
        <Link href="/admin" className="arcade-link">
          ◀ НАЗАД В АДМИНКУ
        </Link>
      </div>

      <section className="hero">
        <h2 className="glitch" data-text="УПРАВЛЕНИЕ ИГРАМИ">
          УПРАВЛЕНИЕ ИГРАМИ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">🎮 СПИСОК ИГР</h2>
        <div className="mb-6">
        <Link href="/admin/games/create" className="read-more">
            ➕ СОЗДАТЬ ИГРУ
        </Link>
        </div>

        <div className="comments-list">
          {games.map((game) => (
            <div key={game.id} className="comment-item">
              <div className="comment-content">
                <div className="comment-header">
                  <span>🎮 {game.title}</span>
                  <span>⭐ {game.average_rating ?? 0} / 10</span>
                </div>

                <div className="comment-text">
                  {game.description?.slice(0, 140) || "Без описания"}...
                </div>

                <div className="comment-text">
                  Жанры: {game.genres.join(", ") || "нет"} · Теги:{" "}
                  {game.tags.join(", ") || "нет"}
                </div>

                <div className="comment-text">
                  📝 Обзоров: {game.reviews_count}
                </div>

                <div className="flex gap-3 mt-3 flex-wrap">
                  <Link href={`/games/${game.id}`} className="read-more">
                    ОТКРЫТЬ →
                  </Link>

                  <button
                    onClick={() => handleDelete(game.id)}
                    className="comment-delete"
                  >
                    УДАЛИТЬ
                  </button>
                </div>
              </div>
            </div>
          ))}

          {games.length === 0 && (
            <div className="no-comments">Игр пока нет</div>
          )}
        </div>
      </div>
    </div>
  );
}