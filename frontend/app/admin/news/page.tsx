"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminNews, deleteAdminNews } from "@/lib/admin";

type AdminNews = {
  id: number;
  title: string;
  content: string;
  author: string;
  published_at: string | null;
  created_at: string;
  comments_count: number;
  likes_count: number;
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<AdminNews[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = () => {
    setLoading(true);

    getAdminNews()
      .then(setNews)
      .catch((err) => {
        console.error("ADMIN NEWS ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Точно удалить новость?");

    if (!confirmed) return;

    try {
      await deleteAdminNews(id);
      fetchNews();
    } catch (err: any) {
      console.error("DELETE NEWS ERROR:", err);
      alert(err?.error?.message || "Не удалось удалить новость");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА НОВОСТЕЙ...
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
        <h2 className="glitch" data-text="УПРАВЛЕНИЕ НОВОСТЯМИ">
          УПРАВЛЕНИЕ НОВОСТЯМИ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">📰 СПИСОК НОВОСТЕЙ</h2>
        
        <div className="mb-6">
        <Link href="/admin/news/create" className="read-more">
            ➕ СОЗДАТЬ НОВОСТЬ
        </Link>
        </div>

        <div className="comments-list">
          {news.map((item) => (
            <div key={item.id} className="comment-item">
              <div className="comment-content">
                <div className="comment-header">
                  <span>📰 {item.title}</span>
                  <span>✍️ {item.author}</span>
                </div>

                <div className="comment-text">
                  {item.content?.slice(0, 140) || "Без текста"}...
                </div>

                <div className="comment-text">
                  ❤️ {item.likes_count} · 💬 {item.comments_count}
                </div>

                <div className="flex gap-3 mt-3 flex-wrap">
                  <Link href={`/news/${item.id}`} className="read-more">
                    ОТКРЫТЬ →
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="comment-delete"
                  >
                    УДАЛИТЬ
                  </button>
                </div>
              </div>
            </div>
          ))}

          {news.length === 0 && (
            <div className="no-comments">Новостей пока нет</div>
          )}
        </div>
      </div>
    </div>
  );
}