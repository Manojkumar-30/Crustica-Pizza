import { motion } from "framer-motion";
import { ORDER_PLATFORMS } from "./OrderModal";

export const OrderSection = () => {
  return (
    <section className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-accent-green">
      <div className="bg-primary-green py-4 sm:py-6 flex overflow-hidden whitespace-nowrap z-50 absolute top-0 left-0 right-0">
        <div className="flex animate-marquee-fast gap-16 sm:gap-24 lg:gap-32 font-display font-medium text-white/20 text-[10px] sm:text-xs tracking-[1em] uppercase">
          {Array(20).fill("PURE VEGETARIAN • SLOW CRAFTED • ARTISAN SOURDOUGH").map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center mt-12 sm:mt-16 relative z-10 text-primary-green">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary-green/40 font-mono uppercase tracking-[0.4em] block mb-8 text-[10px] sm:text-xs font-black italic"
        >
          Delivery Sanctuary
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-primary-green tracking-tightest leading-[0.85] mb-12 sm:mb-20 uppercase italic"
        >
          Fresh. <br className="sm:hidden" /> Natural. <br /> <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Crafted for You.</span>
        </motion.h2>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 items-stretch sm:items-center">
          {ORDER_PLATFORMS.map((plat) => (
            <motion.a
              key={plat.name}
              href={plat.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 sm:px-14 py-6 sm:py-8 ${plat.color} text-white rounded-[2rem] font-black tracking-[0.25em] shadow-2xl flex items-center justify-center gap-4 transition-all duration-500 text-xs sm:text-sm font-mono`}
            >
              <plat.icon size={20} />
              {plat.name.toUpperCase()}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
