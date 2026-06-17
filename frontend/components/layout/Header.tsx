"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "@/components/ui/Marquee";
import { getCurrentUser, CurrentUser, logout } from "@/lib/auth";
import { getOnlineCount } from "@/lib/online";

export default function Header() {
  const pathname = usePathname();
  const [online, setOnline] = useState(0);
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const updateUser = () => setUser(getCurrentUser());

    const updateOnline = async () => {
      try {
        const count = await getOnlineCount();
        setOnline(count);
      } catch (err) {
        console.error("ONLINE COUNT ERROR:", err);
      }
    };

    updateUser();
    updateOnline();

    const interval = setInterval(updateOnline, 30000);

    window.addEventListener("storage", updateUser);
    window.addEventListener("authChanged", updateUser);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("authChanged", updateUser);
    };
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header>
      <Marquee text="✦ RETRO GAME FORUM ✦ НОВОСТИ ИГРОВОЙ ИНДУСТРИИ ✦ HIGH SCORE 123456 ✦ READY PLAYER ONE ✦" />

      <div
        className="pacman-header"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0px",
        }}
      >
        <div style={{ marginLeft: "4px" }}>
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="text-[#ff0] hover:underline text-sm"
              >
                {user.nickname}
              </Link>

              <button
                onClick={logout}
                className="text-[#0ff] text-xs hover:text-[#ff0]"
              >
                ВЫЙТИ
              </button>
            </div>
          ) : (
            <Link
              href="/auth/register"
              className="border-2 border-[#ff0] px-3 py-1 text-[#ff0] text-sm hover:bg-[#ff0] hover:text-black transition inline-block"
            >
              ПРИСОЕДИНИТЬСЯ
            </Link>
          )}
        </div>

        <h1
          className="text-xl text-[#ff0] tracking-wider text-center"
          style={{ textShadow: "4px 4px 0 blue, 0 0 20px #ff0" }}
        >
          RETRO GAME FORUM
        </h1>

        <div className="online-indicator" style={{ marginRight: "4px" }}>
          ONLINE: <span>{online}</span>
        </div>
      </div>

      <nav>
        <ul className="flex justify-around flex-wrap border-4 border-[#0f0] p-2 bg-gradient-to-r from-black to-[#222] shadow-[0_0_20px_#0f0]">
          <li>
            <Link
              href="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              data-text="ГЛАВНАЯ"
            >
              ГЛАВНАЯ
            </Link>
          </li>

          <li>
            <Link
              href="/news"
              className={`nav-link ${isActive("/news") ? "active" : ""}`}
              data-text="НОВОСТИ"
            >
              НОВОСТИ
            </Link>
          </li>

          <li>
            <Link
              href="/games"
              className={`nav-link ${isActive("/games") ? "active" : ""}`}
              data-text="ОБЗОРЫ"
            >
              ОБЗОРЫ
            </Link>
          </li>

          <li>
            <Link
              href="/forum"
              className={`nav-link ${isActive("/forum") ? "active" : ""}`}
              data-text="ФОРУМ"
            >
              ФОРУМ
            </Link>
          </li>

          <li>
            <Link
              href="/activities"
              className={`nav-link ${isActive("/activities") ? "active" : ""}`}
              data-text="АКТИВНОСТИ"
            >
              АКТИВНОСТИ
            </Link>
          </li>

          {user && (
            <li>
              <Link
                href="/notifications"
                className={`nav-link ${isActive("/notifications") ? "active" : ""}`}
                data-text="УВЕДОМЛЕНИЯ"
              >
                УВЕДОМЛЕНИЯ
              </Link>
            </li>
          )}

          {user?.role === "admin" && (
            <li>
              <Link
                href="/admin"
                className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                data-text="АДМИНКА"
              >
                АДМИНКА
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}