export default function PacmanAnimation() {
  return (
    <div className="flex items-center gap-1 bg-black px-3 py-1 border-2 border-[#0f0] rounded-full">
      {/* Пакман */}
      <div className="w-0 h-0 border-r-[12px] border-t-[12px] border-l-[12px] border-b-[12px] border-r-transparent border-t-[#ff0] border-l-[#ff0] border-b-[#ff0] rounded-full animate-[chomp_0.3s_infinite]" />
      
      {/* 4 призрака */}
      <div className="w-[20px] h-[20px] bg-[#f00] rounded-t-full relative animate-[float_2s_infinite] after:content-[''] after:absolute after:bottom-[-5px] after:left-[2px] after:w-[5px] after:h-[5px] after:bg-[#f00] after:rounded-full after:shadow-[6px_0_0_#f00,12px_0_0_#f00]" />
      <div className="w-[20px] h-[20px] bg-[#f0f] rounded-t-full relative animate-[float_2s_infinite] after:content-[''] after:absolute after:bottom-[-5px] after:left-[2px] after:w-[5px] after:h-[5px] after:bg-[#f0f] after:rounded-full after:shadow-[6px_0_0_#f0f,12px_0_0_#f0f]" />
      <div className="w-[20px] h-[20px] bg-[#0ff] rounded-t-full relative animate-[float_2s_infinite] after:content-[''] after:absolute after:bottom-[-5px] after:left-[2px] after:w-[5px] after:h-[5px] after:bg-[#0ff] after:rounded-full after:shadow-[6px_0_0_#0ff,12px_0_0_#0ff]" />
      <div className="w-[20px] h-[20px] bg-[#ff8c00] rounded-t-full relative animate-[float_2s_infinite] after:content-[''] after:absolute after:bottom-[-5px] after:left-[2px] after:w-[5px] after:h-[5px] after:bg-[#ff8c00] after:rounded-full after:shadow-[6px_0_0_#ff8c00,12px_0_0_#ff8c00]" />
      
      {/* Три точки */}
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
    </div>
  );
}