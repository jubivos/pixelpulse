export default function CRTWrapper() {
  return (
    <>
      <div className="crt fixed inset-0 pointer-events-none z-[100]" />
      <div className="scanline fixed pointer-events-none z-[101]" />
    </>
  );
}