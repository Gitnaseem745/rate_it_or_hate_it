interface VoteStatsProps {
  rating: number;
  hate: number;
}

export default function VoteStats({ rating, hate }: VoteStatsProps) {
  return (
    <div className="flex gap-8 mb-8">
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">Rating</p>
        <p className="text-3xl font-bold text-green-500">{rating}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">Hating</p>
        <p className="text-3xl font-bold text-red-500">{hate}</p>
      </div>
    </div>
  );
}
