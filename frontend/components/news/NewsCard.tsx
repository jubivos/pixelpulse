import Link from "next/link";
import { NewsItem } from "@/lib/types/news";

export default function NewsCard({ news }: { news: NewsItem }) {
  const date = new Date(news.published_at).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="news-card">
      {news.cover_image_url && (
        <img
          src={news.cover_image_url}
          alt={news.title}
          className="news-card-image"
        />
      )}

      <div className="news-date">📅 {date}</div>

      <h3>{news.title}</h3>

      <p>{news.content.slice(0, 120)}...</p>

      <div className="text-xs text-[#0ff] mt-2">
        👤 {news.author.nickname} · ❤️ {news.likes_count} · 💬{" "}
        {news.comments_count}
      </div>

      <Link href={`/news/${news.id}`} className="read-more">
        ЧИТАТЬ ДАЛЕЕ →
      </Link>
    </div>
  );
}