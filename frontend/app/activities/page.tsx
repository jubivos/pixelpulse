"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getActivities } from "@/lib/social";

type Activity = {
  id: number;
  action_type: string;
  created_at: string;

  user: {
    id: number;
    nickname: string;
  };

  target: {
    type: string;
    id: number;
    title?: string;
    content?: string;
    url: string;
  };
};

const actionText: Record<string, string> = {
  login: "вошёл в систему",
  create_review: "оставил рецензию",
  comment: "оставил комментарий",
  like: "поставил лайк",
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities()
      .then(setActivities)
      .catch((err) => {
        console.error("ACTIVITIES ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-[#0f0]">
        ЗАГРУЗКА АКТИВНОСТЕЙ...
      </div>
    );
  }

  return (
    <div className="profile-container">
      <section className="hero">
        <h2 className="glitch" data-text="АКТИВНОСТИ">
          АКТИВНОСТИ
        </h2>
      </section>

      <div className="card">
        <h2 className="card-title">⚡ ЛЕНТА АКТИВНОСТИ</h2>

        <div className="comments-list">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={activity.target.url || "#"}
              className="comment-item"
            >
              <div className="comment-content">
                <div className="comment-header">
                  <span>👤 {activity.user.nickname}</span>
                  <span>
                    {new Date(activity.created_at).toLocaleDateString("ru-RU")}
                  </span>
                </div>

                <div className="comment-text">
                  {actionText[activity.action_type] || activity.action_type}
                </div>

                <div className="comment-text">
                  {activity.target.title ||
                    activity.target.content ||
                    `${activity.target.type} #${activity.target.id}`}
                </div>
              </div>
            </Link>
          ))}

          {activities.length === 0 && (
            <div className="no-comments">Активностей пока нет</div>
          )}
        </div>
      </div>
    </div>
  );
}