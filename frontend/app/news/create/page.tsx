'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import NewsForm from '@/components/news/NewsForm';

export default function CreateNewsPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/auth/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return <div className="text-center py-20 text-[#0f0]">ПРОВЕРКА ПРАВ...</div>;

  return <NewsForm />;
}