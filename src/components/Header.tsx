import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems } from '../data/mockData';
import { assets } from '../config/assets';
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  Search,
  User
} from 'lucide-react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const linkVariants = {
    initial: { y: 0 },
    hover: { 
      y: -2,
      transition: { type: "spring" as const, stiffness: 400, damping: 10 }
    }
  };

  const activeLinkStyle = "text-white bg-white/10 border-accent shadow-lg shadow-accent/20";
  const inactiveLinkStyle = "text-neutral-300 hover:text-white hover:bg-white/5 border-transparent";

  // Couleurs spécifiques pour chaque élément de navigation

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-dark backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={assets.logo}
              alt="RecyclElect Logo"
              className="w-28 h-28 object-contain"
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                custom={index}
              >
                <Link
                  to={item.path}
                  className={`relative px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 border ${
                    isActive(item.path)
                      ? activeLinkStyle
                      : inactiveLinkStyle
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 bg-accent/20 rounded-full"
                      style={{
                        borderRadius: 9999,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 text-neutral-300 hover:text-emerald-500 transition-colors duration-200 rounded-xl hover:bg-white/10 group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 text-neutral-300 hover:text-pink-500 transition-colors duration-200 rounded-xl hover:bg-white/10 relative group"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 text-xs text-white rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </motion.button>
            <Link to="/panier">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-neutral-300 hover:text-blue-500 transition-colors duration-200 rounded-xl hover:bg-white/10 relative group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-400 text-xs text-white rounded-full flex items-center justify-center animate-bounce">
                  2
                </span>
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-accent to-cyan-400 px-6 py-3 text-white font-bold rounded-full text-sm hover:shadow-lg hover:shadow-accent/40 transition-all duration-300 relative overflow-hidden group flex items-center"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="relative z-10">Connexion</span>
              {/* Effet de brillance sur hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 text-neutral-300 hover:text-purple-500 focus:outline-none rounded-xl hover:bg-white/10 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="glass-dark rounded-3xl mx-4 mb-4 p-6 border border-white/10">
                <div className="space-y-3">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-6 py-4 rounded-xl text-base font-bold transition-all duration-200 ${
                          isActive(item.path)
                            ? `text-white bg-accent/20`
                            : `text-neutral-200 hover:text-white hover:bg-white/10`
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button className="p-3 text-neutral-300 hover:text-emerald-500 transition-colors duration-200 rounded-xl hover:bg-white/10">
                        <Search className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-neutral-300 hover:text-pink-500 transition-colors duration-200 rounded-xl hover:bg-white/10 relative">
                        <Heart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 text-xs text-white rounded-full flex items-center justify-center">
                          3
                        </span>
                      </button>
                      <button className="p-3 text-neutral-300 hover:text-blue-500 transition-colors duration-200 rounded-xl hover:bg-white/10 relative">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-400 text-xs text-white rounded-full flex items-center justify-center">
                          2
                        </span>
                      </button>
                    </div>
                    <button className="bg-gradient-to-r from-accent to-cyan-400 px-6 py-3 text-white font-bold rounded-full text-sm shadow-lg shadow-accent/30 flex items-center justify-center">
                      <User className="w-4 h-4 mr-2" />
                      Connexion
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}; 