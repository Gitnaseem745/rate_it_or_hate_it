"use client";

import { useEffect, useState } from "react";
import { SeriesItem } from "@/types";

export default function Leaderboard() {
  const [items, setItems] = useState<SeriesItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/movies?category=series`);
        const data = await res.json();
        if (data && data.success) {
          // Each movie seeded is one series, so use title as series name
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const seriesList: SeriesItem[] = data.movies.map((m: any) => ({
            _id: m._id,
            title: m.title,
            rating: m.rating || 0,
            hate: m.hate || 0,
          }));

          // Sort by net score (rating - hate) then rating
          seriesList.sort((a, b) => (b.rating - b.hate) - (a.rating - a.hate) || b.rating - a.rating);
          setItems(seriesList);
        }
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <aside className="w-full max-w-sm bg-gray-900 rounded-2xl p-4">
      <h3 className="text-white text-xl font-bold mb-3">Leaderboard</h3>
      <p className="text-gray-400 text-sm mb-4">All series — sorted by net score</p>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : (
        <ol className="flex flex-col gap-3">
          {items.map((s, idx) => (
            <li key={s._id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div>
                <div className="text-sm text-gray-300">{idx + 1}. {s.title}</div>
                <div className="text-xs text-gray-500">Rating: {s.rating} • Hate: {s.hate}</div>
              </div>
              <div className="text-sm font-bold text-white">
                {s.rating - s.hate >= 0 ? (
                  <span className="text-green-400">+{s.rating - s.hate}</span>
                ) : (
                  <span className="text-red-400">{s.rating - s.hate}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
