"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminComments, deleteAdminComment } from "@/lib/admin";

type AdminComment = {
  id: number;
  content: string;
  commentable_type: string;
  commentable_id: number;
  created_at: string;

  user: {
    id: number;
    nickname: string;
  };

  target: {
    title: string;
    url: string;
  };
};

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    setLoading(true);

    getAdminComments()
      .then(setComments)
      .catch((err) => {
        console.error("ADMIN COMMENTS ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Точно удалить комментарий?");

    if (!confirmed) return;

    try {
      await deleteAdminComment(id);
      fetchComments();
    } catch (err: any) {
      console.error("DELETE COMMENT ERROR:", err);
      alert(err?.error?.message || "Не удалось удалить комментарий");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА КОММЕНТАРИЕВ...
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
        <h2 className="glitch" data-text="УПРАВЛЕНИЕ КОММЕНТАРИЯМИ">
          УПРАВЛЕНИЕ КОММЕНТАРИЯМИ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">💬 СПИСОК КОММЕНТАРИЕВ</h2>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-content">
                <div className="comment-header">
                  <span>👤 {comment.user.nickname}</span>
                  <span>{comment.commentable_type}</span>
                </div>

                <div className="comment-text">
                  {comment.content.slice(0, 180)}...
                </div>

                <div className="comment-text">
                  Материал: {comment.target.title}
                </div>

                <div className="flex gap-3 mt-3 flex-wrap">
                  <Link
                    href={`/admin/users/${comment.user.id}`}
                    className="read-more"
                  >
                    ПРОФИЛЬ АВТОРА →
                  </Link>

                  <Link href={comment.target.url} className="read-more">
                    ОТКРЫТЬ →
                  </Link>

                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="comment-delete"
                  >
                    УДАЛИТЬ
                  </button>
                </div>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="no-comments">Комментариев пока нет</div>
          )}
        </div>
      </div>
    </div>
  );
}