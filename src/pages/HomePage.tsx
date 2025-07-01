import {
  featuredProducts,
  testimonials,
  companyInfo,
} from "../data/mockData";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  Laptop,
  ShieldCheck,
  ShoppingCart,
  Recycle,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Globe,
  Smartphone,
  Tablet,
  Headphones,
  Mail
} from "lucide-react";

export const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleNextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const toggleVideoPlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  }, []);

  const statsData = [
    { value: "2500+", label: "Équipements reconditionnés", icon: Laptop, color: "from-primary-500 to-primary-600" },
    { value: "98%", label: "Satisfaction client", icon: Award, color: "from-secondary-500 to-secondary-600" },
    { value: "24h", label: "Temps de réponse moyen", icon: Clock, color: "from-accent-500 to-accent-600" },
    { value: "5 ans", label: "D'expérience", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
  ];

  const servicesData = [
    {
      icon: ShoppingCart,
      title: "Marketplace Premium",
      description: "Des ordinateurs portables et pièces détachées reconditionnés avec garantie étendue",
      features: ["Garantie 2 ans", "Livraison gratuite", "Support 24/7"],
      color: "from-primary-500 to-sky-500",
      link: "/j-achete"
    },
    {
      icon: Recycle,
      title: "Rachat Intelligent",
      description: "Vendez vos équipements avec une évaluation IA instantanée et transparente",
      features: ["Évaluation IA", "Prix compétitifs", "Enlèvement gratuit"],
      color: "from-secondary-500 to-green-500",
      link: "/vendre"
    },
    {
      icon: Sparkles,
      title: "Reconditionnement Pro",
      description: "Processus certifié ISO pour donner une seconde vie à vos appareils",
      features: ["Certification ISO", "Tests complets", "Nettoyage professionnel"],
      color: "from-accent-500 to-yellow-500",
      link: "/nous-contacter"
    }
  ];

  const productsCategories = [
    { icon: Laptop, name: "Ordinateurs", count: "150+", color: "text-primary-400" },
    { icon: Smartphone, name: "Smartphones", count: "80+", color: "text-secondary-400" },
    { icon: Tablet, name: "Tablettes", count: "45+", color: "text-accent-400" },
    { icon: Headphones, name: "Audio", count: "200+", color: "text-purple-400" },
  ];

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
    <div className="bg-neutral-900 text-white">
      {/* Hero Section */}
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
              <Sparkles className="w-5 h-5 text-accent-400" />
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
              <span className="text-gradient">
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

      {/* Stats Section */}
      <section className="py-20 bg-neutral-950 relative">
        <div className="absolute inset-0 bg-neutral-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-dark p-6 rounded-3xl flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-sm md:text-base text-white/70 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Des services <span className="text-gradient">pensés pour vous</span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
              Que vous cherchiez à acheter, vendre ou simplement en savoir plus, nous avons ce qu'il vous faut.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`glass-dark rounded-3xl p-8 flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/70 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={service.link} className="mt-auto btn-secondary text-center">
                  En savoir plus
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-dark rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src={companyInfo.videoUrl}
                poster={companyInfo.videoPoster}
                className="w-full h-full object-cover"
                loop
                playsInline
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer group"
                onClick={toggleVideoPlay}
              >
                <AnimatePresence>
                  {!isVideoPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    >
                      <Play className="w-12 h-12 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Nos <span className="text-gradient">pépites du moment</span>
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
                className="glass-dark rounded-3xl overflow-hidden group border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold truncate">{product.name}</h3>
                  <p className="text-white/60 mt-1">{product.specs}</p>
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
            <Link to="/j-achete" className="btn-primary">
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Ce que nos <span className="text-gradient">clients disent</span>
            </h2>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 flex items-center justify-between">
              <button onClick={handlePrevTestimonial} className="btn-icon z-10">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNextTestimonial} className="btn-icon z-10">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="glass-dark rounded-3xl p-8 md:p-12 border border-white/10"
              >
                <div className="flex items-center mb-6">
                  <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} className="w-16 h-16 rounded-full mr-6 border-2 border-primary-400" />
                  <div>
                    <p className="text-xl font-bold">{testimonials[currentTestimonial].name}</p>
                    <p className="text-white/60">{testimonials[currentTestimonial].title}</p>
                  </div>
                </div>
                <p className="text-lg italic text-white/80 mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400' : 'text-white/30'}`}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Pour tous les <span className="text-gradient">besoins</span>
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

      {/* Call to action */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-cyber rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900/50" />
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Prêt à rejoindre la révolution tech ?
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
                Donnez une seconde vie à vos appareils ou trouvez la perle rare reconditionnée.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/vendre" className="btn-primary">
                  Vendre mon appareil
                </Link>
                <Link to="/j-achete" className="btn-secondary">
                  Acheter un appareil
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-display font-bold mb-4">
              Restez informé des <span className="text-gradient">nouveautés</span>
            </h3>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Recevez en avant-première nos meilleures offres et actualités tech
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-primary-400 transition-colors"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-primary px-6 py-4 text-white font-semibold rounded-2xl"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 