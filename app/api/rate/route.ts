import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import { getSeriesMeme } from "@/lib/seriesMemes";

/**
 * API Route: /api/rate
 * POST - Handle Rate or Hate action for a series
 * Body: { movieId: string, userId: string, action: "rate" | "hate" }
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { movieId, userId, action } = body;

    // Validate input
    if (!movieId || !userId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: movieId, userId, action" },
        { status: 400 }
      );
    }

    if (action !== "rate" && action !== "hate") {
      return NextResponse.json(
        { error: "Invalid action. Must be 'rate' or 'hate'" },
        { status: 400 }
      );
    }

    // Find the series
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return NextResponse.json(
        { error: "Series not found" },
        { status: 404 }
      );
    }

    // Check if user has already voted
    if (movie.ratedBy.includes(userId)) {
      return NextResponse.json(
        { error: "You have already voted for this series!" },
        { status: 400 }
      );
    }

    // Update the series based on action
    if (action === "rate") {
      movie.rating += 1;
    } else {
      movie.hate += 1;
    }

    // Add userId to ratedBy array
    movie.ratedBy.push(userId);

    // Save the updated series
    await movie.save();

    // Get series-specific meme or fallback to generic
    const meme = getSeriesMeme(movie.seriesId, action);

    return NextResponse.json(
      {
        success: true,
        message: `Series ${action}d successfully!`,
        movie: {
          _id: movie._id,
          title: movie.title,
          rating: movie.rating,
          hate: movie.hate,
        },
        meme,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error rating series:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}
