import type { Metadata } from "next";
import { Playfair_Display, Nunito, Zen_Kurenaido } from "next/font/google";
import { AudioProvider } from "@/hooks/useAudio";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const zen = Zen_Kurenaido({
  variable: "--font-zen",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "From Me To You | Happy 1st Anniversary Ruri ❤️",
  description: "A handcrafted digital love letter celebrating our first year together. Delhi to Jammu, from Sky to Ruri. 君に届け。",
  authors: [{ name: "Sky" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${nunito.variable} ${zen.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AudioProvider>
          <SmoothScroll />
          <main className="flex-grow flex flex-col relative">
            {children}
          </main>
        </AudioProvider>
      </body>
    </html>
  );
}
