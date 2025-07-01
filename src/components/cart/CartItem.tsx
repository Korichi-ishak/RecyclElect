import { motion } from "framer-motion";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemData {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  condition: string;
  warranty: string;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  return (
    <motion.div
      layout
      className="glass-dark p-6 rounded-3xl border border-white/10"
    >
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-2xl"
          />
          <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {item.quantity}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-white/60">{item.brand}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  {item.condition}
                </span>
                <span className="text-xs text-white/50">
                  Garantie {item.warranty}
                </span>
              </div>
            </div>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="p-2 hover:bg-red-500/20 text-red-400 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-xl">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-white/10 rounded-l-xl transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-white/10 rounded-r-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-400">
                {item.price * item.quantity}$ CAD
              </p>
              {item.originalPrice && (
                <p className="text-sm text-white/50 line-through">
                  {item.originalPrice * item.quantity}$ CAD
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};