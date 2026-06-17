"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getNewsItem } from "@/lib/news";
import { getNewsComments, createNewsComment } from "@/lib/comments";
import { toggleLikeNews } from "@/lib/likes";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  cover_image_url: string | null;
  author: {
    id: number;
    nickname: string;
  };
  published_at: string;
  likes_count: number;
  comments_count: number;
};

type Comment = {
  id: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    nickname: string;
  };
  replies: Comment[];
};

export default function NewsDetailPage() {
  const params = useParams();
  const rawId = params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [news, setNews] = useState<NewsItem | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const isAuthenticated =
    typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

  const fetchNews = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const [newsRes, commentsRes] = await Promise.all([
        getNewsItem(String(id)),
        getNewsComments(Number(id)),
      ]);

      setNews(newsRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      console.error("NEWS DETAIL ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  const handleLikeNews = async () => {
    if (!news) return;

    try {
      await toggleLikeNews(news.id);
      await fetchNews();
    } catch (err) {
      console.error("LIKE NEWS ERROR:", err);
      alert("Чтобы поставить лайк, нужно войти в аккаунт");
    }
  };

  const handleAddComment = async (
    parentId: number | null,
    content: string
  ) => {
    if (!news) return;

    if (!isAuthenticated) {
      alert("Войдите, чтобы оставить комментарий");
      return;
    }

    if (!content.trim()) return;

    try {
      await createNewsComment(news.id, {
        content,
        parent_id: parentId,
      });

      setCommentText("");
      await fetchNews();
    } catch (err) {
      console.error("CREATE COMMENT ERROR:", err);
      alert("Не удалось добавить комментарий");
    }
  };

  const CommentTree = ({
    comment,
    level,
  }: {
    comment: Comment;
    level: number;
  }) => {
    const maxDepth = 3;
    const canReply = level < maxDepth && isAuthenticated;

    return (
      <div className="comment-item" style={{ marginLeft: level * 20 }}>
        <div className="comment-avatar">👤</div>

        <div className="comment-content">
          <div className="comment-header">
            <span className="comment-name">{comment.user.nickname}</span>
            <span className="comment-date">
              📅 {new Date(comment.created_at).toLocaleString("ru-RU")}
            </span>
          </div>

          <div className="comment-text">{comment.content}</div>

          {canReply && (
            <button
              onClick={() => {
                const reply = prompt("Ваш ответ:");

                if (reply && reply.trim()) {
                  handleAddComment(comment.id, reply.trim());
                }
              }}
              className="text-[#0ff] text-xs hover:text-[#ff0]"
            >
              ↪ Ответить
            </button>
          )}

          {comment.replies?.length > 0 && (
            <div className="mt-3">
              {comment.replies.map((reply) => (
                <CommentTree
                  key={reply.id}
                  comment={reply}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">ЗАГРУЗКА...</div>
    );
  }

  if (!news) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        НОВОСТЬ НЕ НАЙДЕНА
      </div>
    );
  }

  const formattedDate = new Date(news.published_at).toLocaleDateString(
    "ru-RU",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <article className="review-article">
      <div className="back-button">
        <Link href="/news" className="arcade-link">
          ◀ НАЗАД К НОВОСТЯМ
        </Link>
      </div>

      <h1 className="article-title glitch" data-text={news.title}>
        {news.title}
      </h1>

      <div className="article-meta">
        <span className="article-date">📅 {formattedDate}</span>
        <span className="article-author">
          ✍️ Автор: {news.author.nickname}
        </span>
        <span className="article-comments-count">
          💬 {comments.length} комментариев
        </span>
      </div>

      <div className="article-image">
        {news.cover_image_url ? (
          <img src={news.cover_image_url} alt={news.title} />
        ) : (
          <img
            src="https://placehold.co/800x400/111/0F0?text=NEWS"
            alt={news.title}
          />
        )}

        <div className="image-caption">{news.title}</div>
      </div>

      <div className="article-content">
        <p>{news.content}</p>
      </div>

      <div className="flex justify-center gap-6 my-6">
        <button
          onClick={handleLikeNews}
          className="text-sm text-[#0f0] hover:text-[#ff0] transition"
        >
          ❤️ {news.likes_count}
        </button>

        <span className="text-[#0ff] text-sm">💬 {comments.length}</span>
      </div>

      <div className="comments-section">
        <h2 className="section-title blink">💬 КОММЕНТАРИИ</h2>

        {isAuthenticated ? (
          <div className="comment-form">
            <h3>ДОБАВИТЬ КОММЕНТАРИЙ</h3>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
              placeholder="Введите ваш комментарий..."
              className="w-full bg-black border-2 border-[#0f0] p-2 font-mono text-[#0f0] text-xs resize-y"
            />

            <button
              onClick={() => handleAddComment(null, commentText)}
              className="arcade-button mt-3"
            >
              ➡ ОТПРАВИТЬ
            </button>
          </div>
        ) : (
          <div className="comment-form">
            <p className="text-center text-[#0f0] text-xs">
              🔒{" "}
              <Link href="/auth/login" className="text-[#ff0] underline">
                Войдите
              </Link>
              , чтобы оставить комментарий
            </p>
          </div>
        )}

        <div className="comments-list">
          {comments.length === 0 && (
            <div className="no-comments">
              🤖 ПОКА НЕТ КОММЕНТАРИЕВ. БУДЬ ПЕРВЫМ!
            </div>
          )}

          {comments.map((comment) => (
            <CommentTree key={comment.id} comment={comment} level={0} />
          ))}
        </div>
      </div>
    </article>
  );
}