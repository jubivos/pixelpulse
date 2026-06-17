"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminUsers, deleteAdminUser } from "@/lib/admin";

type AdminUser = {
  id: number;
  login: string;
  nickname: string;
  email: string;
  role: string;
  created_at: string;
  last_activity_at: string | null;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);

    getAdminUsers()
      .then(setUsers)
      .catch((err) => {
        console.error("ADMIN USERS ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Точно удалить пользователя?");

    if (!confirmed) return;

    try {
      await deleteAdminUser(id);
      fetchUsers();
    } catch (err: any) {
      console.error("DELETE USER ERROR:", err);
      alert(err?.error?.message || "Не удалось удалить пользователя");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ...
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
        <h2 className="glitch" data-text="ПОЛЬЗОВАТЕЛИ">
          ПОЛЬЗОВАТЕЛИ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">👥 СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h2>

        <div className="comments-list">
          {users.map((user) => (
            <div key={user.id} className="comment-item">
              <div className="comment-content">
                <div className="comment-header">
                  <span>
                    👤 {user.nickname} / {user.login}
                  </span>
                  <span>⭐ {user.role}</span>
                </div>

                <div className="comment-text">{user.email}</div>

                <div className="flex gap-3 mt-3 flex-wrap">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="read-more"
                  >
                    ПРОФИЛЬ →
                  </Link>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="comment-delete"
                  >
                    УДАЛИТЬ
                  </button>
                </div>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="no-comments">Пользователей пока нет</div>
          )}
        </div>
      </div>
    </div>
  );
}