"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createAdminNews } from "@/lib/admin";

export default function CreateNewsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createAdminNews({ title, content });
      router.push("/admin/news");
    } catch (err: any) {
      console.error("CREATE NEWS ERROR:", err);
      alert(err?.error?.message || "Не удалось создать новость");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="back-button">
        <Link href="/admin/news" className="arcade-link">
          ◀ НАЗАД К НОВОСТЯМ
        </Link>
      </div>

      <section className="hero">
        <h2 className="glitch" data-text="СОЗДАТЬ НОВОСТЬ">
          СОЗДАТЬ НОВОСТЬ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">📰 НОВАЯ НОВОСТЬ</h2>

        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-group">
            <label>ЗАГОЛОВОК</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Название новости"
            />
          </div>

          <div className="form-group">
            <label>ТЕКСТ НОВОСТИ</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              placeholder="Содержание новости..."
            />
          </div>

          <button type="submit" className="arcade-button" disabled={loading}>
            {loading ? "СОЗДАНИЕ..." : "➕ СОЗДАТЬ НОВОСТЬ"}
          </button>
        </form>
      </div>
    </div>
  );
}