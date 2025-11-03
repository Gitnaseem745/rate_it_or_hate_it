"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { generateUserId } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorState from "@/components/ErrorState";
import MemeOverlay from "@/components/MemeOverlay";
import VoteStats from "@/components/VoteStats";
import EmailLink from "@/components/EmailLink";
import SocialLinks from "@/components/SocialLinks";
import { Movie, Meme } from "@/types";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const categoryName = category === "series" ? "TV Series" : category.charAt(0).toUpperCase() + category.slice(1);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [showMeme, setShowMeme] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<Meme>({ gif: "", text: "" });

  useEffect(() => {
    const id = generateUserId();
    setUserId(id);
    
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies?category=${category}`);
        const data = await response.json();

        if (data.success) {
          setMovies(data.movies);
        } else {
          setError("Failed to load series");
        }
      } catch (err) {
        console.error("Error fetching series:", err);
        setError("Failed to load series. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const handleVote = async (action: "rate" | "hate") => {
    if (isVoting || !currentMovie) return;

    try {
      setIsVoting(true);
      
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
        // Show series-specific meme from API response
        if (data.meme) {
          setCurrentMeme(data.meme);
          setShowMeme(true);
        }

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

  const handleSkip = () => {
    if (isVoting) return;
    
    // Move to next series without voting
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentMovie = movies[currentIndex];
  const hasVoted = currentMovie?.ratedBy.includes(userId);

  // Add structured data for current series
  useEffect(() => {
    if (currentMovie && typeof window !== 'undefined') {
      const seriesJsonLd = {
        "@context": "https://schema.org",
        "@type": "TVSeries",
        "name": currentMovie.title,
        "image": currentMovie.imageUrl,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": currentMovie.rating > currentMovie.hate ? "4.5" : "2.5",
          "ratingCount": currentMovie.rating + currentMovie.hate,
          "bestRating": "5",
          "worstRating": "1"
        },
        "interactionStatistic": [
          {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/LikeAction",
            "userInteractionCount": currentMovie.rating
          },
          {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/DislikeAction",
            "userInteractionCount": currentMovie.hate
          }
        ],
        "genre": "TV Series",
        "url": `https://rate-it-or-hate-it.vercel.app/${category}`
      };

      // Remove existing script if present
      const existingScript = document.getElementById('series-jsonld');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new script
      const script = document.createElement('script');
      script.id = 'series-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(seriesJsonLd);
      document.head.appendChild(script);

      return () => {
        const scriptToRemove = document.getElementById('series-jsonld');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [currentMovie, category]);

  if (loading) {
    return <LoadingSpinner text="Loading series..." />;
  }

  if (error || movies.length === 0) {
    return (
      <ErrorState
        title={error || "No series available at the moment"}
        message="Please check back later or try refreshing the page."
        actionLabel="Go Back Home"
        onAction={() => router.push("/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col overflow-hidden">
      {/* Meme Overlay */}
      <MemeOverlay show={showMeme} meme={currentMeme} />

      {/* Header - Compact */}
      <div className="text-center py-4 shrink-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          🎬 Rate It or Hate It
        </motion.h1>
        <p className="text-gray-400 text-base mt-1">{categoryName}</p>
      </div>

      {/* Main Content - Centered Movie */}
      <div className="flex-1 flex items-center justify-center px-4 overflow-y-auto">
        <div className="w-full max-w-2xl py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovie._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Series Banner - Smaller */}
              <div className="relative w-full max-w-xs aspect-2/3 rounded-xl overflow-hidden shadow-2xl mb-4">
                <Image
                  src={currentMovie.imageUrl}
                  alt={currentMovie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Series Title - Compact */}
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
                {currentMovie.title}
              </h2>

              {/* Rating Counts */}
              <VoteStats rating={currentMovie.rating} hate={currentMovie.hate} />

              {/* Vote Buttons */}
              {hasVoted ? (
                <div className="text-center">
                  <p className="text-gray-400 text-base mb-3">
                    You&apos;ve already voted for this series!
                  </p>
                  <Button
                    onClick={() => {
                      if (currentIndex < movies.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      } else {
                        setCurrentIndex(0);
                      }
                    }}
                    variant="secondary"
                    size="lg"
                  >
                    Next Series →
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 w-full max-w-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Rate Me Button */}
                    <Button
                      onClick={() => handleVote("rate")}
                      disabled={isVoting}
                      variant="success"
                      size="xl"
                      animated
                    >
                      👍 Rate Me
                    </Button>

                    {/* Hate Me Button */}
                    <Button
                      onClick={() => handleVote("hate")}
                      disabled={isVoting}
                      variant="danger"
                      size="xl"
                      animated
                    >
                      👎 Hate Me
                    </Button>
                  </div>

                  {/* Skip Button */}
                  <Button
                    onClick={handleSkip}
                    disabled={isVoting}
                    variant="secondary"
                    size="lg"
                    animated
                    className="w-full text-gray-300"
                  >
                    ⏭️ Skip - Haven&apos;t Watched
                  </Button>
                </div>
              )}

              {/* Progress Indicator */}
              <p className="text-gray-500 text-sm mt-4">
                Series {currentIndex + 1} of {movies.length}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Share Buttons & Back Button - Compact */}
      <div className="text-center py-3 shrink-0 space-y-2 border-t border-gray-800">
        <div className="flex justify-center">
          <ShareButtons title="Check out Rate It or Hate It!" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm">
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            size="sm"
            className="font-normal"
          >
            ← Back to Home
          </Button>

          <EmailLink
            email="mrnaseem745@gmail.com"
            subject="Series Request for Rate It or Hate It"
            body={`Hi,\n\nI would like to request the following series to be added:\n\nSeries Name: [Enter series name here]\n\nThank you!`}
            className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <span>📺</span>
            Request a Series
          </EmailLink>
        </div>

        {/* Social Media Links */}
        <div className="pt-2">
          <SocialLinks className="justify-center" iconSize="md" />
        </div>
      </div>
    </div>
  );
}
