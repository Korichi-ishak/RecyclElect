import { motion } from "framer-motion";
import {
  Cpu,
  Monitor,
  Battery,
  MemoryStick,
  HardDrive,
  Laptop,
  ShoppingCart,
  CreditCard
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

interface Subcategory {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  subcategories: Subcategory[];
  selectedSubcategory: string;
  onSubcategoryChange: (subcategoryId: string) => void;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  onAddToCart: (productId: string) => void;
  onBuyNow: (productId: string) => void;
}

const computerModels = [
  { id: 'macbook-pro-13', name: 'MacBook Pro 13"', brand: 'Apple', icon: '💻' },
  { id: 'macbook-pro-16', name: 'MacBook Pro 16"', brand: 'Apple', icon: '💻' },
  { id: 'thinkpad-x1', name: 'ThinkPad X1', brand: 'Lenovo', icon: '💻' },
  { id: 'dell-xps-13', name: 'XPS 13', brand: 'Dell', icon: '💻' },
  { id: 'hp-elitebook', name: 'EliteBook', brand: 'HP', icon: '💻' },
  { id: 'asus-zenbook', name: 'ZenBook', brand: 'ASUS', icon: '💻' },
  { id: 'surface-laptop', name: 'Surface Laptop', brand: 'Microsoft', icon: '💻' },
  { id: 'gaming-laptop', name: 'Gaming Series', brand: 'Divers', icon: '🎮' }
];

const availableParts = [
  { name: 'Écran LCD/OLED', price: '299', icon: Monitor, stock: 15 },
  { name: 'Clavier', price: '89', icon: Laptop, stock: 23 },
  { name: 'Batterie', price: '129', icon: Battery, stock: 12 },
  { name: 'RAM 8GB/16GB', price: '149', icon: MemoryStick, stock: 8 },
  { name: 'SSD 256GB/512GB', price: '179', icon: HardDrive, stock: 18 },
  { name: 'Carte mère', price: '399', icon: Cpu, stock: 5 }
];

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
  selectedModel,
  onModelChange,
  onAddToCart,
  onBuyNow
}: CategoryFilterProps) => {
  return (
    <section className="py-12 bg-gradient-to-r from-neutral-900/80 via-primary-900/10 to-neutral-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span className="font-medium">{category.name}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {category.count}
              </span>
            </motion.button>
          ))}
        </div>

        {selectedCategory === 'part' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 space-y-4"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => onSubcategoryChange(selectedSubcategory === sub.id ? '' : sub.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all ${
                    selectedSubcategory === sub.id
                      ? 'bg-secondary-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <sub.icon className="w-4 h-4" />
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
            
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-bold text-center mb-4 text-secondary-300">
                Choisissez votre modèle d'ordinateur
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {computerModels.map((model) => (
                  <motion.button
                    key={model.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onModelChange(selectedModel === model.id ? '' : model.id)}
                    className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                      selectedModel === model.id
                        ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-white/80'
                    }`}
                  >
                    <div className="text-2xl mb-2">{model.icon}</div>
                    <div className="font-bold text-sm">{model.name}</div>
                    <div className="text-xs opacity-70">{model.brand}</div>
                  </motion.button>
                ))}
              </div>
              
              {selectedModel && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 glass-dark rounded-2xl border border-primary-500/20"
                >
                  <div className="flex items-center mb-4">
                    <Cpu className="w-6 h-6 text-primary-400 mr-3" />
                    <h4 className="text-xl font-bold">Pièces disponibles pour ce modèle</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {availableParts.map((part, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary-400/50 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <part.icon className="w-6 h-6 text-secondary-400" />
                          <span className="text-xs text-green-400">Stock: {part.stock}</span>
                        </div>
                        <h5 className="font-bold mb-2">{part.name}</h5>
                        <div className="flex items-center justify-between">
                          <span className="text-primary-400 font-bold">{part.price}$ CAD</span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => onAddToCart(`${selectedModel}-${part.name.toLowerCase()}`)}
                              className="p-2 bg-secondary-500/20 hover:bg-secondary-500/40 rounded-lg transition-colors"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => onBuyNow(`${selectedModel}-${part.name.toLowerCase()}`)}
                              className="p-2 bg-primary-500/20 hover:bg-primary-500/40 rounded-lg transition-colors"
                            >
                              <CreditCard className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};