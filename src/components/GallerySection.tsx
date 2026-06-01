import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import interior from "../Assets/Influencer-1.png";

export const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-primary-green overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 lg:mb-32 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 text-[10px] sm:text-xs font-black italic">Visual Chronicle</span>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-black text-white leading-[0.85] tracking-tightest uppercase italic">The Piece <br /> <span className="text-accent-green font-light lowercase">of Art.</span></h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white font-black px-10 py-5 rounded-[2rem] border border-white/10 hover:bg-white hover:text-primary-green transition-all duration-700 text-[10px] uppercase font-mono tracking-[0.3em] italic"
          >
            Explore feed
          </motion.button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {[
            interior,
            "https://images.unsplash.com/photo-1620374645310-f9d97e733268?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, zIndex: 10, rotate: i % 2 === 0 ? 1 : -1 }}
              className="aspect-[4/5] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden cursor-pointer relative shadow-2xl group"
            >
              <img src={src} loading="lazy" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={`Gallery ${i}`} />
              <div className="absolute inset-0 bg-primary-green/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <a href="https://www.instagram.com/crustica_pizza/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="text-white w-8 h-8 sm:w-10 sm:h-10 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
