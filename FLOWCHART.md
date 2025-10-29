# 🎬 Rate It or Hate It - System Flowchart

## 📋 Table of Contents
- [System Overview](#system-overview)
- [User Flow](#user-flow)
- [Data Flow](#data-flow)
- [API Architecture](#api-architecture)
- [Component Hierarchy](#component-hierarchy)
- [Key Functions Reference](#key-functions-reference)

---

## 🌐 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     RATE IT OR HATE IT                          │
│                   (Next.js App Router)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                │
│  │   Home   │───▶│ Category │───▶│  Voting  │                │
│  │   Page   │    │   Page   │    │  System  │                │
│  └──────────┘    └──────────┘    └──────────┘                │
│       │               │                │                       │
│       │               │                ▼                       │
│       │               │          ┌──────────┐                 │
│       │               └─────────▶│   Meme   │                 │
│       │                          │  Display │                 │
│       │                          └──────────┘                 │
│       │                                                        │
│       ▼                                                        │
│  ┌─────────────────────────────────────┐                     │
│  │         MongoDB Database            │                     │
│  │  ┌─────────────────────────────┐   │                     │
│  │  │  Movies Collection          │   │                     │
│  │  │  - tmdbId, title, imageUrl  │   │                     │
│  │  │  - category, rating, hate   │   │                     │
│  │  │  - ratedBy[]                │   │                     │
│  │  └─────────────────────────────┘   │                     │
│  └─────────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 User Flow

```
START
  │
  ▼
┌─────────────────────────────┐
│  User Visits Homepage (/)   │
│  app/page.tsx               │
└─────────────────────────────┘
  │
  │ Displays:
  │ • "Rate It or Hate It" title
  │ • Two category buttons
  │
  ├──────────────┬──────────────┐
  │              │              │
  ▼              ▼              │
[Hollywood]  [Bollywood]       │
  │              │              │
  │              │              │
  └──────┬───────┘              │
         │                      │
         ▼                      │
┌─────────────────────────────┐ │
│ Category Page               │ │
│ app/[category]/page.tsx     │ │
└─────────────────────────────┘ │
  │                             │
  │ useEffect() triggers:       │
  │ 1. generateUserId()         │
  │    • Check localStorage     │
  │    • Create if missing      │
  │                             │
  │ 2. fetchMovies()           │
  │    ↓                        │
  │    GET /api/movies?category=X
  │    ↓                        │
  │    ← Returns movie list    │
  │                             │
  ▼                             │
┌─────────────────────────────┐ │
│   Display Current Movie     │ │
│   • Image (centered)        │ │
│   • Title                   │ │
│   • Rating count            │ │
│   • Hate count              │ │
│   • Two buttons:            │ │
│     [Rate Me] [Hate Me]     │ │
└─────────────────────────────┘ │
  │                             │
  │ User clicks button          │
  │                             │
  ├──────────┬──────────────┐   │
  │          │              │   │
  ▼          ▼              │   │
[Rate Me] [Hate Me]         │   │
  │          │              │   │
  └────┬─────┘              │   │
       │                    │   │
       ▼                    │   │
┌─────────────────────────────┐ │
│   handleVote(action)        │ │
│   1. Get random meme        │ │
│      getRandomMeme(action)  │ │
│   2. Show meme overlay      │ │
│   3. Call API               │ │
└─────────────────────────────┘ │
  │                             │
  │ POST /api/rate              │
  │ {movieId, userId, action}   │
  │                             │
  ▼                             │
┌─────────────────────────────┐ │
│   API Validates             │ │
│   • User hasn't voted?      │ │
│   • Valid action?           │ │
│   • Movie exists?           │ │
└─────────────────────────────┘ │
  │                             │
  ├── Error ──→ Alert user     │
  │                             │
  ▼ Success                     │
┌─────────────────────────────┐ │
│   Update Database           │ │
│   • Increment rating/hate   │ │
│   • Add userId to ratedBy[] │ │
└─────────────────────────────┘ │
  │                             │
  ▼                             │
┌─────────────────────────────┐ │
│   Show Meme (2.5s)          │ │
│   • GIF animation           │ │
│   • Funny caption           │ │
└─────────────────────────────┘ │
  │                             │
  ▼                             │
┌─────────────────────────────┐ │
│   Next Movie                │ │
│   • Auto-advance            │ │
│   • Loop if last movie      │ │
└─────────────────────────────┘ │
  │                             │
  └─────────────────────────────┘
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA FLOW DIAGRAM                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────┐
│   Browser   │
│ localStorage│
└──────┬──────┘
       │
       │ generateUserId()
       │ ├─→ Read "userId"
       │ ├─→ If missing: crypto.randomUUID()
       │ └─→ Store in localStorage
       │
       ▼
┌──────────────────┐
│   userId stored  │
└──────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INPUT: User visits /hollywood or /bollywood

       │
       ▼
┌──────────────────────────────────┐
│  API: GET /api/movies           │
│  Query: ?category=hollywood      │
└──────────────────────────────────┘
       │
       │ dbConnect()
       ▼
┌──────────────────────────────────┐
│  MongoDB Connection              │
│  • Check cached connection       │
│  • Create new if needed          │
└──────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Movie.find({ category })        │
│  .sort({ rating: -1 })           │
│  .lean()                         │
└──────────────────────────────────┘
       │
       ▼
OUTPUT: {
  success: true,
  movies: [
    {
      _id: "...",
      tmdbId: "1",
      title: "Movie Name",
      imageUrl: "https://...",
      category: "hollywood",
      rating: 42,
      hate: 5,
      ratedBy: ["uuid-1", "uuid-2"]
    },
    ...
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INPUT: User clicks "Rate Me" or "Hate Me"

       │
       ▼
┌──────────────────────────────────┐
│  API: POST /api/rate            │
│  Body: {                         │
│    movieId: "abc123",            │
│    userId: "uuid-xyz",           │
│    action: "rate" | "hate"       │
│  }                               │
└──────────────────────────────────┘
       │
       │ Validation
       ▼
┌──────────────────────────────────┐
│  Check:                          │
│  1. Movie exists?                │
│  2. userId in ratedBy[]?         │
│  3. Valid action?                │
└──────────────────────────────────┘
       │
       ├─→ Error: Return 400/404
       │
       ▼ Valid
┌──────────────────────────────────┐
│  Update Movie:                   │
│  • movie.rating += 1  OR         │
│  • movie.hate += 1               │
│  • movie.ratedBy.push(userId)    │
│  • movie.save()                  │
└──────────────────────────────────┘
       │
       ▼
OUTPUT: {
  success: true,
  message: "Movie rated successfully!",
  movie: {
    _id: "abc123",
    title: "Movie Name",
    rating: 43,    ← Updated
    hate: 5
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEME DISPLAY FLOW:

getRandomMeme(action: "rate" | "hate")
       │
       ├─→ action === "rate"
       │   └─→ rateMemes[random index]
       │
       └─→ action === "hate"
           └─→ hateMemes[random index]
       │
       ▼
RETURN: {
  gif: "https://media.giphy.com/...",
  text: "Your taste is LEGENDARY! 🔥"
}
       │
       ▼
Display overlay:
  • Spin animation
  • Show GIF
  • Show text below
  • 2.5 second delay
  • Auto-close
```

---

## 🏗️ API Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       API ROUTES                             │
└─────────────────────────────────────────────────────────────┘

1️⃣  /api/setup (GET)
    ─────────────────────────────
    Function: Seed database with movies
    
    Flow:
    ┌─────────────────┐
    │  Request comes  │
    └────────┬────────┘
             ▼
    ┌─────────────────────────┐
    │ Check: Movies exist?    │
    └────────┬────────────────┘
             │
             ├─→ Yes: Return count
             │
             ▼ No
    ┌─────────────────────────┐
    │ Try TMDB API           │
    │ (if TMDB_API_KEY set)  │
    └────────┬────────────────┘
             │
             ├─→ Success: Use TMDB data
             ├─→ Fail: Use fallback
             │
             ▼
    ┌─────────────────────────┐
    │ Insert movies:          │
    │ • 10 Hollywood          │
    │ • 10 Bollywood          │
    │ Movie.insertMany()      │
    └────────┬────────────────┘
             ▼
    Output: {
      message: "Movies seeded!",
      count: 20
    }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣  /api/movies (GET)
    ─────────────────────────────
    Function: Fetch movies by category
    
    Input Query: ?category=hollywood
    
    Flow:
    ┌─────────────────┐
    │  Parse query    │
    │  category param │
    └────────┬────────┘
             ▼
    ┌─────────────────────────┐
    │ Build MongoDB query:    │
    │ { category: "hollywood" }│
    └────────┬────────────────┘
             ▼
    ┌─────────────────────────┐
    │ Movie.find(query)       │
    │ .sort({ rating: -1 })   │
    │ .lean()                 │
    └────────┬────────────────┘
             ▼
    Output: {
      success: true,
      movies: [...]
    }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣  /api/rate (POST)
    ─────────────────────────────
    Function: Handle user vote
    
    Input Body: {
      movieId: string,
      userId: string,
      action: "rate" | "hate"
    }
    
    Flow:
    ┌─────────────────┐
    │ Parse request   │
    │ body            │
    └────────┬────────┘
             ▼
    ┌─────────────────────────┐
    │ Validate:               │
    │ • All fields present?   │
    │ • Valid action?         │
    └────────┬────────────────┘
             │
             ├─→ Invalid: 400 Error
             │
             ▼ Valid
    ┌─────────────────────────┐
    │ Movie.findById(movieId) │
    └────────┬────────────────┘
             │
             ├─→ Not found: 404 Error
             │
             ▼ Found
    ┌─────────────────────────┐
    │ Check:                  │
    │ userId in ratedBy[]?    │
    └────────┬────────────────┘
             │
             ├─→ Yes: 400 "Already voted"
             │
             ▼ No
    ┌─────────────────────────┐
    │ Update movie:           │
    │ if (action === "rate")  │
    │   movie.rating++        │
    │ else                    │
    │   movie.hate++          │
    │                         │
    │ movie.ratedBy.push()    │
    │ movie.save()            │
    └────────┬────────────────┘
             ▼
    Output: {
      success: true,
      message: "Movie rated!",
      movie: { _id, title, rating, hate }
    }
```

---

## 🧩 Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT TREE                            │
└─────────────────────────────────────────────────────────────┘

app/
│
├── layout.tsx (Root Layout)
│   └── Metadata, Fonts, Body wrapper
│
├── page.tsx (Home Page)
│   │
│   ├── States: None
│   ├── Imports: Link, motion
│   │
│   └── Renders:
│       ├── Title: "Rate It or Hate It"
│       ├── Hollywood Button → Link to /hollywood
│       └── Bollywood Button → Link to /bollywood
│
└── [category]/page.tsx (Dynamic Category Page)
    │
    ├── States:
    │   ├── movies: Movie[]
    │   ├── currentIndex: number
    │   ├── loading: boolean
    │   ├── userId: string
    │   ├── error: string
    │   ├── isVoting: boolean
    │   ├── showMeme: boolean
    │   └── currentMeme: { gif, text }
    │
    ├── Functions:
    │   ├── fetchMovies()
    │   │   └── GET /api/movies?category=X
    │   │
    │   └── handleVote(action)
    │       ├── getRandomMeme(action)
    │       ├── POST /api/rate
    │       └── Auto-advance to next movie
    │
    └── Renders:
        ├── Meme Overlay (Conditional)
        │   ├── AnimatePresence
        │   ├── img (GIF)
        │   └── text (Caption)
        │
        ├── Header
        │   └── "Rate It or Hate It"
        │
        ├── Current Movie Display
        │   ├── Image
        │   ├── Title
        │   ├── Rating/Hate counts
        │   └── Buttons:
        │       ├── Rate Me
        │       └── Hate Me
        │
        └── Progress Indicator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

components/
│
├── Navbar.tsx (Not used in current flow)
│   └── Header with gradient background
│
├── MovieCard.tsx (Not used - grid layout replaced)
│   └── Card with image, title, buttons
│
├── RateHateButtons.tsx (Not used - inline in category page)
│   └── Two buttons with counts
│
└── Loader.tsx
    └── Spinning loader with text
```

---

## 📚 Key Functions Reference

```
┌─────────────────────────────────────────────────────────────┐
│               CRITICAL FUNCTIONS BREAKDOWN                   │
└─────────────────────────────────────────────────────────────┘

📁 lib/utils.ts
─────────────────────────────────────────────────────

generateUserId()
  Input:  None
  Output: string (UUID)
  
  Logic:
  1. Check localStorage for "userId"
  2. If exists: return it
  3. If not: 
     • Generate crypto.randomUUID()
     • Store in localStorage
     • Return it
  
  Purpose: Ensure each user has unique ID to prevent duplicate votes

getUserId()
  Input:  None
  Output: string (UUID or empty)
  
  Logic:
  1. Read "userId" from localStorage
  2. Return it (or empty string)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 lib/memes.ts
─────────────────────────────────────────────────────

getRandomMeme(action: "rate" | "hate")
  Input:  action ("rate" or "hate")
  Output: { gif: string, text: string }
  
  Logic:
  1. Select array based on action:
     • "rate" → rateMemes[]
     • "hate" → hateMemes[]
  2. Generate random index: Math.floor(Math.random() * length)
  3. Return meme object { gif, text }
  
  Data:
  • rateMemes: 10 happy GIFs
  • hateMemes: 13 disappointed GIFs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 lib/dbConnect.ts
─────────────────────────────────────────────────────

dbConnect()
  Input:  None
  Output: Promise<mongoose connection>
  
  Logic:
  1. Check global.mongoose.conn (cached)
  2. If exists: return cached connection
  3. If not:
     a. Check global.mongoose.promise (connecting)
     b. If not connecting: start new connection
     c. Await promise
     d. Cache connection
     e. Return connection
  
  Purpose: Reuse DB connection (serverless optimization)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 app/[category]/page.tsx
─────────────────────────────────────────────────────

fetchMovies()
  Input:  None (uses category from params)
  Output: void (updates state)
  
  Logic:
  1. setLoading(true)
  2. Fetch: /api/movies?category={category}
  3. Parse response
  4. If success: setMovies(data.movies)
  5. If error: setError(message)
  6. setLoading(false)

handleVote(action: "rate" | "hate")
  Input:  action string
  Output: void (updates state + DB)
  
  Logic:
  1. Check: isVoting or no currentMovie → return
  2. setIsVoting(true)
  3. Get random meme: getRandomMeme(action)
  4. Show meme overlay:
     • setCurrentMeme(meme)
     • setShowMeme(true)
  5. POST /api/rate { movieId, userId, action }
  6. If success:
     a. Update local state (optimistic update)
     b. Wait 2.5 seconds
     c. setShowMeme(false)
     d. Advance to next movie (or loop to start)
  7. If error: alert user
  8. setIsVoting(false)
```

---

## 🔐 Environment Variables

```
┌─────────────────────────────────────────────────────────────┐
│                  REQUIRED ENV VARIABLES                      │
└─────────────────────────────────────────────────────────────┘

MONGODB_URI (Required)
  Location: .env.local
  Used in:  lib/dbConnect.ts
  Format:   mongodb+srv://user:pass@cluster.mongodb.net/dbname
  Purpose:  Connect to MongoDB database

TMDB_API_KEY (Optional)
  Location: .env.local
  Used in:  app/api/setup/route.ts
  Format:   string (API key from themoviedb.org)
  Purpose:  Fetch real movie data (fallback to hardcoded if missing)
```

---

## 🎯 Quick Troubleshooting Guide

```
┌─────────────────────────────────────────────────────────────┐
│                    ISSUE → SOLUTION                          │
└─────────────────────────────────────────────────────────────┘

Issue: No movies showing
  ↓
  Check: /api/setup been called?
  Fix:   Visit /api/setup to seed database

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issue: Can't vote / "Already voted" error
  ↓
  Check: localStorage userId
  Fix:   Clear localStorage or use incognito

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issue: Memes not loading
  ↓
  Check: Network tab for Giphy URLs
  Fix:   Ensure next.config.ts has unoptimized: true

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issue: Database connection error
  ↓
  Check: MONGODB_URI in .env.local
  Fix:   Verify connection string format

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issue: Wrong memes for action
  ↓
  Check: lib/memes.ts arrays
  Fix:   Ensure no duplicate URLs between rateMemes/hateMemes
```

---

## 📊 Database Schema Reference

```
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB SCHEMA                            │
└─────────────────────────────────────────────────────────────┘

Collection: movies
────────────────────────────────────────────────────

Document Structure:
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  tmdbId: String (required, unique), // TMDB movie ID or custom ID
  title: String (required),          // Movie name
  imageUrl: String (required),       // Poster URL
  category: String,                  // "hollywood" or "bollywood"
  rating: Number (default: 0),       // Count of "Rate Me" votes
  hate: Number (default: 0),         // Count of "Hate Me" votes
  ratedBy: [String] (default: [])    // Array of user IDs who voted
}

Indexes:
  • tmdbId: unique
  • category: for filtering

Queries Used:
  1. Movie.find({ category: "hollywood" })
     .sort({ rating: -1 })
     .lean()
  
  2. Movie.findById(movieId)
  
  3. Movie.insertMany([...])
  
  4. movie.save()
```

---

## 🚀 Deployment Checklist

```
┌─────────────────────────────────────────────────────────────┐
│                  PRE-DEPLOYMENT STEPS                        │
└─────────────────────────────────────────────────────────────┘

□ 1. Environment Variables Set
    • MONGODB_URI configured in Vercel
    • TMDB_API_KEY (optional) added

□ 2. Build Test Passed
    • Run: npm run build
    • No errors in output

□ 3. Database Seeded
    • Visit: /api/setup after deploy
    • Verify 20+ movies inserted

□ 4. Git Clean
    • No .env.local in repo
    • .gitignore properly set

□ 5. Test User Flow
    • Home → Category selection works
    • Voting increments counts
    • Memes display correctly
    • No duplicate votes allowed

□ 6. Performance Check
    • Images loading from Giphy
    • Smooth animations
    • Fast API responses
```

---

**Generated:** 2025-10-29  
**Project:** Rate It or Hate It  
**Version:** 1.0.0  
**Framework:** Next.js 16.0.1
