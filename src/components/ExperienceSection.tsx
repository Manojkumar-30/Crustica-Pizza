import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import MainEntire from "../Assets/main_entire.jpg";
import Interior2 from "../Assets/interior-3.jpg";
import Interior from "../Assets/interior.jpg";
import Billing from "../Assets/Billing.jpg";

export const ExperienceSection = () => {
  const reviews = [
    { name: "Rahul S.", review: "Best sourdough pizza in Bangalore. Super fresh and light!", source: "Google Maps", rating: 4 },
    { name: "Sneha R.", review: "Namma Ooru's pride! The Peri Peri fries are addictive.", source: "Instagram", rating: 5 },
  ];

  const gallery = [
    MainEntire,
    Interior2,
    Interior,
    Billing
  ];

  return (
    <section id="experience" className=" px-4 sm:px-6 md:px-8 bg-primary-green relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 lg:gap-32 items-center">
        {/* Left: Visuals */}
        <div className="order-1 lg:order-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-12">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05, y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
                className={`rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl relative ${i % 2 === 0 ? 'mt-8 sm:mt-12' : ''}`}
              >
                <img src={img} alt="Restaurant interior" className="w-full h-full object-cover aspect-square" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Reviews */}
        <div className="order-1 lg:order-2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent-green font-mono uppercase block text-[18px] sm:text-xl font-black tracking-tightest mb-4 sm:mb-6"
          >
            Proof in every bite
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl lg:text-[6vw] font-display font-black text-white leading-[1] mb-8 sm:mb-12 tracking-tightest uppercase italic"
          >
            Experience <br /><span className="text-accent-green italic font-light lowercase">the Vibe.</span>
          </motion.h2>
          <p className="text-white/50 text-base sm:text-lg mb-8 sm:mb-12 max-w-lg font-medium text-sm leading-relaxed tracking-tight">
            From our long-fermented dough to our botanical-inspired interiors, discover why we are Bangalore's favorite 100% vegetarian sanctuary.
          </p>

          <div className="flex overflow-x-auto lg:flex-col lg:overflow-visible gap-6 scrollbar-hide pb-8 lg:pb-0 snap-x">
            {reviews.map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-[280px] sm:min-w-[250px] lg:min-w-0 bg-white/[0.03] rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 border border-white/10 group hover:border-accent-green/30 transition-all duration-500 snap-center"
              >
                <div className="flex gap-1 mb-6 text-accent-green">
                  {Array(rev.rating).fill(0).map((_, idx) => (
                    <span key={idx} className="text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-lg sm:text-xl font-display font-medium leading-relaxed mb-8 italic">"{rev.review}"</p>
                <div className="flex justify-between items-center whitespace-nowrap">
                  <span className="font-black text-accent-green text-[10px] sm:text-xs uppercase tracking-widest">— {rev.name}</span>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest font-black">{rev.source}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
