import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";

/**
 * API Route: /api/movies
 * GET - Fetch all movies from database
 * Query params: category (optional) - filter by hollywood or bollywood
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = {};
    
    // Filter by category if provided
    if (category) {
      query = { category: category.toLowerCase() };
    }

    // Fetch movies sorted by rating (most rated first)
    const movies = await Movie.find(query).sort({ rating: -1 }).lean();

    return NextResponse.json(
      {
        success: true,
        movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
