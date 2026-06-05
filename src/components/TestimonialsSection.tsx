import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export const TestimonialsSection = () => {
  const reviews = [
    { name: "Rahul S.", review: "The sourdough crust is exceptional. Airy, flavorful, and light. A true artisan experience.", label: "Top Critic" },
    { name: "Priya V.", review: "Fell in love with the the confit tomato base. Pure vegetarian haven in Bangalore.", label: "Verified Foodie" },
    { name: "Anish G.", review: "The 24h slow-fermentation quality is something you can actually taste. Perfection.", label: "Dough Master" }
  ];

  return (
    <section className="py-12 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 #aedb0d">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-24 md:mb-32">
          <p className="text-accent-green font-mono uppercase block text-[18px] sm:text-xl font-black tracking-tightest">Trusted by the local soul</p>
          <h2 className="text-4xl sm:text-6xl lg:text-[6vw] font-display font-medium text-white tracking-tightest mb-2 uppercase italic">Heartfelt <span className="text-accent-green font-light">Words.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {reviews.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] bg-white/[0.03] border border-white/10 relative group hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="mb-6 text-accent-green flex items-center gap-2">
                <Leaf size={14} />
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">{item.label}</span>
              </div>
              <p className="text-xl sm:text-2xl font-display font-medium leading-relaxed mb-10 text-white tracking-tight group-hover:text-accent-green transition-colors duration-500">"{item.review}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:bg-accent-green transition-all duration-500">
                  <Leaf className="w-6 h-6 text-accent-green group-hover:text-primary-green transition-colors duration-500" />
                </div>
                <div>
                  <span className="font-bold text-lg text-white tracking-tight block">{item.name}</span>
                  <span className="text-[10px] text-accent-green font-mono uppercase tracking-[0.2em] font-black">Bangalore, IN</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
