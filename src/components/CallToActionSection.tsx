import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const CallToActionSection = () => {
  return (
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
              <Link to="/vendre" className="btn-primary group relative inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-2xl">
                Vendre mon appareil
              </Link>
              <Link to="/j-achete" className="btn-secondary group relative inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-2xl">
                Acheter un appareil
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 