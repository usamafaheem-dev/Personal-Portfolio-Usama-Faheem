import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

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
  subsets: ["latin"],
  display: "swap",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-porcelain text-ink font-body antialiased select-none">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
