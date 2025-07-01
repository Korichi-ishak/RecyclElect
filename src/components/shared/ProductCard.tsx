import { motion } from "framer-motion";
import {
  Heart,
  Eye,
  Star,
  Check,
  ShoppingCart,
  CreditCard
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  category: 'laptop' | 'part';
  subcategory?: string;
  condition: 'excellent' | 'very-good' | 'good';
  specs: string[];
  images: string[];
  rating: number;
  reviews: number;
  inStock: number;
  warranty: string;
  description?: string;
  features?: string[];
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onBuyNow: (productId: string) => void;
  onViewDetails: (product: Product) => void;
  conditions: Array<{ id: string; name: string; color: string }>;
}

export const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
  onViewDetails,
  conditions
}: ProductCardProps) => (
  <motion.div
    layout
    className="glass-dark rounded-3xl overflow-hidden border border-white/10 hover:border-primary-400/50 transition-all duration-300 group bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-xl h-[580px] flex flex-col"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <div className="relative">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover group-hover:scale-102 transition-transform duration-200"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleFavorite(product.id)}
          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
            isFavorite
              ? 'bg-red-500/80 text-white'
              : 'bg-black/50 text-white/70 hover:text-red-400'
          }`}
        >
          <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
        </motion.button>
      </div>
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
          conditions.find(c => c.id === product.condition)?.color
        } bg-black/50`}>
          {conditions.find(c => c.id === product.condition)?.name}
        </span>
      </div>
      {product.originalPrice && (
        <div className="absolute bottom-4 left-4">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        </div>
      )}
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-start justify-between mb-2 h-16">
        <div className="flex-1">
          <h3 className="font-bold text-lg group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-white/60 text-sm">{product.brand}</p>
        </div>
        <button
          onClick={() => onViewDetails(product)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center mb-3 h-6">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-white/30'}`}
              fill="currentColor"
            />
          ))}
        </div>
        <span className="text-sm text-white/60 ml-2">({product.reviews})</span>
      </div>

      <div className="space-y-2 mb-4 h-16 overflow-hidden">
        {product.specs.slice(0, 2).map((spec, index) => (
          <div key={index} className="flex items-center text-sm text-white/70">
            <Check className="w-3 h-3 text-primary-400 mr-2 flex-shrink-0" />
            <span className="truncate">{spec}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 h-14">
        <div className="flex-1">
          <p className="text-2xl font-bold text-primary-400">{product.price}$ CAD</p>
          {product.originalPrice && (
            <p className="text-sm text-white/50 line-through">{product.originalPrice}$ CAD</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-white/60">Stock: {product.inStock}</p>
          <p className="text-xs text-white/50">Garantie {product.warranty}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(product.id)}
          className="flex-1 btn-secondary text-white py-3 px-4 rounded-xl flex items-center justify-center font-semibold"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Panier
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onBuyNow(product.id)}
          className="flex-1 btn-primary text-white py-3 px-4 rounded-xl flex items-center justify-center font-semibold"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Acheter
        </motion.button>
      </div>
    </div>
  </motion.div>
);