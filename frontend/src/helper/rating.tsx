import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
}

export function getStarRating({ value, max = 5 }: RatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const starNumber = i + 1;
        let starClass = "text-gray-400";
        if (value >= starNumber) {
          starClass = "fill-yellow-400 text-yellow-400";
        } else if (value >= starNumber - 0.5) {
          starClass = "fill-yellow-200 text-yellow-400";
        }
        return (
          <Star
            key={starNumber}
            className={starClass}
          />
        );
      })}
    </div>
  );
}
