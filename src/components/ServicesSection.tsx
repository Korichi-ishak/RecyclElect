import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Recycle,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export const ServicesSection = () => {
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
            Des services <span className="text-gradient font-neon">pensés pour vous</span>
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
  );
}; 