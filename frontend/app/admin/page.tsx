"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAdminDashboard } from "@/lib/admin";

type AdminDashboard = {
  stats: {
    users_count: number;
    news_count: number;
    games_count: number;
    reviews_count: number;
    comments_count: number;
    likes_count: number;
  };

  latest_users: {
    id: number;
    login: string;
    nickname: string;
    email: string;
    role: string;
    created_at: string;
  }[];

  latest_news: {
    id: number;
    title: string;
    author: string;
    published_at: string;
    created_at: string;
  }[];

  latest_reviews: {
    id: number;
    game_id: number;
    game_title: string;
    user: string;
    rating: number;
    status: string;
    created_at: string;
  }[];

  latest_comments: {
    id: number;
    user: string;
    content: string;
    commentable_type: string;
    commentable_id: number;
    created_at: string;
  }[];
};

export default function AdminPage() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then(setDashboard)
      .catch((err) => {
        console.error("ADMIN DASHBOARD ERROR:", err);
        router.push("/");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА АДМИНКИ...
      </div>
    );
  }

  if (!dashboard) return null;

  const { stats, latest_users, latest_news, latest_reviews, latest_comments } =
    dashboard;

  return (
    <div className="profile-container">
      <section className="hero">
        <h2 className="glitch" data-text="АДМИН-ПАНЕЛЬ">
          АДМИН-ПАНЕЛЬ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">⚙️ БЫСТРЫЕ ДЕЙСТВИЯ</h2>

        <div className="games-list">
          <Link href="/admin/users" className="game-badge">
            👥 ПОЛЬЗОВАТЕЛИ
          </Link>

          <Link href="/admin/news" className="game-badge">
            📰 НОВОСТИ
          </Link>

          <Link href="/admin/games" className="game-badge">
            🎮 ИГРЫ
          </Link>

          <Link href="/admin/reviews" className="game-badge">
            ⭐ РЕЦЕНЗИИ
          </Link>

          <Link href="/admin/comments" className="game-badge">
            💬 КОММЕНТАРИИ
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">📊 СТАТИСТИКА ПРОЕКТА</h2>

        <div className="stat-grid">
          <div className="stat-item">
            <span className="stat-value">{stats.users_count}</span>
            <span className="stat-label">ПОЛЬЗОВАТЕЛЕЙ</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.news_count}</span>
            <span className="stat-label">НОВОСТЕЙ</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.games_count}</span>
            <span className="stat-label">ИГР</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.reviews_count}</span>
            <span className="stat-label">РЕЦЕНЗИЙ</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.comments_count}</span>
            <span className="stat-label">КОММЕНТАРИЕВ</span>
          </div>

          <div className="stat-item">
            <span className="stat-value">{stats.likes_count}</span>
            <span className="stat-label">ЛАЙКОВ</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">👥 ПОСЛЕДНИЕ ПОЛЬЗОВАТЕЛИ</h2>

        <div className="comments-list">
          {latest_users.map((user) => (
            <div key={user.id} className="comment-item">
              <div className="comment-content">
                <div className="comment-header">
                  <span>👤 {user.nickname}</span>
                  <span>⭐ {user.role}</span>
                </div>

                <div className="comment-text">
                  {user.login} · {user.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">📰 ПОСЛЕДНИЕ НОВОСТИ</h2>

        <div className="comments-list">
          {latest_news.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="comment-item"
            >
              <div className="comment-content">
                <div className="comment-header">
                  <span>📰 {news.title}</span>
                  <span>✍️ {news.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">⭐ ПОСЛЕДНИЕ РЕЦЕНЗИИ</h2>

        <div className="comments-list">
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

                <div className="comment-text">Автор: {review.user}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">💬 ПОСЛЕДНИЕ КОММЕНТАРИИ</h2>

        <div className="comments-list">
          {latest_comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-content">
                <div className="comment-header">
                  <span>👤 {comment.user}</span>
                  <span>
                    {comment.commentable_type} #{comment.commentable_id}
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