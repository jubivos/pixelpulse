"use client";

export type Review = {
  id: number;
  rating: number;
  content: string;
  user: {
    id: number;
    nickname: string;
  };
  created_at?: string;
  likes_count?: number;
};

interface Props {
  reviews: Review[];
  onLike: (reviewId: number) => void;
  likedReviews: Record<number, boolean>;
}

export default function ReviewListRetro({
  reviews,
  onLike,
  likedReviews,
}: Props) {
  const formatDate = (iso?: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("ru-RU");
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-[#ff0] text-center text-sm">ОТЗЫВЫ ИГРОКОВ</h3>

      {reviews.length === 0 && (
        <div className="text-center text-[#0ff] text-xs py-8 border-2 border-dashed border-[#0f0]">
          Пока нет отзывов. Будьте первым!
        </div>
      )}

      {reviews.map((review) => (
        <div key={review.id} className="bg-black border-2 border-[#0f0] p-3">
          <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
            <div>
              <span className="text-[#ff0] text-xs">
                👤 {review.user.nickname}
              </span>
              <span className="text-[#0ff] text-xs ml-3">
                ⭐ {review.rating}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onLike(review.id)}
                className={`text-xs ${
                  likedReviews[review.id] ? "text-[#ff0]" : "text-[#0f0]"
                } hover:text-[#ff0] transition`}
              >
                ❤️ {review.likes_count ?? 0}
              </button>

              {review.created_at && (
                <span className="text-[#0f0] text-[10px]">
                  {formatDate(review.created_at)}
                </span>
              )}
            </div>
          </div>

          <p className="text-[#0f0] text-xs leading-relaxed">
            {review.content}
          </p>
        </div>
      ))}
    </div>
  );
}