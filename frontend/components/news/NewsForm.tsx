'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addNews } from '@/lib/mockNews';
import { getCurrentUser } from '@/lib/auth';

export default function NewsForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (!title.trim() || !content.trim()) {
      setError('Заполните заголовок и текст новости');
      return;
    }
    setLoading(true);
    try {
      const newNews = addNews({
        title,
        content,
        authorNickname: user.nickname,
        imageUrl: imageUrl || 'https://placehold.co/800x400/111/0F0?text=NEWS',
      });
      router.push(`/news/${newNews.id}`);
    } catch (err) {
      setError('Ошибка при создании новости');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-full max-w-3xl px-4">
        <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-[#0f0] p-6">
          <h1 className="text-2xl text-[#ff0] text-center mb-6">СОЗДАНИЕ НОВОСТИ</h1>
          {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#0f0] text-xs mb-1">ЗАГОЛОВОК</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border-2 border-[#0f0] p-2 text-[#0ff] font-mono text-sm focus:border-[#ff0] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[#0f0] text-xs mb-1">ТЕКСТ НОВОСТИ</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full bg-black border-2 border-[#0f0] p-2 text-[#0f0] font-mono text-sm resize-y focus:border-[#ff0] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[#0f0] text-xs mb-1">URL ИЗОБРАЖЕНИЯ (необязательно)</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-black border-2 border-[#0f0] p-2 text-[#0ff] font-mono text-sm focus:border-[#ff0] outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-[#ff0] py-2 text-[#ff0] hover:bg-[#ff0] hover:text-black transition font-mono text-sm disabled:opacity-50"
            >
              {loading ? 'ПУБЛИКАЦИЯ...' : 'ОПУБЛИКОВАТЬ НОВОСТЬ →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}