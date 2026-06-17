'use client';
import { useState } from 'react';
import { NewsComment } from '@/lib/mockNews';

interface Props {
  comment: NewsComment;
  level: number;
  onReply: (parentId: number, content: string) => void;
  onLike: (commentId: number) => void;
  likedComments: Record<number, boolean>;
  currentUser: { id: number; nickname: string } | null;
  replies: NewsComment[];
}

export default function CommentItem({ comment, level, onReply, onLike, likedComments, currentUser, replies }: Props) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const date = new Date(comment.createdAt).toLocaleString('ru-RU');

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  return (
    <div className="mb-4" style={{ marginLeft: level * 20 }}>
      <div className="bg-black border-l-4 border-[#0f0] p-3">
        <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
          <span className="text-[#ff0] text-xs">👤 {comment.userNickname}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLike(comment.id)}
              className={`text-xs ${likedComments[comment.id] ? 'text-[#ff0]' : 'text-[#0f0]'} hover:text-[#ff0] transition`}
            >
              ❤️ {comment.likesCount}
            </button>
            <span className="text-[#0f0] text-[10px]">{date}</span>
            {currentUser && level < 3 && (
              <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-[#0ff] text-[10px] hover:text-[#ff0]">
                ↪ Ответить
              </button>
            )}
          </div>
        </div>
        <p className="text-[#0f0] text-xs leading-relaxed">{comment.content}</p>
        {showReplyForm && (
          <div className="mt-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
              className="w-full bg-black border border-[#0f0] p-2 text-[#0f0] text-xs"
              placeholder="Ваш ответ..."
            />
            <div className="flex gap-2 mt-1">
              <button onClick={handleReply} className="border border-[#ff0] px-2 py-1 text-[10px] text-[#ff0] hover:bg-[#ff0] hover:text-black">ОТВЕТИТЬ</button>
              <button onClick={() => setShowReplyForm(false)} className="border border-gray-500 px-2 py-1 text-[10px] text-gray-400">ОТМЕНА</button>
            </div>
          </div>
        )}
      </div>
      {replies.length > 0 && (
        <div className="mt-2">
          {replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              level={level + 1}
              onReply={onReply}
              onLike={onLike}
              likedComments={likedComments}
              currentUser={currentUser}
              replies={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
}