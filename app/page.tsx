"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            🎬 Rate It or Hate It
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Choose Your Category
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/hollywood">
              <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-600 to-pink-600 p-1 transition-transform hover:scale-105 active:scale-95">
                <div className="bg-gray-900 rounded-xl p-12 text-center h-full">
                  <div className="text-6xl mb-6">🎥</div>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    Hollywood
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Rate your favorite Hollywood movies
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/bollywood">
              <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-600 to-red-600 p-1 transition-transform hover:scale-105 active:scale-95">
                <div className="bg-gray-900 rounded-xl p-12 text-center h-full">
                  <div className="text-6xl mb-6">🎭</div>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    Bollywood
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Rate your favorite Bollywood movies
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-gray-500"
        >
          <p>Made with ❤️ | No Login Required</p>
        </motion.div>
      </div>
    </div>
  );
}
