import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Le service client est exceptionnel, toujours à l'écoute et réactif.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&q=80",
    name: "Sophie Martin",
    role: "Responsable Achats",
  },
  {
    text: "Des produits reconditionnés de qualité, livrés rapidement.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&q=80",
    name: "Lucas Dubois",
    role: "Chef de Projet",
  },
  {
    text: "J'ai économisé beaucoup grâce à leur marketplace premium.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&q=80",
    name: "Emma Leroy",
    role: "Entrepreneuse",
  },
  {
    text: "Leur processus de reconditionnement est vraiment professionnel.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&q=80",
    name: "Hugo Bernard",
    role: "Consultant IT",
  },
  {
    text: "Livraison rapide et matériel conforme à la description.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&q=80",
    name: "Chloé Petit",
    role: "Freelance",
  },
  {
    text: "Leur équipe a su répondre à toutes mes questions.",
    image: "https://images.unsplash.com/photo-1519340333755-c190485c36e1?auto=format&fit=facearea&w=256&q=80",
    name: "Antoine Lefevre",
    role: "Directeur Marketing",
  },
  {
    text: "Je recommande vivement pour tout achat tech reconditionné.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80",
    name: "Camille Moreau",
    role: "Étudiante",
  },
  {
    text: "Un site fiable et des prix imbattables.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&q=80",
    name: "Julien Girard",
    role: "Auto-entrepreneur",
  },
  {
    text: "Leur support après-vente est très efficace.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&q=80",
    name: "Sarah Fontaine",
    role: "Responsable RH",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const TestimonialsSection = () => {
  return (
    <section className="bg-neutral-950 py-24 my-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-primary-400 py-1 px-4 rounded-lg text-primary-400 bg-neutral-900/60">Témoignages</div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5 text-white">
            Ce que nos <span className="text-gradient font-neon">clients disent</span>
          </h2>
          <p className="text-center mt-5 opacity-75 text-white/80">
            Découvrez les avis de nos clients satisfaits.
          </p>
        </motion.div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}; 