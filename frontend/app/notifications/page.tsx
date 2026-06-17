"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNotifications, markNotificationAsRead } from "@/lib/social";

type Notification = {
  id: number;
  action: string;
  read: boolean;
  created_at: string;

  actor: {
    id: number;
    nickname: string;
  };

  notifiable: {
    type: string;
    id: number;
    title?: string;
    content?: string;
    url: string;
  };
};

const actionText: Record<string, string> = {
  liked: "поставил лайк",
  commented: "оставил комментарий",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    setLoading(true);

    getNotifications()
      .then(setNotifications)
      .catch((err) => {
        console.error("NOTIFICATIONS ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      fetchNotifications();
    } catch (err) {
      console.error("MARK NOTIFICATION ERROR:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА УВЕДОМЛЕНИЙ...
      </div>
    );
  }

  return (
    <div className="profile-container">
      <section className="hero">
        <h2 className="glitch" data-text="УВЕДОМЛЕНИЯ">
          УВЕДОМЛЕНИЯ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">🔔 МОИ УВЕДОМЛЕНИЯ</h2>

        <div className="comments-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="comment-item"
              style={{
                borderColor: notification.read ? "#0f0" : "#ff0",
              }}
            >
              <div className="comment-content">
                <div className="comment-header">
                  <span>👤 {notification.actor.nickname}</span>
                  <span>
                    {notification.read ? "ПРОЧИТАНО" : "НОВОЕ"}
                  </span>
                </div>

                <div className="comment-text">
                  {actionText[notification.action] || notification.action}
                </div>

                <div className="comment-text">
                  {notification.notifiable.title ||
                    notification.notifiable.content ||
                    `${notification.notifiable.type} #${notification.notifiable.id}`}
                </div>

                <div className="flex gap-3 mt-3 flex-wrap">
                  <Link
                    href={notification.notifiable.url || "#"}
                    className="read-more"
                  >
                    ОТКРЫТЬ →
                  </Link>

                  {!notification.read && (
                    <button
                      onClick={() => handleRead(notification.id)}
                      className="read-more"
                    >
                      ПРОЧИТАНО
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="no-comments">Уведомлений пока нет</div>
          )}
        </div>
      </div>
    </div>
  );
}