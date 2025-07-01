import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { featuredProducts } from "../data/mockData";

export const FeaturedProductsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Nos <span className="text-gradient font-neon">pépites du moment</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            Découvrez les produits plébiscités par notre communauté d'experts et de passionnés.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="glass-dark rounded-3xl overflow-hidden group border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-[420px] min-h-[420px]"
            >
              <div className="relative h-48 w-full flex-shrink-0">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </div>
              </div>
              <div className="flex flex-col flex-1 justify-between p-6">
                <div>
                  <h3 className="text-lg font-bold truncate">{product.name}</h3>
                  <p className="text-white/60 mt-1 truncate">{product.specs}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-bold text-primary-400">{product.price}</p>
                  <button className="btn-icon">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link to="/j-achete" className="btn-primary group relative inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-2xl">
            Voir tous les produits
          </Link>
        </div>
      </div>
    </section>
  );
}; 