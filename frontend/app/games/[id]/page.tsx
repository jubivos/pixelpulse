"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getGame } from "@/lib/games";
import ReviewFormRetro from "@/components/game/ReviewFormRetro";
import ReviewListRetro, { Review } from "@/components/game/ReviewListRetro";
import GlitchText from "@/components/ui/GlitchText";
import { toggleLikeReview } from "@/lib/likes";

type Game = {
  id: number;
  title: string;
  description: string;
  specifications?: string;
  cover_image_url: string;
  release_date: string;
  genres: string[];
  tags: string[];
  reviews_count: number;
  average_rating: number;
  reviews: Review[];
};

export default function GamePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated =
    typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

  const fetchGame = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const res = await getGame(String(id));
      setGame(res.data);
    } catch (err) {
      console.error("GAME LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGame();
  }, [id]);

  const handleReviewCreated = () => {
    fetchGame();
  };

  const handleLike = async (reviewId: number) => {
    try {
      await toggleLikeReview(reviewId);
      fetchGame();
    } catch (err) {
      console.error("LIKE ERROR:", err);
      alert("Чтобы поставить лайк, нужно войти в аккаунт");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-[#0f0]">ЗАГРУЗКА...</div>;
  }

  if (!game) {
    return <div className="text-center py-20 text-[#f00]">ИГРА НЕ НАЙДЕНА</div>;
  }

  const rating = game.average_rating ?? 0;
  const stars =
    "⭐".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");

  const releaseYear = game.release_date
    ? new Date(game.release_date).getFullYear()
    : "";

  const formattedDate = game.release_date
    ? new Date(game.release_date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <article className="review-article">
      <div className="back-button">
        <Link href="/games" className="arcade-link">
          ◀ НАЗАД К ОБЗОРАМ
        </Link>
      </div>

      <section className="hero">
        <GlitchText text={game.title} as="h2" />
      </section>

      <div className="article-meta">
        <span className="article-date">📅 {formattedDate}</span>
        <span className="article-rating">
          ⭐ Рейтинг: {rating.toFixed(1)}/10
        </span>
        <span className="article-comments-count">
          💬 {game.reviews_count} отзывов
        </span>
      </div>

      <div className="article-image">
        <div className="game-cover-large">
          {game.cover_image_url ? (
            <img
              src={game.cover_image_url}
              alt={game.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/800x400";
              }}
            />
          ) : (
            <span className="cover-icon">🎮</span>
          )}
        </div>
        <div className="image-caption">{game.title} – официальный арт</div>
      </div>

      <div className="game-info-vertical">
        <div className="info-item">
          <span className="info-label">🎮 ЖАНРЫ:</span>
          <span className="info-value">{game.genres.join(", ")}</span>
        </div>

        <div className="info-item">
          <span className="info-label">🏷️ ТЕГИ:</span>
          <span className="info-value">{game.tags.join(", ")}</span>
        </div>

        <div className="info-item">
          <span className="info-label">📅 ГОД ВЫПУСКА:</span>
          <span className="info-value">{releaseYear}</span>
        </div>

        {game.specifications && (
          <div className="info-item">
            <span className="info-label">⚙️ ХАРАКТЕРИСТИКИ:</span>
            <span className="info-value">{game.specifications}</span>
          </div>
        )}
      </div>

      <div className="article-content">
        <p>{game.description}</p>

        <h3>🏆 ВЕРДИКТ</h3>
        <p>{game.description}</p>

        <div className="final-rating">
          <span className="rating-label">ИТОГОВАЯ ОЦЕНКА:</span>
          <span className="final-stars">{stars || "☆"}</span>
          <span className="final-value">{rating.toFixed(1)} / 10</span>
        </div>
      </div>

      <div className="comments-section">
        <h2 className="section-title blink">💬 ОТЗЫВЫ ИГРОКОВ</h2>

        {isAuthenticated ? (
          <ReviewFormRetro gameId={game.id} onSuccess={handleReviewCreated} />
        ) : (
          <div className="comment-form">
            <p className="text-center text-[#0f0] text-xs">
              🔒{" "}
              <Link href="/auth/login" className="text-[#ff0] underline">
                Войдите
              </Link>
              , чтобы оставить отзыв
            </p>
          </div>
        )}

        <ReviewListRetro
          reviews={game.reviews}
          onLike={handleLike}
          likedReviews={{}}
        />
      </div>
    </article>
  );
}