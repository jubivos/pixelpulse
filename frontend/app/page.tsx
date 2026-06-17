'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import GlitchText from '@/components/ui/GlitchText';
import { getTopGamesOfWeek } from '@/lib/mockGames';
import { getActiveTopics } from '@/lib/mockNews';

export default function HomePage() {
  const [topGames, setTopGames] = useState<any[]>([]);
  const [activeTopics, setActiveTopics] = useState<any[]>([]);

  useEffect(() => {
    setTopGames(getTopGamesOfWeek(5));
    setActiveTopics(getActiveTopics(3));
  }, []);

  const [ghosts, setGhosts] = useState({
    red: true,
    cyan: true,
    orange: true,
  });

  const toggleGhost = (color: 'red' | 'cyan' | 'orange') => {
    setGhosts(prev => ({ ...prev, [color]: !prev[color] }));
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-6xl px-4">
        {/* Герой-секция */}
        <section className="hero">
          <GlitchText text="ДОБРО ПОЖАЛОВАТЬ В RETRO GAME FORUM!" as="h2" />

          {/* Аркадный автомат */}
          <div className="arcade-cabinet">
            <div className="cabinet-top"></div>
            <div className="cabinet-screen">
              <div className="game-preview">
                <div className="pacman-game">
                  <div className="pacman-character"></div>
                  <div
                    className={`ghost-character red-ghost ${!ghosts.red ? 'dissolve' : ''}`}
                    style={{ display: ghosts.red ? 'block' : 'none' }}
                  ></div>
                  <div className="ghost-character pink-ghost"></div>
                  <div
                    className={`ghost-character cyan-ghost ${!ghosts.cyan ? 'dissolve' : ''}`}
                    style={{ display: ghosts.cyan ? 'block' : 'none' }}
                  ></div>
                  <div
                    className={`ghost-character orange-ghost ${!ghosts.orange ? 'dissolve' : ''}`}
                    style={{ display: ghosts.orange ? 'block' : 'none' }}
                  ></div>
                  <div className="dot-row">
                    <span className="game-dot"></span><span className="game-dot"></span><span className="game-dot"></span><span className="game-dot"></span><span className="game-dot"></span>
                    <span className="game-dot"></span><span className="game-dot"></span><span className="game-dot"></span><span className="game-dot"></span><span className="game-dot"></span>
                  </div>
                </div>
                <div className="screen-glow"></div>
              </div>
            </div>
            <div className="cabinet-controls">
              <div className="joystick"></div>
              <div className="button red" onClick={() => toggleGhost('red')}></div>
              <div className="button blue" onClick={() => toggleGhost('cyan')}></div>
              <div className="button yellow" onClick={() => toggleGhost('orange')}></div>
            </div>
          </div>
        </section>

        {/* Разделы форума */}
        <section className="features">
          <h2 className="section-title blink">РАЗДЕЛЫ ФОРУМА:</h2>
          <div className="features-grid">
            <Link href="/news" className="feature-card">
              <span className="card-icon">📰</span>
              <h3>НОВОСТИ</h3>
              <p>Свежие новости игровой индустрии</p>
              <span className="enter-btn">ПЕРЕЙТИ →</span>
            </Link>
            <Link href="/games" className="feature-card">
              <span className="card-icon">🎮</span>
              <h3>ОБЗОРЫ</h3>
              <p>Обзоры классических и новых игр</p>
              <span className="enter-btn">ПЕРЕЙТИ →</span>
            </Link>
            <div className="feature-card" style={{ cursor: 'default' }}>
              <span className="card-icon">💬</span>
              <h3>ФОРУМ</h3>
              <p>Обсуждения, секреты, советы</p>
              <span className="enter-btn" style={{ opacity: 0.5, pointerEvents: 'none' }}>СКОРО</span>
            </div>
          </div>
        </section>

        {/* Топ игр недели */}
        <section className="highscores">
          <div className="scoreboard">
            <h3>⭐ ТОП ИГР НЕДЕЛИ ⭐</h3>
            {topGames.length === 0 && <div className="text-center text-[#0ff] text-xs py-2">Нет новых игр за эту неделю</div>}
            {topGames.map((game, idx) => (
              <div key={game.id} className="score-row">
                <span>{idx + 1}. {game.title}</span>
                <span>⭐ {game.rating.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Активные темы */}
        <section className="latest-discussions">
          <h2 className="section-title blink">🔥 АКТИВНЫЕ ТЕМЫ</h2>
          <div className="topics-grid">
            {activeTopics.length === 0 && <div className="text-center text-[#0ff] text-xs py-4">Нет активных обсуждений</div>}
            {activeTopics.map(topic => (
              <Link key={topic.id} href={`/news/${topic.id}`} className="topic-item">
                <span className="topic-icon">💬</span>
                <div className="topic-info">
                  <h4>{topic.title}</h4>
                  <p>💬 {topic.commentsCount} • ❤️ {topic.likesCount}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}