export default function Marquee({ text }: { text: string }) {
  return (
    <div className="marquee">
      <div className="marquee-content">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}