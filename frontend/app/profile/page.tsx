"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProfile } from "@/lib/profile";
import { logout } from "@/lib/auth";

type ProfileData = {
  user: {
    id: number;
    login: string;
    nickname: string;
    email: string;
    role: "user" | "moderator" | "admin";
    registered_at: string;
    last_activity_at: string | null;
  };

  stats: {
    reviews_count: number;
    comments_count: number;
    likes_given_count: number;
    news_count: number;
    activities_count: number;
  };

  favorite_games: {
    id: number;
    title: string;
    rating: number;
    url: string;
  }[];

  latest_reviews: {
    id: number;
    game_id: number;
    game_title: string;
    rating: number;
    content: string;
    status: string;
    created_at: string;
    url: string;
  }[];

  latest_comments: {
    id: number;
    content: string;
    commentable_type: string;
    commentable_id: number;
    commentable_title: string;
    created_at: string;
    url: string;
  }[];
};

const roleNames: Record<string, string> = {
  user: "ИГРОК",
  moderator: "МОДЕРАТОР",
  admin: "АДМИНИСТРАТОР",
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.error("PROFILE LOAD ERROR:", err);
        router.push("/auth/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div className="text-center py-20 text-[#0f0]">ЗАГРУЗКА...</div>;
  }

  if (!profile) {
    return null;
  }

  const { user, stats, favorite_games, latest_reviews, latest_comments } =
    profile;

  const regDate = new Date(user.registered_at).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const lastActivity = user.last_activity_at
    ? new Date(user.last_activity_at).toLocaleString("ru-RU")
    : "нет данных";

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-full max-w-4xl px-4">
        <div className="profile-container">
          <div className="card">
            <h2 className="card-title">👾 ПРОФИЛЬ ИГРОКА</h2>

            <div className="avatar-section">
              <div className="avatar">🎮</div>

              <div className="user-info">
                <div className="info-row">
                  <span className="info-label">Имя пользователя:</span>
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
                  <span className="info-label">Дата регистрации:</span>
                  <span className="info-value">{regDate}</span>
                </div>

                <div className="info-row">
                  <span className="info-label">Статус:</span>
                  <span className="info-value">
                    ⭐ {roleNames[user.role] || "ИГРОК"}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">Последняя активность:</span>
                  <span className="info-value">{lastActivity}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">❤️ ЛЮБИМЫЕ ИГРЫ</h2>

            <div className="games-list">
              {favorite_games.length === 0 && (
                <span className="game-badge">
                  Пока нет любимых игр. Оставь обзор с оценкой 8+
                </span>
              )}

              {favorite_games.map((game) => (
                <Link key={game.id} href={game.url} className="game-badge">
                  🎮 {game.title} ⭐ {game.rating}
                </Link>
              ))}
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
            <h2 className="card-title">💬 ПОСЛЕДНИЕ ОБЗОРЫ</h2>

            <div className="comments-list">
              {latest_reviews.length === 0 && (
                <div className="comment-item">
                  <div className="comment-text">
                    Вы ещё не оставили ни одного обзора.
                  </div>
                </div>
              )}

              {latest_reviews.map((review) => (
                <Link
                  key={review.id}
                  href={review.url}
                  className="comment-item block"
                >
                  <div className="comment-header">
                    <span>
                      🎮 {review.game_title} — ⭐ {review.rating}
                    </span>
                    <span>
                      📅{" "}
                      {new Date(review.created_at).toLocaleDateString("ru-RU")}
                    </span>
                  </div>

                  <div className="comment-text">
                    {review.content?.slice(0, 120) || "Без текста"}...
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">📝 ПОСЛЕДНИЕ КОММЕНТАРИИ</h2>

            <div className="comments-list">
              {latest_comments.length === 0 && (
                <div className="comment-item">
                  <div className="comment-text">
                    Вы ещё не оставили ни одного комментария.
                  </div>
                </div>
              )}

              {latest_comments.map((comment) => (
                <Link
                  key={comment.id}
                  href={comment.url}
                  className="comment-item block"
                >
                  <div className="comment-header">
                    <span>
                      {comment.commentable_type === "News" ? "📰" : "🎮"}{" "}
                      {comment.commentable_title}
                    </span>
                    <span>
                      📅{" "}
                      {new Date(comment.created_at).toLocaleDateString(
                        "ru-RU"
                      )}
                    </span>
                  </div>

                  <div className="comment-text">
                    {comment.content.slice(0, 120)}...
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={logout}
              className="border-2 border-red-500 px-4 py-1 text-red-500 text-xs hover:bg-red-500 hover:text-black transition"
            >
              ВЫЙТИ ИЗ АККАУНТА
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}