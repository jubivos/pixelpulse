'use client';

import Link from 'next/link';
import { Game } from '@/lib/types/game';

export default function RetroGameCard({ game }: { game: Game }) {
  const rating = game.average_rating ?? 0;
  const stars =
    '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');

  const year = game.release_date
    ? new Date(game.release_date).getFullYear()
    : '';

  return (
    <div className="review-card" data-id={game.id}>
      <div className="review-cover">
        {game.cover_image_url ? (
          <img
            src={game.cover_image_url}
            alt={game.title}
            className="review-cover-img"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/300x300';
            }}
          />
        ) : (
          <span className="cover-icon">🎮</span>
        )}
      </div>

      <div className="review-info">
        <h3 className="game-title">{game.title}</h3>

        <div className="game-rating">
          <span className="rating-stars">{stars || '☆'}</span>
          <span className="rating-value">{rating.toFixed(1)}</span>
        </div>

        <div className="game-meta">
          <span className="game-genre">{game.genres[0] || ''}</span>
          <span className="game-year">{year}</span>
        </div>

        <p className="game-review-preview">{game.description}</p>

        <Link href={`/games/${game.id}`} className="read-review-btn">
          ЧИТАТЬ ОБЗОР →
        </Link>
      </div>
    </div>
  );
}