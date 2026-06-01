import { motion } from "framer-motion";
import { Leaf, Utensils, ChefHat, MapPin } from "lucide-react";

export const AboutSection = () => {
  const pillars = [
    { icon: Leaf, title: "48h Sourdough", desc: "Long fermentation for deep, nuanced flavor and easy digestion." },
    { icon: Utensils, title: "100% Vegetarian", desc: "A creative playground for the finest botanical ingredients." },
    { icon: ChefHat, title: "Artisan Craft", desc: "Hand-stretched dough and small-batch preparation." },
    { icon: MapPin, title: "Local Bounty", desc: "Partnering with local farmers for the freshest harvest." },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-primary-green relative overflow-hidden">
      {/* Decorative leaf background */}
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        className="absolute -left-20 top-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent-green blur-[80px] sm:blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            className="text-accent-green font-mono uppercase block mb-6 sm:mb-8 text-[18px] sm:text-xl font-black"
          >
            Our Story
          </motion.span>
          <h2 className="text-5xl sm:text-7xl lg:text-[7rem] font-display font-black text-white tracking-tightest leading-[0.8] uppercase">
            Pure Roots. <br /><span className="text-accent-green italic font-light lowercase">Love of Veg Pizza</span>
          </h2>
          <p className="text-white/70 text-md leading-relaxed mt-6 sm:mt-8 md:mt-10 text-center max-w-4xl mx-auto">Crustica Pizza was born to redefine how the world sees vegetarian pizza. We celebrate vegetables as heroes not just toppings. Every pizza is crafted with farm-fresh produce, hand-made crusts, and 100% vegetarian ingredients.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-accent-green/30 transition-all duration-500 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-accent-green/10 flex items-center justify-center mb-6 sm:mb-8 border border-accent-green/20 group-hover:bg-accent-green transition-all duration-500">
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent-green group-hover:text-primary-green transition-colors duration-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 text-white tracking-tight">{item.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
