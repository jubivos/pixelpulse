"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getAdminUser } from "@/lib/admin";

type AdminUserProfile = {
  user: {
    id: number;
    login: string;
    nickname: string;
    email: string;
    role: string;
    created_at: string;
    last_activity_at: string | null;
  };

  stats: {
    reviews_count: number;
    comments_count: number;
    likes_given_count: number;
    news_count: number;
    activities_count: number;
  };

  latest_reviews: {
    id: number;
    game_id: number;
    game_title: string;
    rating: number;
    status: string;
    content: string;
    created_at: string;
  }[];

  latest_comments: {
    id: number;
    content: string;
    commentable_type: string;
    commentable_id: number;
    created_at: string;
  }[];
};

export default function AdminUserProfilePage() {
  const params = useParams();
  const id = Number(params.id);

  const [profile, setProfile] = useState<AdminUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUser(id)
      .then(setProfile)
      .catch((err) => {
        console.error("ADMIN USER PROFILE ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА ПРОФИЛЯ...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН
      </div>
    );
  }

  const { user, stats, latest_reviews, latest_comments } = profile;

  return (
    <div className="profile-container">
      <div className="back-button">
        <Link href="/admin/users" className="arcade-link">
          ◀ НАЗАД К ПОЛЬЗОВАТЕЛЯМ
        </Link>
      </div>

      <section className="hero">
        <h2 className="glitch" data-text={user.nickname}>
          {user.nickname}
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">👾 ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</h2>

        <div className="avatar-section">
          <div className="avatar">🎮</div>

          <div className="user-info">
            <div className="info-row">
              <span className="info-label">Никнейм:</span>
              <span className="info-value">{user.nickname}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Логин:</span>
              <span className="info-value">{user.login}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Роль:</span>
              <span className="info-value">⭐ {user.role}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Дата регистрации:</span>
              <span className="info-value">
                {new Date(user.created_at).toLocaleDateString("ru-RU")}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">Последняя активность:</span>
              <span className="info-value">
                {user.last_activity_at
                  ? new Date(user.last_activity_at).toLocaleString("ru-RU")
                  : "нет данных"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">📊 СТАТИСТИКА</h2>

        <div className="stat-grid">
          <div className="stat-item">
            <span className="stat-value">{stats.reviews_count}</span>
            <span className="stat-label">ОБЗОРОВ</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.comments_count}</span>
            <span className="stat-label">КОММЕНТАРИЕВ</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.likes_given_count}</span>
            <span className="stat-label">ЛАЙКОВ</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.news_count}</span>
            <span className="stat-label">НОВОСТЕЙ</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.activities_count}</span>
            <span className="stat-label">АКТИВНОСТЕЙ</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">⭐ ПОСЛЕДНИЕ РЕЦЕНЗИИ</h2>

        <div className="comments-list">
          {latest_reviews.length === 0 && (
            <div className="no-comments">Рецензий пока нет</div>
          )}

          {latest_reviews.map((review) => (
            <Link
              key={review.id}
              href={`/games/${review.game_id}`}
              className="comment-item"
            >
              <div className="comment-content">
                <div className="comment-header">
                  <span>
                    🎮 {review.game_title} — ⭐ {review.rating}
                  </span>
                  <span>{review.status}</span>
                </div>

                <div className="comment-text">
                  {review.content?.slice(0, 120) || "Без текста"}...
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">💬 ПОСЛЕДНИЕ КОММЕНТАРИИ</h2>

        <div className="comments-list">
          {latest_comments.length === 0 && (
            <div className="no-comments">Комментариев пока нет</div>
          )}

          {latest_comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-content">
                <div className="comment-header">
                  <span>
                    {comment.commentable_type} #{comment.commentable_id}
                  </span>
                  <span>
                    {new Date(comment.created_at).toLocaleDateString("ru-RU")}
                  </span>
                </div>

                <div className="comment-text">
                  {comment.content.slice(0, 120)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}