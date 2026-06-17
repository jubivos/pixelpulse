"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminReviews, deleteAdminReview } from "@/lib/admin";

type AdminReview = {
  id: number;
  content: string;
  rating: number;
  status: string;
  created_at: string;
  user: {
    id: number;
    nickname: string;
  };
  game: {
    id: number;
    title: string;
  };
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    setLoading(true);

    getAdminReviews()
      .then(setReviews)
      .catch((err) => {
        console.error("ADMIN REVIEWS ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Точно удалить рецензию?");

    if (!confirmed) return;

    try {
      await deleteAdminReview(id);
      fetchReviews();
    } catch (err: any) {
      console.error("DELETE REVIEW ERROR:", err);
      alert(err?.error?.message || "Не удалось удалить рецензию");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА РЕЦЕНЗИЙ...
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
        <h2 className="glitch" data-text="УПРАВЛЕНИЕ РЕЦЕНЗИЯМИ">
          УПРАВЛЕНИЕ РЕЦЕНЗИЯМИ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">⭐ СПИСОК РЕЦЕНЗИЙ</h2>

        <div className="comments-list">
          {reviews.map((review) => (
            <div key={review.id} className="comment-item">
              <div className="comment-content">
                <div className="comment-header">
                  <span>
                    🎮 {review.game.title} — ⭐ {review.rating}
                  </span>
                  <span>{review.status}</span>
                </div>

                <div className="comment-text">
                  Автор: {review.user.nickname}
                </div>

                <div className="comment-text">
                  {review.content?.slice(0, 160) || "Без текста"}...
                </div>

                <div className="flex gap-3 mt-3 flex-wrap">
                  <Link href={`/games/${review.game.id}`} className="read-more">
                    ОТКРЫТЬ ИГРУ →
                  </Link>

                  <Link
                    href={`/admin/users/${review.user.id}`}
                    className="read-more"
                  >
                    ПРОФИЛЬ АВТОРА →
                  </Link>

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="comment-delete"
                  >
                    УДАЛИТЬ
                  </button>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="no-comments">Рецензий пока нет</div>
          )}
        </div>
      </div>
    </div>
  );
}