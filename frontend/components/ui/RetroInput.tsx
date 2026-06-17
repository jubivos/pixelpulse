'use client';

interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function RetroInput({ label, id, ...props }: RetroInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[#0f0] text-xs mb-1 uppercase">{label}</label>
      <input
        id={id}
        {...props}
        className="w-full bg-black border-2 border-[#0f0] p-2 text-[#0ff] font-mono text-sm focus:border-[#ff0] outline-none"
      />
    </div>
  );
}