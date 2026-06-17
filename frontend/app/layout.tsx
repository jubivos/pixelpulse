import "./globals.css";
import CRTWrapper from "@/components/ui/CRTWrapper";
import Header from "@/components/layout/Header";
import RetroFooter from "@/components/layout/RetroFooter";
import RetroEffects from "@/components/ui/RetroEffects";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <CRTWrapper />
        <RetroEffects />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            {children}
          </main>
          <RetroFooter />
        </div>
      </body>
    </html>
  );
}