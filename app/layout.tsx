import type { Metadata } from "next";
import Script from "next/script";
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

import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Inter:wght@300..900&family=JetBrains+Mono:wght@400..800&family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/usaam_emoji.png" as="image" />
        <link rel="preload" href="/vesper_preloader_opt.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-screen bg-porcelain text-ink font-body antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Script
          src="https://elevenlabs.io/convai-widget/index.js"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
