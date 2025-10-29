import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  tmdbId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, default: "" },
  rating: { type: Number, default: 0 },
  hate: { type: Number, default: 0 },
  ratedBy: { type: [String], default: [] },
});

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
