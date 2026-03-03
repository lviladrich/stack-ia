import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Stack",
  description: "Encuentra el stack de IA optimo para tu proyecto. Respaldado por benchmarks, papers academicos y datos reales.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
