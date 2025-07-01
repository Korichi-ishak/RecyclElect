import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviews?: number;
  showReviews?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StarRating = ({ 
  rating, 
  reviews, 
  showReviews = true, 
  size = 'md',
  className = "" 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-white/30'}`}
            fill="currentColor"
          />
        ))}
      </div>
      {showReviews && reviews && (
        <span className={`${textSizeClasses[size]} text-white/60 ml-2`}>({reviews})</span>
      )}
    </div>
  );
};