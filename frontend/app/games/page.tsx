'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/lib/types/game';
import { getGames } from '@/lib/games';
import GameFilters from '@/components/game/GameFilters';
import RetroGameCard from '@/components/game/RetroGameCard';
import GlitchText from '@/components/ui/GlitchText';
import Pagination from '@/components/ui/Pagination';

const ITEMS_PER_PAGE = 12;

type FilterOption = {
  id: number;
  name: string;
};

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [ratingMin, setRatingMin] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('rating-desc');

  useEffect(() => {
    setLoading(true);

    getGames()
      .then((res) => {
        setGames(res.data);
        setFilteredGames(res.data);
      })
      .catch((err) => {
        console.error('API ERROR:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const allGenres: FilterOption[] = Array.from(
    new Set(games.flatMap((game) => game.genres))
  ).map((name, index) => ({
    id: index + 1,
    name,
  }));

  const allTags: FilterOption[] = Array.from(
    new Set(games.flatMap((game) => game.tags))
  ).map((name, index) => ({
    id: index + 1,
    name,
  }));

  useEffect(() => {
    let filtered = [...games];

    if (searchTerm) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      const genreName = allGenres.find((g) => g.id === selectedGenre)?.name;

      if (genreName) {
        filtered = filtered.filter((game) => game.genres.includes(genreName));
      }
    }

    if (selectedTag) {
      const tagName = allTags.find((t) => t.id === selectedTag)?.name;

      if (tagName) {
        filtered = filtered.filter((game) => game.tags.includes(tagName));
      }
    }

    if (ratingMin) {
      filtered = filtered.filter(
        (game) => game.average_rating >= ratingMin
      );
    }

    switch (sortBy) {
      case 'rating-desc':
        filtered.sort((a, b) => b.average_rating - a.average_rating);
        break;

      case 'rating-asc':
        filtered.sort((a, b) => a.average_rating - b.average_rating);
        break;

      case 'date-desc':
        filtered.sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
        break;

      case 'date-asc':
        filtered.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
        break;

      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;

      default:
        break;
    }

    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [games, searchTerm, selectedGenre, selectedTag, ratingMin, sortBy]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGames = filteredGames.slice(start, start + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <section className="hero">
        <GlitchText
          text="ОБЗОРЫ КЛАССИЧЕСКИХ И СОВРЕМЕННЫХ ИГР"
          as="h2"
        />
      </section>

      <GameFilters
        onSearch={setSearchTerm}
        onGenreChange={setSelectedGenre}
        onTagChange={setSelectedTag}
        onRatingFilterChange={setRatingMin}
        onSortChange={setSortBy}
        genres={allGenres}
        tags={allTags}
        totalCount={filteredGames.length}
      />

      <section className="reviews-grid-section">
        <div className="reviews-grid">
          {paginatedGames.map((game) => (
            <RetroGameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}