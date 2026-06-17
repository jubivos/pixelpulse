// components/ui/Pagination.tsx
'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => { if (currentPage > 1) onPageChange(currentPage - 1); };
  const handleNext = () => { if (currentPage < totalPages) onPageChange(currentPage + 1); };

  // Генерация номеров страниц (максимум 5)
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);
  if (end - start + 1 < 5) start = Math.max(1, end - 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="pagination">
      <span className="page-number" onClick={handlePrev}>◀</span>
      {pages.map(page => (
        <span
          key={page}
          className={`page-number ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </span>
      ))}
      <span className="page-number" onClick={handleNext}>▶</span>
    </div>
  );
}