'use client';

export default function RetroFooter() {
  return (
    <footer className="mt-16 border-t-4 border-[#0f0] py-4 px-4 flex flex-wrap justify-between items-center gap-4">
      <div className="flex gap-6">
        <span className="text-[#ff0] animate-pulse">1UP</span>
        <span className="text-[#0ff]">HIGH SCORE 123456</span>
      </div>

      <div className="flex gap-4">
        <a href="#" onClick={(e) => { e.preventDefault(); alert('Социальные сети в разработке'); }} className="text-[#0f0] hover:text-[#ff0] text-xl">📘</a>
        <a href="#" onClick={(e) => { e.preventDefault(); alert('Социальные сети в разработке'); }} className="text-[#0f0] hover:text-[#ff0] text-xl">🐦</a>
        <a href="#" onClick={(e) => { e.preventDefault(); alert('Социальные сети в разработке'); }} className="text-[#0f0] hover:text-[#ff0] text-xl">📺</a>
        <a href="#" onClick={(e) => { e.preventDefault(); alert('Социальные сети в разработке'); }} className="text-[#0f0] hover:text-[#ff0] text-xl">👾</a>
      </div>
    </footer>
  );
}