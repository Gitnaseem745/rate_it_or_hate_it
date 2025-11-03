import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rate-it-or-hate-it.vercel.app'),
  title: {
    default: "Rate It or Hate It - Vote on Your Favorite TV Series",
    template: "%s | Rate It or Hate It"
  },
  description: "Vote on 12 curated TV series including Dark, Breaking Bad, Game of Thrones & more. No login required! Rate or hate your favorite shows and see hilarious series-specific memes. Join thousands of voters now!",
  keywords: [
    "rate tv series",
    "vote tv shows",
    "breaking bad vote",
    "game of thrones rating",
    "dark series",
    "stranger things vote",
    "tv series ranking",
    "no login voting",
    "series leaderboard",
    "rate or hate",
    "tv show opinions",
    "series memes"
  ],
  authors: [{ name: "Rate It or Hate It Team" }],
  creator: "Rate It or Hate It",
  publisher: "Rate It or Hate It",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rate-it-or-hate-it.vercel.app",
    siteName: "Rate It or Hate It",
    title: "Rate It or Hate It - Vote on Your Favorite TV Series",
    description: "Vote on 12 curated TV series. No login required! See hilarious memes and real-time rankings.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Rate It or Hate It - TV Series Voting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rate It or Hate It - Vote on TV Series",
    description: "Vote on 12 curated TV series. No login required! See hilarious memes and real-time rankings.",
    images: ["/og/home.png"],
    creator: "@rateithateit",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/favicons/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/favicons/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your code after Google Search Console setup
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Rate It or Hate It",
    "url": "https://rate-it-or-hate-it.vercel.app",
    "description": "Vote on 12 curated TV series including Dark, Breaking Bad, Game of Thrones & more. No login required!",
    "applicationCategory": "EntertainmentApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Rate It or Hate It Team"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "TV Series Fans"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "No login required",
      "12 curated TV series",
      "Real-time leaderboard",
      "Series-specific memes",
      "Social sharing",
      "Mobile responsive"
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#7c3aed" />
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
