'use client';
import { useState, useEffect } from 'react';

interface FiltersProps {
  onSearch: (term: string) => void;
  onGenreChange: (genreId: number | null) => void;
  onTagChange: (tagId: number | null) => void;
  onRatingFilterChange: (ratingMin: number | null) => void;
  onSortChange: (sort: string) => void;
  genres: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  totalCount: number;
}

export default function GameFilters({
  onSearch,
  onGenreChange,
  onTagChange,
  onRatingFilterChange,
  onSortChange,
  genres,
  tags,
  totalCount
}: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sort, setSort] = useState('rating-desc');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, onSearch]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGenre(value);
    onGenreChange(value ? Number(value) : null);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTag(value);
    onTagChange(value ? Number(value) : null);
  };

  const handleRatingFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRatingFilter(value);
    onRatingFilterChange(value === 'all' ? null : Number(value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    onSortChange(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <section className="reviews-controls">
      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="ПОИСК ИГРЫ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={clearSearch}>
              ✖
            </button>
          )}
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label>📋 СОРТИРОВКА:</label>
          <select className="arcade-select" value={sort} onChange={handleSortChange}>
            <option value="rating-desc">РЕЙТИНГ (ВЫСОКИЙ)</option>
            <option value="rating-asc">РЕЙТИНГ (НИЗКИЙ)</option>
            <option value="date-desc">НОВЫЕ</option>
            <option value="date-asc">СТАРЫЕ</option>
            <option value="title-asc">НАЗВАНИЕ (А-Я)</option>
            <option value="title-desc">НАЗВАНИЕ (Я-А)</option>
          </select>
        </div>

        <div className="filter-group">
          <label>🎮 ЖАНР:</label>
          <select className="arcade-select" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">ВСЕ ЖАНРЫ</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>🏷️ ТЕГ:</label>
          <select className="arcade-select" value={selectedTag} onChange={handleTagChange}>
            <option value="">ВСЕ ТЕГИ</option>
            {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>⭐ ФИЛЬТР ПО РЕЙТИНГУ:</label>
          <select className="arcade-select" value={ratingFilter} onChange={handleRatingFilterChange}>
            <option value="all">ВСЕ ИГРЫ</option>
            <option value="9">9+ ЗВЁЗД</option>
            <option value="8">8+ ЗВЁЗД</option>
            <option value="7">7+ ЗВЁЗД</option>
            <option value="6">6+ ЗВЁЗД</option>
            <option value="5">5+ ЗВЁЗД</option>
          </select>
        </div>

        <div className="results-count">
          НАЙДЕНО: <span>{totalCount}</span> ИГР
        </div>
      </div>
    </section>
  );
}