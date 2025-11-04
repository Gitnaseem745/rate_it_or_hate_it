// Series-specific memes mapped by series ID (matches seriesId in database)
// Each series can have custom reaction GIFs for rate/hate actions
import { SeriesMeme, Meme } from "@/types";

export const seriesMemes: SeriesMeme[] = [
  {
    id: "s1",
    name: "Dark",
    hateMemes: [
      "/memes/hate/hate-1.gif",
      "/memes/hate/hate-2.gif",
      "/memes/hate/hate-3.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-1.gif",
      "/memes/rate/rate-2.gif"
    ]
  },
  {
    id: "s2",
    name: "Game of Thrones",
    hateMemes: [
      "/memes/hate/hate-4.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-3.gif",
      "/memes/rate/rate-4.gif"
    ]
  },
  {
    id: "s3",
    name: "Breaking Bad",
    hateMemes: [
      "/memes/hate/hate-5.gif",
      "/memes/hate/hate-6.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-5.gif",
      "/memes/rate/rate-6.gif",
      "/memes/rate/rate-7.gif"
    ]
  },
  {
    id: "s4",
    name: "Hannibal",
    hateMemes: [
      "/memes/hate/hate-7.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-8.gif",
      "/memes/rate/rate-9.gif"
    ]
  },
  {
    id: "s5",
    name: "From",
    hateMemes: [
        "/memes/hate/hate-8.gif",
    ],
    rateMemes: [
        "/memes/rate/rate-10.gif",
        "/memes/rate/rate-11.gif"
    ]
  },
  {
    id: "s6",
    name: "Wednesday",
    hateMemes: [
      "/memes/hate/hate-9.gif",
      "/memes/hate/hate-10.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-12.gif",
      "/memes/rate/rate-13.gif"
    ]
  },
  {
    id: "s7",
    name: "Stranger Things",
    hateMemes: [
        "/memes/hate/hate-11.gif",
        "/memes/hate/hate-12.gif",
        "/memes/hate/hate-13.gif"
    ],
    rateMemes: [
        "/memes/rate/rate-14.gif",
        "/memes/rate/rate-15.gif"
    ]
  },
  {
    id: "s8",
    name: "Mr. Robot",
    hateMemes: [
      "/memes/hate/hate-14.gif",
      "/memes/hate/hate-15.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-16.gif",
      "/memes/rate/rate-17.gif"
    ]
  },
  {
    id: "s9",
    name: "True Detective",
    hateMemes: [
      "/memes/hate/hate-16.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-18.gif"
    ]
  },
  {
    id: "s10",
    name: "Better Call Saul",
    hateMemes: [
      "/memes/hate/hate-17.gif",
      "/memes/hate/hate-18.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-19.gif",
      "/memes/rate/rate-20.gif"
    ]
  },
  {
    id: "s11",
    name: "Lost",
    hateMemes: [
      "/memes/hate/hate-19.gif"
    ],
    rateMemes: [
        "/memes/rate/rate-21.gif",
        "/memes/rate/rate-22.gif"
    ]
  },
  {
    id: "s12",
    name: "You",
    hateMemes: [
      "/memes/hate/hate-20.gif",
      "/memes/hate/hate-21.gif"
    ],
    rateMemes: [
      "/memes/rate/rate-23.gif",
      "/memes/rate/rate-24.gif"
    ]
  }
];

// History tracking to prevent immediate repetition
const recentMemes: Map<string, string[]> = new Map();
const recentTexts: Map<string, string[]> = new Map();
const MAX_HISTORY = 3; // Remember last 3 selections

/**
 * Get a truly random item from array while avoiding recent history
 * Uses crypto.getRandomValues for better randomness
 */
function getRandomWithHistory<T>(
  items: T[],
  historyKey: string,
  historyMap: Map<string, T[]>
): T {
  if (items.length === 0) {
    throw new Error('No items available for selection');
  }

  // If only one item, return it
  if (items.length === 1) {
    return items[0];
  }

  const history = historyMap.get(historyKey) || [];
  
  // Filter out recently used items if we have enough options
  let availableItems = items;
  if (items.length > MAX_HISTORY) {
    availableItems = items.filter(item => !history.includes(item));
    // If all items are in history (shouldn't happen), reset and use all
    if (availableItems.length === 0) {
      availableItems = items;
      historyMap.set(historyKey, []);
    }
  }

  // Use crypto.getRandomValues for better randomness
  const randomIndex = Math.floor(getSecureRandom() * availableItems.length);
  const selectedItem = availableItems[randomIndex];

  // Update history
  const newHistory = [selectedItem, ...history].slice(0, MAX_HISTORY);
  historyMap.set(historyKey, newHistory);

  return selectedItem;
}

/**
 * Generate a cryptographically secure random number between 0 and 1
 * Falls back to Math.random() if crypto is not available
 */
function getSecureRandom(): number {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / (0xFFFFFFFF + 1);
  }
  // Fallback for environments without crypto
  return Math.random();
}

/**
 * Get a series-specific meme based on seriesId
 * Each series has perfectly matched reaction GIFs
 * Uses improved randomization to prevent repetition
 */
export function getSeriesMeme(
  seriesId: string,
  action: "rate" | "hate"
): Meme {
  const series = seriesMemes.find((s) => s.id === seriesId);
  
  if (!series) {
    throw new Error(`Series with ID ${seriesId} not found`);
  }

  const memeUrls = action === "rate" ? series.rateMemes : series.hateMemes;
  
  if (memeUrls.length === 0) {
    throw new Error(`No ${action} memes found for ${series.name}`);
  }

  // Create unique history keys for this series and action
  const memeHistoryKey = `${seriesId}-${action}-meme`;
  const textHistoryKey = `${action}-text`;

  // Get random meme and text with history tracking
  const randomUrl = getRandomWithHistory(memeUrls, memeHistoryKey, recentMemes);
  const randomText = action === "rate" 
    ? getRandomRateText(textHistoryKey) 
    : getRandomHateText(textHistoryKey);

  return {
    gif: randomUrl,
    text: randomText
  };
}

// Helper functions for random texts with history tracking
function getRandomRateText(historyKey: string): string {
  const texts = [
    "Your taste is LEGENDARY! 🔥",
    "A person of culture, I see! 👑",
    "Absolutely PERFECT choice! ⭐",
    "You've got ELITE taste! 💯",
    "BRILLIANT! You know cinema! 🎬",
    "Standing ovation! 👏👏👏",
    "You have IMPECCABLE taste! 😎",
    "FINALLY someone with taste! 🙌",
    "This is CHEF'S KISS! 👨‍🍳💋",
    "You've unlocked TASTE level 100! 🎯",
    "RESPECT! You get it! 🙏",
    "Exquisite choice, my friend! 🥂"
  ];
  return getRandomWithHistory(texts, historyKey, recentTexts);
}

function getRandomHateText(historyKey: string): string {
  const texts = [
    "Why would you do this? 😭",
    "Your taste is questionable... 💀",
    "I'm judging you right now... 👀",
    "We need to talk about this... 😤",
    "Big yikes energy here! 😬",
    "Are we watching the same show?! 🤔",
    "Nope. Just nope. 🙅",
    "Excuse me, WHAT?! 🤯",
    "My disappointment is immeasurable! 📉",
    "This is a crime against TV! ⚖️",
    "You need help... professional help! 🆘",
    "I have no words... just WHY?! 🙃",
    "The audacity! THE AUDACITY! 😱",
    "Houston, we have a TASTE problem! 🚀",
    "This ain't it, chief... 🙅‍♂️"
  ];
  return getRandomWithHistory(texts, historyKey, recentTexts);
}
