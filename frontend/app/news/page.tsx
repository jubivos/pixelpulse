"use client";

import { useState, useEffect } from "react";
import { getNews } from "@/lib/news";
import { NewsItem } from "@/lib/types/news";
import NewsCard from "@/components/news/NewsCard";
import GlitchText from "@/components/ui/GlitchText";
import Pagination from "@/components/ui/Pagination";

const ITEMS_PER_PAGE = 12;

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    getNews()
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error("NEWS API ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = news.slice(start, start + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .querySelector(".news-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <p className="text-center text-[#0f0] py-8">ЗАГРУЗКА...</p>;
  }

  if (news.length === 0) {
    return (
      <div>
        <section className="hero">
          <GlitchText
            text="ПОСЛЕДНИЕ НОВОСТИ ИГРОВОЙ ИНДУСТРИИ"
            as="h2"
          />
        </section>

        <section className="news-section">
          <h2 className="section-title blink">🔥 СВЕЖИЕ НОВОСТИ 🔥</h2>
          <p className="text-center text-[#0ff] py-8">
            Новостей пока нет. Загляните позже!
          </p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="hero">
        <GlitchText
          text="ПОСЛЕДНИЕ НОВОСТИ ИГРОВОЙ ИНДУСТРИИ"
          as="h2"
        />
      </section>

      <section className="news-section">
        <h2 className="section-title blink">🔥 СВЕЖИЕ НОВОСТИ 🔥</h2>

        <div className="news-grid">
          {paginatedNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}