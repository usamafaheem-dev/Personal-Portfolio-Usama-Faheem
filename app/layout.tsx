import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Usama Faheem — Frontend & MERN Stack Developer",
  description:
    "Portfolio of Usama Faheem — Frontend Developer specializing in React.js, Next.js, Redux Toolkit, Node.js, Express.js, MongoDB, Three.js, and AI integrations. Building production websites for real clients.",
  keywords: [
    "Usama Faheem",
    "Frontend Developer",
    "MERN Stack",
    "React.js",
    "Next.js",
    "Node.js",
    "Three.js",
    "Portfolio",
    "Pakistan",
  ],
  authors: [{ name: "Usama Faheem" }],
  creator: "Usama Faheem",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Usama Faheem — Frontend & MERN Stack Developer",
    description:
      "Building production websites with React.js, Next.js, and the MERN stack — enhanced with AI integrations and 3D web experiences.",
    siteName: "Usama Faheem Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usama Faheem — Frontend & MERN Stack Developer",
    description:
      "Building production websites with React.js, Next.js, and the MERN stack.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Inter, Poppins, JetBrains_Mono, Caveat } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        {/* ── LCP: Hero poster image — highest priority, discovered first ── */}
        <link rel="preload" href="/man_walking_crossing_arms_poster.jpg" as="image" fetchPriority="high" />

        {/* ── Critical above-fold images ── */}
        <link rel="preload" href="/usaam_emoji.png" as="image" fetchPriority="high" />

        {/* ── Preloader background video (shows during preloader) ── */}
        <link rel="preload" href="/vesper_preloader_opt.mp4" as="video" type="video/mp4" />

        {/* ── Hero video: only preload on desktop (mobile defers to video element's own preload) ── */}
        <link rel="preload" href="/hero_video_optimized.webm" as="video" type="video/webm" media="(min-width: 768px)" />
        <link rel="preload" href="/hero_video_optimized.mp4" as="video" type="video/mp4" media="(min-width: 768px)" />
      </head>
      <body className="min-h-screen bg-porcelain text-ink font-body antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
