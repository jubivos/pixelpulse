export interface NewsItem {
  id: number;
  title: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  imageUrl: string;
  likesCount: number;
  commentsCount: number;
}

export interface NewsComment {
  id: number;
  newsId: number;
  userId: number;
  userNickname: string;
  parentId: number | null;
  content: string;
  createdAt: string;
  likesCount: number;
}

export interface CurrentUser {
  id: number;
  nickname: string;
  role: 'user' | 'moderator' | 'admin';
}

// Мок новостей (список)
export const mockNewsList: NewsItem[] = [
  {
    id: 1,
    title: "Анонсирована новая игра от создателей Hollow Knight",
    content: "Team Cherry, студия, подарившая нам культовый Hollow Knight, наконец-то официально анонсировала свою новую игру. Вчера вечером разработчики опубликовали геймплейный трейлер и раскрыли первые подробности проекта. Новая игра получила рабочее название 'Fearless Fox' и, по словам разработчиков, будет сочетать элементы метроидвании с открытым миром. Действие развернётся в мире, вдохновлённом японской мифологией эпохи Сэнгоку. Релиз ожидается в 2027 году.",
    authorNickname: "RetroEditor",
    createdAt: "2025-03-21T10:00:00Z",
    imageUrl: "https://placehold.co/800x400/111/0F0?text=Hollow+Knight+Sequel",
    likesCount: 15,
    commentsCount: 8,
  },
  {
    id: 2,
    title: "Elden Ring получил крупное обновление с поддержкой трассировки лучей",
    content: "FromSoftware выпустила обновление для Elden Ring, которое добавляет трассировку лучей на PC и консолях нового поколения. Также исправлены многие баги и улучшена производительность. Игроки отмечают значительное улучшение качества теней и отражений.",
    authorNickname: "GameTech",
    createdAt: "2025-03-18T14:30:00Z",
    imageUrl: "https://placehold.co/800x400/111/0F0?text=Elden+Ring+Update",
    likesCount: 32,
    commentsCount: 12,
  },
  {
    id: 3,
    title: "Вышла демоверсия Stalker 2: Heart of Chornobyl",
    content: "GSC Game World объявила о выходе бесплатной демоверсии S.T.A.L.K.E.R. 2. Игроки могут опробовать первые два часа игры, исследовать зону отчуждения и оценить графику на движке Unreal Engine 5. Полный релиз ожидается в конце 2025 года.",
    authorNickname: "ZoneExplorer",
    createdAt: "2025-03-15T09:15:00Z",
    imageUrl: "https://placehold.co/800x400/111/0F0?text=Stalker+2+Demo",
    likesCount: 47,
    commentsCount: 23,
  },
];

// Ключи для localStorage
const NEWS_LIKES_KEY = 'news_likes'; // храним { newsId: true }
const NEWS_COMMENTS_PREFIX = 'news_comments_';

// Загрузка комментариев для конкретной новости
export function loadNewsComments(newsId: number): NewsComment[] {
  const key = `${NEWS_COMMENTS_PREFIX}${newsId}`;
  const stored = localStorage.getItem(key);
  if (!stored) {
    // Начальные комментарии (иерархия)
    const initial: NewsComment[] = [
      {
        id: 1,
        newsId,
        userId: 2,
        userNickname: "HollowFan",
        parentId: null,
        content: "Офигенно! Жду с нетерпением!",
        createdAt: new Date(2025, 2, 21, 12, 0).toISOString(),
        likesCount: 3,
      },
      {
        id: 2,
        newsId,
        userId: 3,
        userNickname: "MetroidLover",
        parentId: null,
        content: "Надеюсь, будет так же атмосферно, как Hollow Knight",
        createdAt: new Date(2025, 2, 21, 13, 30).toISOString(),
        likesCount: 2,
      },
      {
        id: 3,
        newsId,
        userId: 4,
        userNickname: "SilksongWait",
        parentId: 1,
        content: "Ты прав, Team Cherry ещё ни разу не подводили!",
        createdAt: new Date(2025, 2, 21, 14, 15).toISOString(),
        likesCount: 1,
      },
      {
        id: 4,
        newsId,
        userId: 5,
        userNickname: "IndieGamer",
        parentId: 2,
        content: "Согласен, надеюсь на уникальную атмосферу.",
        createdAt: new Date(2025, 2, 21, 15, 0).toISOString(),
        likesCount: 0,
      },
    ];
    saveNewsComments(newsId, initial);
    return initial;
  }
  return JSON.parse(stored);
}

export function saveNewsComments(newsId: number, comments: NewsComment[]) {
  const key = `${NEWS_COMMENTS_PREFIX}${newsId}`;
  localStorage.setItem(key, JSON.stringify(comments));
}

export function addNewsComment(newsId: number, userId: number, userNickname: string, parentId: number | null, content: string) {
  const comments = loadNewsComments(newsId);
  const newId = Date.now();
  const newComment: NewsComment = {
    id: newId,
    newsId,
    userId,
    userNickname,
    parentId,
    content,
    createdAt: new Date().toISOString(),
    likesCount: 0,
  };
  comments.push(newComment);
  saveNewsComments(newsId, comments);
  return newComment;
}

// Лайки новостей
export function getNewsLikes(): Record<number, boolean> {
  const stored = localStorage.getItem(NEWS_LIKES_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function setNewsLike(newsId: number, liked: boolean) {
  const likes = getNewsLikes();
  if (liked) {
    likes[newsId] = true;
  } else {
    delete likes[newsId];
  }
  localStorage.setItem(NEWS_LIKES_KEY, JSON.stringify(likes));
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
export function getActiveTopics(limit = 3): NewsItem[] {
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const recent = mockNewsList.filter(news => new Date(news.createdAt) >= yesterday);
  const sorted = [...recent].sort((a,b) => (b.likesCount + b.commentsCount) - (a.likesCount + a.commentsCount));
  return sorted.slice(0, limit);
}

const ALL_NEWS_KEY = 'all_news';

export function getAllNews(): NewsItem[] {
  const stored = localStorage.getItem(ALL_NEWS_KEY);
  const storedNews = stored ? JSON.parse(stored) : [];
  const all = [...mockNewsList, ...storedNews];
  const unique = Array.from(new Map(all.map(n => [n.id, n])).values());
  return unique.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}


export function saveUserNews(news: NewsItem[]) {
  const userNews = news.filter(n => n.id > 1000);
  localStorage.setItem(ALL_NEWS_KEY, JSON.stringify(userNews));
}

export function addNews(news: Omit<NewsItem, 'id' | 'createdAt' | 'likesCount' | 'commentsCount'>): NewsItem {
  const all = getAllNews();
  const newId = Date.now();
  const newNews: NewsItem = {
    ...news,
    id: newId,
    createdAt: new Date().toISOString(),
    likesCount: 0,
    commentsCount: 0,
  };
  
  const userNews = all.filter(n => n.id > 1000);
  userNews.push(newNews);
  localStorage.setItem(ALL_NEWS_KEY, JSON.stringify(userNews));
  return newNews;
}