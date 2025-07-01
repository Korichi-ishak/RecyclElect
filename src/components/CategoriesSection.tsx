import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Tablet,
  Headphones,
} from "lucide-react";

export const CategoriesSection = () => {
  const productsCategories = [
    { icon: Laptop, name: "Ordinateurs", count: "150+", color: "text-primary-400" },
    { icon: Smartphone, name: "Smartphones", count: "80+", color: "text-secondary-400" },
    { icon: Tablet, name: "Tablettes", count: "45+", color: "text-accent-400" },
    { icon: Headphones, name: "Audio", count: "200+", color: "text-purple-400" },
  ];

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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Pour tous les <span className="text-gradient font-neon">besoins</span>
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Explorez nos catégories pour trouver exactement ce que vous cherchez, des ordinateurs portables puissants aux accessoires essentiels.
            </p>
            <Link to="/j-achete" className="btn-secondary">
              Explorer les catégories
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {productsCategories.map((cat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="glass-dark p-6 rounded-3xl flex items-center space-x-4 border border-white/10 hover:border-white/20 transition-all"
              >
                <cat.icon className={`w-10 h-10 ${cat.color}`} />
                <div>
                  <p className="text-lg font-bold">{cat.name}</p>
                  <p className="text-sm text-white/60">{cat.count} produits</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 