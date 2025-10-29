import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";

/**
 * API Route: /api/setup
 * One-time setup to fetch movies from TMDB API and store in MongoDB
 * Prevents duplicate seeding
 */
export async function GET() {
  try {
    await dbConnect();

    // Check if movies already exist
    const existingMovies = await Movie.countDocuments();
    if (existingMovies > 0) {
      return NextResponse.json(
        { message: "Movies already seeded!", count: existingMovies },
        { status: 200 }
      );
    }

    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    // Fallback movies if TMDB API is not available or fails
    const fallbackMovies = [
      // Hollywood Movies
      {
        tmdbId: "1",
        title: "The Shawshank Redemption",
        imageUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "2",
        title: "The Godfather",
        imageUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "3",
        title: "The Dark Knight",
        imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "4",
        title: "Pulp Fiction",
        imageUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "5",
        title: "Inception",
        imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "6",
        title: "Fight Club",
        imageUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "7",
        title: "Forrest Gump",
        imageUrl: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "8",
        title: "The Matrix",
        imageUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "9",
        title: "Goodfellas",
        imageUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        category: "hollywood",
      },
      {
        tmdbId: "10",
        title: "Interstellar",
        imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        category: "hollywood",
      },
      // Bollywood Movies
      {
        tmdbId: "11",
        title: "3 Idiots",
        imageUrl: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw conducive4Jk1N.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "12",
        title: "Dangal",
        imageUrl: "https://image.tmdb.org/t/p/w500/lXdSJC08eGFZpLbnig2Nh7oduWl.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "13",
        title: "PK",
        imageUrl: "https://image.tmdb.org/t/p/w500/9V8IqFd1a5ppxAvJhI5JkXCQwKq.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "14",
        title: "Bahubali 2",
        imageUrl: "https://image.tmdb.org/t/p/w500/hgzE7G3I6lWZfLlZNP91BkHhFbN.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "15",
        title: "Dilwale Dulhania Le Jayenge",
        imageUrl: "https://image.tmdb.org/t/p/w500/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "16",
        title: "Lagaan",
        imageUrl: "https://image.tmdb.org/t/p/w500/xiJRA6eUfmEMJdqI1f6vdQgkfPL.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "17",
        title: "Kabhi Khushi Kabhie Gham",
        imageUrl: "https://image.tmdb.org/t/p/w500/kKBx8Ieu0McBNwOV1CsKdJLhY9t.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "18",
        title: "Sholay",
        imageUrl: "https://image.tmdb.org/t/p/w500/7d5PwnSwbvxusDEH0cg3qJPWGwV.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "19",
        title: "Gully Boy",
        imageUrl: "https://image.tmdb.org/t/p/w500/mDzFbSCJ4ZliJRPbcFJUPKn1CJn.jpg",
        category: "bollywood",
      },
      {
        tmdbId: "20",
        title: "Zindagi Na Milegi Dobara",
        imageUrl: "https://image.tmdb.org/t/p/w500/7LKEgbEqZKHDzqGvxtmjNvxYFEr.jpg",
        category: "bollywood",
      },
    ];

    let moviesToInsert = fallbackMovies;

    // Try to fetch from TMDB if API key is available
    if (TMDB_API_KEY) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );

        if (response.ok) {
          const data = await response.json();
          moviesToInsert = data.results.slice(0, 20).map((movie: {
            id: number;
            title: string;
            poster_path: string;
          }) => ({
            tmdbId: movie.id.toString(),
            title: movie.title,
            imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            category: "hollywood",
          }));
        }
      } catch (error) {
        console.log("TMDB API fetch failed, using fallback movies", error);
      }
    }

    // Insert movies into database
    await Movie.insertMany(moviesToInsert);

    return NextResponse.json(
      {
        message: "Movies seeded successfully!",
        count: moviesToInsert.length,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Failed to seed movies", details: error.message },
      { status: 500 }
    );
  }
}
