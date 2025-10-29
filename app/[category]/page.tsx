"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { generateUserId } from "@/lib/utils";
import { getRandomMeme } from "@/lib/memes";

interface Movie {
  _id: string;
  tmdbId: string;
  title: string;
  imageUrl: string;
  category: string;
  rating: number;
  hate: number;
  ratedBy: string[];
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [showMeme, setShowMeme] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<{ gif: string; text: string }>({ gif: "", text: "" });

  useEffect(() => {
    const id = generateUserId();
    setUserId(id);
    fetchMovies();
  }, [category]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/movies?category=${category}`);
      const data = await response.json();

      if (data.success) {
        setMovies(data.movies);
      } else {
        setError("Failed to load movies");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (action: "rate" | "hate") => {
    if (isVoting || !currentMovie) return;

    try {
      setIsVoting(true);
      
      // Show random meme
      const meme = getRandomMeme(action);
      setCurrentMeme(meme);
      setShowMeme(true);
      
      const response = await fetch("/api/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: currentMovie._id,
          userId,
          action,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the current movie in state
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === currentMovie._id
              ? {
                  ...movie,
                  rating: data.movie.rating,
                  hate: data.movie.hate,
                  ratedBy: [...movie.ratedBy, userId],
                }
              : movie
          )
        );

        // Hide meme and move to next movie after delay
        setTimeout(() => {
          setShowMeme(false);
          if (currentIndex < movies.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setCurrentIndex(0);
          }
        }, 4000);
      } else {
        setShowMeme(false);
        alert(data.error || "Failed to vote");
      }
    } catch (err) {
      console.error("Error voting:", err);
      setShowMeme(false);
      alert("Failed to submit vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const currentMovie = movies[currentIndex];
  const hasVoted = currentMovie?.ratedBy.includes(userId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-lg">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error || movies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-4">
            {error || "No movies found for this category!"}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Visit <code className="bg-gray-800 px-2 py-1 rounded">/api/setup</code> to seed the database.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Meme Overlay */}
      <AnimatePresence>
        {showMeme && (
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
              <img
                src={currentMeme.gif}
                alt="Reaction meme"
                className="w-full h-auto rounded-2xl shadow-2xl mb-6"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent px-4"
              >
                {currentMeme.text}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white"
        >
          🎬 Rate It or Hate It
        </motion.h1>
        <p className="text-gray-400 text-lg mt-2">{categoryName} Movies</p>
      </div>

      {/* Main Content - Centered Movie */}
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovie._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Movie Image */}
              <div className="relative w-full max-w-md aspect-2/3 rounded-xl overflow-hidden shadow-2xl mb-8">
                <Image
                  src={currentMovie.imageUrl}
                  alt={currentMovie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Movie Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
                {currentMovie.title}
              </h2>

              {/* Rating Counts */}
              <div className="flex gap-8 mb-8">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Rating</p>
                  <p className="text-3xl font-bold text-green-500">
                    {currentMovie.rating}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Hating</p>
                  <p className="text-3xl font-bold text-red-500">
                    {currentMovie.hate}
                  </p>
                </div>
              </div>

              {/* Vote Buttons */}
              {hasVoted ? (
                <div className="text-center">
                  <p className="text-gray-400 text-lg mb-4">
                    You&apos;ve already voted for this movie!
                  </p>
                  <button
                    onClick={() => {
                      if (currentIndex < movies.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      } else {
                        setCurrentIndex(0);
                      }
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold"
                  >
                    Next Movie →
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
                  {/* Rate Me Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote("rate")}
                    disabled={isVoting}
                    className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl font-bold text-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    👍 Rate Me
                  </motion.button>

                  {/* Hate Me Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote("hate")}
                    disabled={isVoting}
                    className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-xl font-bold text-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    👎 Hate Me
                  </motion.button>
                </div>
              )}

              {/* Progress Indicator */}
              <p className="text-gray-500 text-sm mt-8">
                Movie {currentIndex + 1} of {movies.length}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center pb-8">
        <button
          onClick={() => router.push("/")}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Categories
        </button>
      </div>
    </div>
  );
}
