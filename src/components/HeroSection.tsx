import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingCart,
  Recycle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Animated background */}
      <div className="absolute inset-0 bg-cyber opacity-10"></div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-primary-400/10 rounded-full blur-xl animate-float"
      />
      <motion.div 
        className="absolute bottom-40 right-20 w-32 h-32 bg-secondary-400/10 rounded-full blur-xl animate-bounce-slow"
      />
      <motion.div 
        className="absolute top-1/2 right-10 w-16 h-16 bg-accent-400/10 rounded-full blur-xl animate-float"
        style={{ animationDuration: '5s' }}
      />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 border border-white/10"
          >
            <span className="font-medium">N°1 du Reconditionnement au Canada</span>
          </motion.div>

          {/* Main title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Tech d'Occasion,
            <br />
            <span className="text-gradient font-neon">
              Qualité Premium
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Transformez votre façon d'acheter et vendre de la technologie avec notre plateforme 
            révolutionnaire de reconditionnement professionnel
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/j-achete"
              className="btn-primary group relative inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-2xl"
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              Explorer nos produits
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/vendre"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Recycle className="w-6 h-6 mr-3" />
              Vendre mon matériel
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 mt-16 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { icon: ShieldCheck, text: "Garantie 2 ans" },
              { icon: TrendingUp, text: "97% satisfaction" },
              { icon: Users, text: "10k+ clients" },
              { icon: Globe, text: "Livraison Canada" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/20 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}; 