import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://usamafaheem.com";
const SITE_TITLE = "Usama Faheem — MERN Stack & Frontend Developer in Lahore";
const SITE_DESCRIPTION =
  "Usama Faheem is a MERN Stack and Frontend Developer in Lahore, Pakistan. I build fast websites and web apps with React, Next.js, Node.js, Express and MongoDB for clients in Pakistan and worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Usama Faheem",
    "MERN Stack Developer Lahore",
    "Frontend Developer Lahore",
    "React Developer Pakistan",
    "Next.js Developer",
    "Web Developer Lahore",
  ],
  authors: [{ name: "Usama Faheem", url: SITE_URL }],
  creator: "Usama Faheem",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Usama Faheem",
    firstName: "Usama",
    lastName: "Faheem",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Usama Faheem",
      url: SITE_URL,
      image: `${SITE_URL}/usaam_emoji.png`,
      jobTitle: "MERN Stack & Frontend Developer",
      description: SITE_DESCRIPTION,
      email: "mailto:developer@usamafaheem.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      worksFor: { "@type": "Organization", name: "Tekrivo" },
      knowsAbout: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "Frontend Development", "MERN Stack"],
      sameAs: [
        "https://www.linkedin.com/in/usama-faheem/",
        "https://github.com/usamafaheem-dev",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Usama Faheem",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Usama Faheem?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usama Faheem is a MERN Stack and Frontend Developer from Lahore, Pakistan. He builds fast, modern websites and web apps using React, Next.js, Node.js, Express and MongoDB. He has worked with VertexAI Tec and SoftCr8ors, and he is the founder of Tekrivo.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Usama Faheem based?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usama Faheem is based in Lahore, Pakistan. He works with clients in Lahore, all over Pakistan, and around the world.",
          },
        },
        {
          "@type": "Question",
          name: "What services does Usama Faheem offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Business websites, portfolios, online stores, landing pages and full web apps. He also turns Figma designs into websites, adds AI chatbots, and makes slow websites fast.",
          },
        },
      ],
    },
  ],
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

        <link rel="preload" href="/man_walking_crossing_arms_poster.jpg" as="image" fetchPriority="high" media="(min-width: 768px)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-screen bg-porcelain text-ink font-body antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
