interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  className?: string;
}

export default function GlitchText({ text, as: Tag = 'h2', className = '' }: GlitchTextProps) {
  const Comp = Tag;
  return (
    <Comp
      className={`glitch ${className}`}
      data-text={text}
      style={{ animation: 'glitch 3s infinite' }}
    >
      {text}
    </Comp>
  );
}