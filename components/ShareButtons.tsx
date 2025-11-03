"use client";

import { useState } from "react";
import { ShareButtonsProps } from "@/types";

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const share = async (platform?: string) => {
    const shareUrl = url || window.location.href;
    const shareText = title || "Check this out!";

    // Native share if available
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, url: shareUrl });
        return;
      } catch {
        // ignore
      }
    }

    if (platform === "twitter") {
      const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(tweet, "_blank", "noopener,noreferrer");
      return;
    }

    if (platform === "facebook") {
      const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(fb, "_blank", "noopener,noreferrer");
      return;
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
      alert("Unable to share. Please copy the URL manually.");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={() => share()} className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm">
        Share
      </button>
      <button onClick={() => share("twitter")} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm">
        Twitter
      </button>
      <button onClick={() => share("facebook")} className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm">
        Facebook
      </button>
      <button onClick={() => share()} className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm">
        {copied ? "Copied" : "Copy Link"}
      </button>
    </div>
  );
}
