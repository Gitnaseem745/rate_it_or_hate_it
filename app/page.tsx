"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Leaderboard from "@/components/Leaderboard";
import EmailLink from "@/components/EmailLink";
import SocialLinks from "@/components/SocialLinks";
import { useEffect } from "react";

export default function Home() {
  // Add page-specific structured data
  useEffect(() => {
    const pageJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rate It or Hate It - Homepage",
      "url": "https://rate-it-or-hate-it.vercel.app",
      "description": "Vote on your favorite TV series and see real-time rankings. Features Breaking Bad, Dark, Game of Thrones, Stranger Things and more!",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rate-it-or-hate-it.vercel.app"
          }
        ]
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Top Rated TV Series",
        "description": "Current leaderboard of rated TV series",
        "numberOfItems": 12
      }
    };

    // Add to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(pageJsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (left / center) */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              🎬 Rate It or Hate It
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Vote on your favorite TV series — no sign-in required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-900 rounded-2xl p-8"
          >
            <p className="text-gray-300 mb-6 text-center">
              We&apos;ve consolidated the site into a single series voting experience. Click below to start voting through all 12 included series. The leaderboard lives on the right and updates as people vote.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/series" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-xl shadow-lg hover:shadow-purple-500/50 transition-all">
                Start Voting →
              </Link>
            </div>

            <div className="mt-6 text-center">
              <EmailLink
                email="mrnasee745@gmail.com"
                subject="Series Request for Rate It or Hate It"
                body={`Hi,\n\nI would like to request the following series to be added:\n\nSeries Name: [Enter series name here]\n\nThank you!`}
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm inline-flex items-center gap-2"
              >
                <span className="max-sm:-mt-6">📺</span>
                Don&apos;t see your favorite series? Request it here!
              </EmailLink>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm text-center mb-4">Connect with me</p>
              <SocialLinks className="justify-center" iconSize="lg" />
            </div>

            <div className="mt-6 text-gray-500 text-sm text-center">Made with ❤️ by <Link href={"https://www.linkedin.com/in/naseem-ansari-25474b269/"} className="text-purple-400 hover:text-purple-500" target="_blank"> Naseem Ansari </Link> | Smooth reactions & no login</div>
          </motion.div>
        </div>

        {/* Right column - Leaderboard */}
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
