import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf, ChefHat } from "lucide-react";

export const ProcessSection = () => {
  return (
    <section className="py-16 sm:py-16 lg:py-16 px-6 sm:px-8 md:px-10 bg-primary-green relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent-green font-mono uppercase block text-[18px] sm:text-xl font-black tracking-tightest mb-4 sm:mb-6"
          >
            More Than Just Pizza
          </motion.span>
          <h2 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-display font-black text-white tracking-tightest leading-[0.8] uppercase">
            Your Space for <br /><span className="text-accent-green italic font-light lowercase">Good times</span>
          </h2>
        </div>
        <div className="py-10 sm:py-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-12 sm:gap-16">
          {[
            { step: "1", title: "Perfect for Family & Friends", icon: UtensilsCrossed, desc: "Gather your loved ones for a memorable dining experience. Our cozy seating arrangements make every meal feel like a celebration." },
            { step: "2", title: "Team Meeting Space", icon: Leaf, desc: "Host your next team meeting in a relaxed and inspiring atmosphere. With ample space and refreshing options, it’s the perfect setting for collaboration." },
            { step: "3", title: "Birthday Party Hosting", icon: ChefHat, desc: "Celebrate your special day with a slice of happiness! We offer dedicated party spaces and customizable menus to make your birthday unforgettable." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative p-10 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] bg-white/[0.03] border border-white/10 group hover:border-accent-green/30 transition-all duration-500 overflow-hidden text-center lg:text-left shadow-2xl lg:hover:-translate-y-4"
            >
              <span className="absolute -top-12 -right-6 text-[10rem] sm:text-[12rem] font-display font-black text-white/[0.03] group-hover:text-accent-green/[0.08] transition-all duration-1000 pointer-events-none tracking-tighter">{item.step}</span>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[2.2rem] bg-accent-green/5 flex items-center justify-center mb-10 mx-auto lg:mx-0 border border-white/5 group-hover:bg-accent-green transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(174,219,13,0.3)]">
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-accent-green group-hover:text-primary-green transition-colors duration-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-4 sm:mb-6 tracking-tightest group-hover:text-accent-green transition-colors uppercase italic">{item.title}</h3>
              <p className="text-white/40 text-sm sm:text-base leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
