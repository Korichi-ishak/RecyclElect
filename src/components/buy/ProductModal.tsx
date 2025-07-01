import {
  X,
  Heart,
  Check,
  Zap,
  ShieldCheck,
  Truck,
  Award,
  ShoppingCart
} from "lucide-react";
import { Modal, StarRating, Button } from "../shared";
import type { Product } from "../shared/ProductCard";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  conditions: Array<{ id: string; name: string; color: string }>;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  conditions
}: ProductModalProps) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      showHeader={false}
      className="p-8"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-white/60">{product.brand}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-2xl"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-primary-400">{product.price}$ CAD</p>
                {product.originalPrice && (
                  <p className="text-lg text-white/50 line-through">{product.originalPrice}$ CAD</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-3 rounded-full transition-colors ${
                    isFavorite
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-white/70 hover:text-red-400'
                  }`}
                >
                  <Heart className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            <StarRating 
              rating={product.rating} 
              reviews={product.reviews} 
              size="lg" 
              className="mb-4" 
            />

            <p className="text-white/70 mb-6">{product.description}</p>

            <div className="space-y-4 mb-6">
              <h4 className="font-semibold">Spécifications</h4>
              {product.specs.map((spec, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-primary-400 mr-3" />
                  <span className="text-white/80">{spec}</span>
                </div>
              ))}
            </div>

            {product.features && (
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold">Caractéristiques</h4>
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Zap className="w-4 h-4 text-secondary-400 mr-3" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm">Garantie {product.warranty}</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-sm">Livraison gratuite</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-purple-400 mr-2" />
                <span className={`text-sm ${conditions.find(c => c.id === product.condition)?.color}`}>
                  {conditions.find(c => c.id === product.condition)?.name}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => onAddToCart(product.id)}
                variant="primary"
                size="lg"
                icon={ShoppingCart}
                className="flex-1"
              >
                Ajouter au panier
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};