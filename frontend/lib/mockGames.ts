export interface Game {
  id: number;
  title: string;
  description: string;
  release_date: string; // YYYY-MM-DD
  cover_icon: string;   // эмодзи или символ
  rating: number;       // средний рейтинг от 1 до 10
  genres: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  reviews_count: number;
}

export const mockGames: Game[] = [
  {
    id: 11,
    title: "ELDEN RING",
    description: "Шедевр от FromSoftware",
    release_date: "2022-02-25",
    cover_icon: "🎮",
    rating: 9.8,
    genres: [{ id: 1, name: "RPG" }],
    tags: [
      { id: 1, name: "открытый мир" },
      { id: 2, name: "соулслайк" }
    ],
    reviews_count: 1243,
  },
  {
    id: 12,
    title: "THE LEGEND OF ZELDA",
    description: "Новое приключение в Hyrule",
    release_date: "2023-05-12",
    cover_icon: "🗡️",
    rating: 9.9,
    genres: [{ id: 2, name: "Adventure" }],
    tags: [{ id: 3, name: "приключения" }],
    reviews_count: 987,
  },
  {
    id: 13,
    title: "CYBERPUNK 2077",
    description: "Футуристический ролевой экшен",
    release_date: "2020-12-10",
    cover_icon: "🤖",
    rating: 8.2,
    genres: [{ id: 1, name: "RPG" }],
    tags: [
      { id: 4, name: "киберпанк" },
      { id: 1, name: "открытый мир" }
    ],
    reviews_count: 2156,
  },
  {
    id: 14,
    title: "HADES II",
    description: "Быстрый рогалик в мире древнегреческой мифологии",
    release_date: "2024-05-06",
    cover_icon: "🏛️",
    rating: 9.4,
    genres: [{ id: 3, name: "Roguelike" }],
    tags: [
      { id: 5, name: "рогалик" },
      { id: 6, name: "мифология" }
    ],
    reviews_count: 745,
  },
  {
    id: 15,
    title: "STAR WARS JEDI: SURVIVOR",
    description: "Продолжение приключений Кэла Кестиса",
    release_date: "2023-04-28",
    cover_icon: "⚡",
    rating: 8.7,
    genres: [
      { id: 4, name: "Action" },
      { id: 2, name: "Adventure" }
    ],
    tags: [
      { id: 7, name: "джедаи" },
      { id: 8, name: "световой меч" }
    ],
    reviews_count: 1123,
  },
  {
    id: 16,
    title: "HOLLOW KNIGHT: SILKSONG",
    description: "Долгожданное продолжение метроидвании",
    release_date: "2025-02-24",
    cover_icon: "🕷️",
    rating: 9.6,
    genres: [{ id: 5, name: "Metroidvania" }],
    tags: [
      { id: 9, name: "метроидвания" },
      { id: 10, name: "атмосферно" }
    ],
    reviews_count: 890,
  },
  {
    id: 17,
    title: "GOD OF WAR RAGNARÖK",
    description: "Финальная сага Кратоса и Атрея в скандинавской мифологии",
    release_date: "2022-11-09",
    cover_icon: "🪓",
    rating: 9.7,
    genres: [{ id: 4, name: "Action" }],
    tags: [
      { id: 11, name: "мифология" },
      { id: 12, name: "слэшер" }
    ],
    reviews_count: 1876,
  },
  {
    id: 18,
    title: "FINAL FANTASY VII REBIRTH",
    description: "Эпичное продолжение ремейка культовой JRPG",
    release_date: "2024-02-29",
    cover_icon: "⚗️",
    rating: 9.3,
    genres: [{ id: 1, name: "RPG" }],
    tags: [
      { id: 13, name: "jrpg" },
      { id: 14, name: "открытый мир" }
    ],
    reviews_count: 1432,
  },
  {
    id: 19,
    title: "BALDUR'S GATE 3",
    description: "Глубокая тактическая RPG по мотивам D&D",
    release_date: "2023-08-03",
    cover_icon: "🎲",
    rating: 9.9,
    genres: [{ id: 1, name: "RPG" }],
    tags: [
      { id: 15, name: "партийная" },
      { id: 16, name: "тактическая" }
    ],
    reviews_count: 4321,
  },
  {
    id: 20,
    title: "SPIDER-MAN 2",
    description: "Питер Паркер и Майлз Моралес против Венома",
    release_date: "2023-10-20",
    cover_icon: "🕸️",
    rating: 9.1,
    genres: [{ id: 4, name: "Action" }],
    tags: [
      { id: 17, name: "супергерои" },
      { id: 1, name: "открытый мир" }
    ],
    reviews_count: 2987,
  },
  {
    id: 21,
    title: "DIABLO IV",
    description: "Мрачный action-RPG в мире Sanctuary",
    release_date: "2023-06-06",
    cover_icon: "👹",
    rating: 8.4,
    genres: [{ id: 1, name: "RPG" }],
    tags: [
      { id: 18, name: "лутер" },
      { id: 19, name: "кооператив" }
    ],
    reviews_count: 2678,
  },
  {
    id: 22,
    title: "LIKE A DRAGON: INFINITE WEALTH",
    description: "Безумное приключение Ичибана и Кирию на Гавайях",
    release_date: "2024-01-26",
    cover_icon: "🏝️",
    rating: 9.0,
    genres: [{ id: 1, name: "RPG" }],
    tags: [
      { id: 20, name: "юмор" },
      { id: 21, name: "криминал" }
    ],
    reviews_count: 956,
  },
  {
    id: 23,
    title: "DEAD SPACE REMAKE",
    description: "Ужасы на борту космического корабля Ishimura",
    release_date: "2023-01-27",
    cover_icon: "🔧",
    rating: 8.9,
    genres: [{ id: 5, name: "Horror" }],
    tags: [
      { id: 22, name: "выживание" },
      { id: 23, name: "космический хоррор" }
    ],
    reviews_count: 1122,
  },
  {
    id: 24,
    title: "FORZA MOTORSPORT 8",
    description: "Реалистичный симулятор гонок с физикой нового поколения",
    release_date: "2023-10-10",
    cover_icon: "🏎️",
    rating: 8.7,
    genres: [{ id: 6, name: "Racing" }],
    tags: [
      { id: 24, name: "гонки" },
      { id: 25, name: "симулятор" }
    ],
    reviews_count: 734,
  },
  {
    id: 25,
    title: "ANIMAL WELL",
    description: "Загадочный метроидвания с пиксельной графикой и неожиданными головоломками",
    release_date: "2024-05-09",
    cover_icon: "🐔",
    rating: 9.2,
    genres: [{ id: 5, name: "Metroidvania" }],
    tags: [
      { id: 26, name: "головоломки" },
      { id: 27, name: "пиксели" }
    ],
    reviews_count: 543,
  },
  {
    id: 26,
    title: "TEKKEN 8",
    description: "Динамичный файтинг с улучшенной графикой и механикой Heat",
    release_date: "2024-01-26",
    cover_icon: "👊",
    rating: 9.0,
    genres: [{ id: 7, name: "Fighting" }],
    tags: [
      { id: 28, name: "файтинг" },
      { id: 29, name: "многопользовательский" }
    ],
    reviews_count: 2341,
  }
];

export function getTopGamesOfWeek(limit = 5): Game[] {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);
  const filtered = mockGames.filter(game => {
    const release = new Date(game.release_date);
    return release >= sevenDaysAgo && release <= now;
  });
  const sorted = [...filtered].sort((a,b) => b.rating - a.rating);
  return sorted.slice(0, limit);
}