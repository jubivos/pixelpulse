"use client";

import { useState } from "react";
import { createReview } from "@/lib/games";

interface Props {
  gameId: number;
  onSuccess: () => void;
}

export default function ReviewFormRetro({ gameId, onSuccess }: Props) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setIsLoading(true);

      await createReview(gameId, {
        rating,
        content,
      });

      setContent("");
      setRating(5);
      onSuccess();
    } catch (err) {
      console.error("CREATE REVIEW ERROR:", err);
      alert("Не удалось отправить отзыв. Проверь, что ты авторизована.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#111] border-2 border-[#0f0] p-4 mt-6">
      <h3 className="text-[#ff0] text-center text-sm mb-4">
        НАПИСАТЬ ОБЗОР
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#0f0] text-xs mb-1">
            ОЦЕНКА (1-10):
          </label>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="bg-black border-2 border-[#0f0] p-2 text-[#0ff] font-mono text-xs"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[#0f0] text-xs mb-1">
            ТЕКСТ ОБЗОРА:
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full bg-black border-2 border-[#0f0] p-2 text-[#0f0] font-mono text-xs resize-y focus:border-[#ff0] outline-none"
            placeholder="Поделитесь впечатлениями..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full border-2 border-[#ff0] py-2 text-[#ff0] hover:bg-[#ff0] hover:text-black transition font-mono text-sm"
        >
          {isLoading ? "ОТПРАВКА..." : "ОТПРАВИТЬ ОБЗОР →"}
        </button>
      </form>
    </div>
  );
}