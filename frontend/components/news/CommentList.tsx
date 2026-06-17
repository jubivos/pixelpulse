import { NewsComment } from '@/lib/mockNews';
import CommentItem from './CommentItem';

interface Props {
  comments: NewsComment[];
  onReply: (parentId: number, content: string) => void;
  onLike: (commentId: number) => void;
  likedComments: Record<number, boolean>;
  currentUser: { id: number; nickname: string } | null;
}

export default function CommentList({ comments, onReply, onLike, likedComments, currentUser }: Props) {
  // Строим дерево
  const commentMap = new Map<number, NewsComment>();
  const roots: NewsComment[] = [];

  comments.forEach(c => commentMap.set(c.id, c));
  comments.forEach(c => {
    if (c.parentId === null) {
      roots.push(c);
    } else {
      // дочерние будут обработаны в CommentItem рекурсивно, но проще отфильтровать при рендере
    }
  });

  // Функция для получения прямых ответов на комментарий
  const getReplies = (parentId: number): NewsComment[] => {
    return comments.filter(c => c.parentId === parentId);
  };

  return (
    <div className="space-y-3">
      {roots.map(root => (
        <CommentItem
          key={root.id}
          comment={root}
          level={0}
          onReply={onReply}
          onLike={onLike}
          likedComments={likedComments}
          currentUser={currentUser}
          replies={getReplies(root.id)}
        />
      ))}
    </div>
  );
}