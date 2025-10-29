# 🎬 Rate It or Hate It

A fun and interactive movie rating app built with Next.js, MongoDB, and Framer Motion. Vote on your favorite Hollywood and Bollywood movies and see hilarious GIF reactions!

## ✨ Features

- **Category-Based Browsing**: Separate Hollywood and Bollywood movie categories
- **Simple Voting**: Rate or Hate movies with a single click
- **Funny GIF Reactions**: See random funny GIFs with captions after each vote
- **No Authentication**: Just start voting - user tracking via localStorage
- **Smooth Animations**: Beautiful Framer Motion animations throughout
- **Responsive Design**: Works great on all devices
- **MongoDB Integration**: Persistent vote tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gitnaseem745/rate_it_or_hate_it.git
   cd rate_it_or_hate_it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   TMDB_API_KEY=your_tmdb_api_key_here  # Optional
   ```

4. **Seed the database**
   
   Visit `http://localhost:3000/api/setup` after starting the dev server to populate the database with initial movies.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
rate_it_or_hate_it/
├── app/
│   ├── [category]/       # Dynamic category pages (Hollywood/Bollywood)
│   ├── api/
│   │   ├── movies/       # Fetch movies endpoint
│   │   ├── rate/         # Vote endpoint
│   │   └── setup/        # Database seeding
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page with category selection
├── lib/
│   ├── dbConnect.ts      # MongoDB connection
│   ├── memes.ts          # GIF meme data
│   └── utils.ts          # Utility functions
├── models/
│   └── Movie.ts          # Mongoose schema
├── FLOWCHART.md          # Detailed system architecture
└── project_overview.md   # Project specifications
```

## 🎯 How It Works

1. **Home Page**: Choose between Hollywood or Bollywood categories
2. **Category Page**: View one movie at a time with its details
3. **Vote**: Click "Rate Me" 👍 or "Hate Me" 👎
4. **Meme Time**: Enjoy a funny GIF reaction with caption
5. **Next Movie**: Automatically moves to the next movie
6. **Track Progress**: See which movie you're on (1 of X)

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel-ready

## 📊 API Endpoints

- `GET /api/movies?category=hollywood` - Fetch movies by category
- `POST /api/rate` - Submit a vote
- `GET /api/setup` - Seed the database with initial movies

## 🎨 Features Detail

### Meme System
- 10 "Rate Me" memes with happy/excited reactions
- 13 "Hate Me" memes with disappointed reactions
- All memes include funny captions
- Powered by Giphy GIFs

### Vote Tracking
- Uses localStorage to generate unique user IDs
- Prevents duplicate voting
- Tracks total ratings and hates per movie

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import to Vercel
3. Add environment variables:
   - `MONGODB_URI`
   - `TMDB_API_KEY` (optional)
4. Deploy!
5. Visit `/api/setup` on your deployed URL to seed the database

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string |
| `TMDB_API_KEY` | ❌ No | TMDB API key for fetching real movie data |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Movie posters from TMDB
- GIF reactions from Giphy
- Built with love using Next.js

## 📖 Documentation

For detailed system architecture and flowcharts, see [FLOWCHART.md](./FLOWCHART.md).

---

**Made with ❤️ | No Login Required**
