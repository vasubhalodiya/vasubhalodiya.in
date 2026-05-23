import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeScript } from "@/components/theme-script";
import { FlickeringGrid } from "@/components/flickering-grid";

const cabinetGrotesk = localFont({
  src: "../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet-grotesk",
  weight: "100 900",
  display: "swap",
});

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  weight: "200 700",
  display: "swap",
});

const SITE_URL = "https://vasubhalodiya.in";
const NAME = "Vasu Bhalodiya";
const TITLE = "Vasu Bhalodiya — Design Engineer & Frontend Developer from India";
const DESCRIPTION =
  "Vasu Bhalodiya is a Design Engineer and Frontend Developer from India building fast, polished products with React, Next.js, and TypeScript. Explore projects, experience, and open-source work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Vasu Bhalodiya",
  },
  description: DESCRIPTION,
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  category: "technology",
  keywords: [
    "Vasu Bhalodiya",
    "vasubhalodiya",
    "Vasu Bhalodiya portfolio",
    "Vasu Bhalodiya developer",
    "Vasu Bhalodiya designer",
    "Design Engineer India",
    "Frontend Developer India",
    "React developer India",
    "Next.js developer",
    "TypeScript developer",
    "UI engineer",
    "Aryx CLI",
    "Intrex Icon",
    "Encrypt password manager",
    "Prompt AI chatbot",
    "Cinefix",
    "Prolix Technikos",
    "Nectar Infoway",
    "Keshav Infotech",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: SITE_URL,
    siteName: NAME,
    title: TITLE,
    description: DESCRIPTION,
    firstName: "Vasu",
    lastName: "Bhalodiya",
    username: "vasubhalodiya",
    images: [
      {
        url: "/vasu.jpg",
        width: 1200,
        height: 630,
        alt: "Vasu Bhalodiya — Design Engineer & Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@VasuBhalodiya03",
    site: "@VasuBhalodiya03",
    images: ["/vasu.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    // Add Google/Bing verification codes here when available
    // google: "xxxx",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vasu Bhalodiya",
  alternateName: ["Vasu", "vasubhalodiya"],
  url: SITE_URL,
  image: `${SITE_URL}/vasu.jpg`,
  jobTitle: "Design Engineer & Frontend Developer",
  description: DESCRIPTION,
  gender: "Male",
  nationality: "Indian",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  email: "mailto:vasubhalodiya24@gmail.com",
  knowsAbout: [
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "UI/UX Design",
    "Tailwind CSS",
    "Firebase",
    "Web Performance",
    "Design Systems",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Prolix Technikos",
  },
  sameAs: [
    "https://github.com/vasubhalodiya",
    "https://www.linkedin.com/in/vasubhalodiya",
    "https://x.com/VasuBhalodiya03",
    "https://www.npmjs.com/~vasubhalodiya",
    "https://cal.com/vasubhalodiya",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: NAME,
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: NAME, url: SITE_URL },
  publisher: { "@type": "Person", name: NAME, url: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cabinetGrotesk.variable} ${clashDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css" />
        <link rel="me" href="https://github.com/vasubhalodiya" />
        <link rel="me" href="https://www.linkedin.com/in/vasubhalodiya" />
        <link rel="me" href="https://x.com/VasuBhalodiya03" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeScript />
      </head>
      <body className="font-cabinet-grotesk relative min-h-full" suppressHydrationWarning>
        <div className="absolute inset-0 h-27 pointer-events-none">
          <div className="absolute inset-0 z-0 size-full">
            <FlickeringGrid
              squareSize={4}
              gridGap={4}
              flickerChance={0.4}
              maxOpacity={0.18}
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background"></div>
        </div>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
