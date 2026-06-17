"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createAdminGame } from "@/lib/admin";

export default function CreateGamePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    specifications: "",
    cover_image_url: "https://picsum.photos/300/200",
    release_date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createAdminGame(form);
      router.push("/admin/games");
    } catch (err: any) {
      console.error("CREATE GAME ERROR:", err);
      alert(err?.error?.message || "Не удалось создать игру");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="back-button">
        <Link href="/admin/games" className="arcade-link">
          ◀ НАЗАД К ИГРАМ
        </Link>
      </div>

      <section className="hero">
        <h2 className="glitch" data-text="СОЗДАТЬ ИГРУ">
          СОЗДАТЬ ИГРУ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">🎮 НОВАЯ ИГРА</h2>

        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-group">
            <label>НАЗВАНИЕ</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Название игры"
            />
          </div>

          <div className="form-group">
            <label>ОПИСАНИЕ</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Описание игры..."
            />
          </div>

          <div className="form-group">
            <label>ХАРАКТЕРИСТИКИ</label>
            <textarea
              name="specifications"
              value={form.specifications}
              onChange={handleChange}
              rows={4}
              placeholder="Платформа, жанр, особенности..."
            />
          </div>

          <div className="form-group">
            <label>URL ОБЛОЖКИ</label>
            <input
              type="text"
              name="cover_image_url"
              value={form.cover_image_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label>ДАТА РЕЛИЗА</label>
            <input
              type="date"
              name="release_date"
              value={form.release_date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="arcade-button" disabled={loading}>
            {loading ? "СОЗДАНИЕ..." : "➕ СОЗДАТЬ ИГРУ"}
          </button>
        </form>
      </div>
    </div>
  );
}