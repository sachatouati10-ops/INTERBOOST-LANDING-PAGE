import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interboost — Candidatures automatiques",
  description: "Boostez votre recherche de stage avec Interboost. Inscrivez-vous à la waiting list.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body className="font-[var(--font-inter)] overflow-hidden">{children}</body>
    </html>
  );
}
