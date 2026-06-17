export interface Review {
  id: number;
  userId: number;
  userNickname: string;
  rating: number;
  content: string;
  status: 'draft' | 'moderated' | 'published';
  createdAt: string;
  likesCount: number;
}

export type NewReviewInput = {
  userId: number;
  userNickname: string;
  rating: number;
  content: string;
};

export interface GameFull {
  id: number;
  title: string;
  description: string;
  coverIcon: string;
  releaseDate: string;
  genres: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  averageRating: number;
  reviewsCount: number;
  pros?: string[];
  cons?: string[];
  similarGames?: { id: number; title: string; rating: number; coverIcon: string }[];
}

export interface CurrentUser {
  id: number;
  nickname: string;
  role: 'user' | 'moderator' | 'admin';
}

export const initialReviews: Review[] = [
  {
    id: 121,
    userId: 2,
    userNickname: "GAME_MASTER",
    rating: 10,
    content: "Абсолютный шедевр! Графика, сюжет, геймплей — всё на высоте.",
    status: "published",
    createdAt: new Date(2025, 2, 15).toISOString(),
    likesCount: 5,
  },
  {
    id: 122,
    userId: 3,
    userNickname: "RETRO_FAN",
    rating: 9,
    content: "Отличная игра, но есть небольшие баги. Рекомендую!",
    status: "published",
    createdAt: new Date(2025, 2, 20).toISOString(),
    likesCount: 2,
  },
  {
    id: 123,
    userId: 4,
    userNickname: "CRITIC",
    rating: 7,
    content: "Средне. Ожидал большего от такой франшизы.",
    status: "moderated",
    createdAt: new Date(2025, 2, 25).toISOString(),
    likesCount: 0,
  },
];


export const mockGameFull: GameFull = {
  id: 1,
  title: "ELDEN RING",
  description: "Шедевр от FromSoftware. Открытый мир, сложные бои и глубокая история.",
  coverIcon: "🎮",
  releaseDate: "2022-02-25",
  genres: [{ id: 1, name: "RPG" }],
  tags: [{ id: 1, name: "открытый мир" }, { id: 2, name: "соулслайк" }],
  averageRating: 9.8,
  reviewsCount: 1243,
  pros: [
    "Огромный открытый мир без искусственных ограничений",
    "Глубокий и честный геймплей",
    "Сотни уникальных врагов и боссов",
    "Красивый визуальный стиль и музыка",
    "Огромная реиграбельность"
  ],
  cons: [
    "Высокий порог вхождения",
    "Изредка технические шероховатости",
    "Отсутствие чёткого сюжетного маркера"
  ],
  similarGames: [
    { id: 2, title: "DARK SOULS III", rating: 9.5, coverIcon: "⚔️" },
    { id: 3, title: "BLOODBORNE", rating: 9.8, coverIcon: "🔫" },
    { id: 4, title: "SEKIRO", rating: 9.7, coverIcon: "⚔️" },
    { id: 5, title: "DEMON'S SOULS", rating: 9.4, coverIcon: "👹" }
  ]
};


const STORAGE_REVIEWS_KEY = `game_${mockGameFull.id}_reviews`;
const STORAGE_LIKES_KEY = `game_${mockGameFull.id}_likes`; 

export function loadReviews(): Review[] {
  const stored = localStorage.getItem(STORAGE_REVIEWS_KEY);
  if (!stored) {
    saveReviews(initialReviews);
    return initialReviews;
  }
  return JSON.parse(stored);
}

export function saveReviews(reviews: Review[]) {
  localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
}

// Добавление нового обзора (статус moderated)
export function addReview(input: NewReviewInput) {
  const reviews = loadReviews();
  const newId = Date.now();
  const newReview: Review = {
    id: newId,
    userId: input.userId,
    userNickname: input.userNickname,
    rating: input.rating,
    content: input.content,
    status: 'moderated',
    createdAt: new Date().toISOString(),
    likesCount: 0,
  };
  reviews.push(newReview);
  saveReviews(reviews);
  return newReview;
}

// Обновление статуса обзора (approve/reject)
export function updateReviewStatus(reviewId: number, status: 'published' | 'moderated' | 'draft') {
  const reviews = loadReviews();
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index !== -1) {
    reviews[index].status = status;
    saveReviews(reviews);
  }
}


export function getLikes(): Record<number, boolean> {
  const stored = localStorage.getItem(STORAGE_LIKES_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function setLike(reviewId: number, liked: boolean) {
  const likes = getLikes();
  if (liked) {
    likes[reviewId] = true;
  } else {
    delete likes[reviewId];
  }
  localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(likes));
  const reviews = loadReviews();
  const review = reviews.find(r => r.id === reviewId);
  if (review) {
    if (liked) review.likesCount++;
    else review.likesCount--;
    saveReviews(reviews);
  }
}


export function getCurrentUser(): CurrentUser | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const role = localStorage.getItem('user_role') as CurrentUser['role'] || 'user';
  const nickname = localStorage.getItem('user_nickname') || 'PLAYER_1';
  return {
    id: 1, 
    nickname,
    role,
  };
}