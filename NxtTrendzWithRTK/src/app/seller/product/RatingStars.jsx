"use client";
import { Star } from "lucide-react";

export default function RatingStars({ rating, selectedRating, size = 20 }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const filled = index < Math.round(rating);
        return (
          <Star
            key={index}
            size={size}
            className={filled ? "fill-blue-600 text-blue-600" : "text-gray-300"}
          />
        );
      })}{" "}
      <span
        className={`text-xl ml-3 ${
          selectedRating === rating ? "text-blue-500" : "text-gray-500"
        }`}
      >
        & up
      </span>
    </div>
  );
}
