You are an expert Next.js full-stack developer.
I want you to **build a complete fun open-source project** called **“Rate It or Hate It”** — a site where users can rate or hate movies without login.
Follow this exact plan and architecture:

---

### 🗂 Project Overview

* **Framework:** Next.js (App Router, TypeScript)
* **Database:** MongoDB with Mongoose
* **Styling:** TailwindCSS + Framer Motion (for smooth animations)
* **Hosting:** Vercel (frontend + serverless API routes)
* **Goal:** Free project, no auth, no paid API calls

---

### ⚙ Core Features

1. Users can click **Rate** or **Hate** on movies.
2. Each user can only rate once per movie (even without login).
3. Movies are fetched **once from TMDB API** and stored in MongoDB (no repeated API calls).
4. UI shows movie posters, titles, and live “Rate / Hate” counts.
5. Store a unique `userId` in localStorage to prevent multiple votes.
6. Smooth UI animations for button feedback.

---

### 🧩 Folder Structure (App Router)

```
rate-it-or-hate-it/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/
│   │   ├── setup/route.ts       # Seed movies from TMDB once
│   │   ├── movies/route.ts      # Get all movies
│   │   └── rate/route.ts        # Handle Rate / Hate actions
│   ├── globals.css
│   └── favicon.ico
│
├── components/
│   ├── MovieCard.tsx
│   ├── RateHateButtons.tsx
│   ├── Navbar.tsx
│   └── Loader.tsx
│
├── lib/
│   ├── dbConnect.ts
│   └── utils.ts
│
├── models/
│   └── Movie.ts
│
├── public/
│   └── placeholder.png
│
├── .env.local
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

### 🧠 Database Schema (models/Movie.ts)

```ts
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  tmdbId: { type: String, required: true },
  title: String,
  imageUrl: String,
  category: String,
  rating: { type: Number, default: 0 },
  hate: { type: Number, default: 0 },
  ratedBy: { type: [String], default: [] },
});

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
```

---

### 🧩 API Routes Logic

#### 1️⃣ `/api/setup/route.ts`

* One-time use route to fetch popular movies from TMDB and insert into MongoDB.
* Use env variable `TMDB_API_KEY`.
* Prevent multiple re-seeds.

#### 2️⃣ `/api/movies/route.ts`

* `GET` route to fetch all movies from MongoDB sorted by popularity or rating.

#### 3️⃣ `/api/rate/route.ts`

* `POST` route that accepts `{ movieId, userId, action }`
* If `userId` already in `ratedBy`, return an error.
* Else, increment `rating` or `hate` and push `userId`.

---

### ⚡ Frontend Logic (page.tsx)

* Fetch movies via `/api/movies` using `useEffect`.
* Render grid of `MovieCard` components.
* Each `MovieCard` shows:

  * Poster
  * Title
  * Rating & Hate count
  * Buttons for “Rate 👍” and “Hate 👎”
* Buttons trigger `/api/rate` calls.
* Store unique userId in localStorage (use `crypto.randomUUID()`).
* Update UI optimistically on vote.

---

### 🎨 UI/UX Guidelines

* Use Tailwind for layout and colors (dark theme preferred).
* Add Framer Motion fade-in for movie grid and button click bounce animation.
* Navbar with “Rate It or Hate It” title.
* Responsive grid (2 cols mobile → 4 cols desktop).
* Minimalist and fun vibe.

---

### 🧠 .env.local example

```
MONGODB_URI=mongodb+srv://<your-uri>
TMDB_API_KEY=your_tmdb_api_key
```

---

### ✅ Goals for Output

Generate:

1. All working `.tsx` and `.ts` files.
2. Ready-to-run project (no missing imports).
3. Minimal yet stylish Tailwind UI.
4. Correct MongoDB connection setup.
5. Comments inside code for clarity.
6. Working sample data from TMDB or dummy fallback.

---

### 🧩 Extra Notes

* If TMDB API limit is reached, use a dummy JSON fallback list of 5 movies.
* Use `fetch` inside `setup/route.ts` for TMDB API call.
* Protect `/api/setup` by checking if movies already exist to avoid duplicates.
* For the frontend, handle loading states gracefully.

---

**Now build this entire project structure and code step by step, file by file, ready to copy into a Next.js app.**
Start from `package.json` setup → `dbConnect.ts` → `Movie model` → all `/api` routes → components → main `page.tsx` with working movie grid.

---

### 🪄 Bonus (optional)

After generating full project, show a command list for:

```
npm install
npm run dev
```

and instructions to run locally.

---

### 🎯 End Goal

A fully functional, free, open-source **Next.js App Router** project titled
**“Rate It or Hate It”** — where users can rate or hate movies once,
data persists in MongoDB, and everything runs smoothly on Vercel free tier.
