"use client";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Meme } from "@/types";

interface MemeOverlayProps {
  show: boolean;
  meme: Meme;
}

export default function MemeOverlay({ show, meme }: MemeOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-lg mx-4 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meme.gif}
              alt="Reaction meme"
              className="w-full h-auto rounded-2xl shadow-2xl mb-6 max-h-[400px] object-contain mx-auto"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent px-4"
            >
              {meme.text}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
