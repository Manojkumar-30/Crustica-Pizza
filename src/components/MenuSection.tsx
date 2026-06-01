import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import combosImage from "../Assets/combos.jpg";

export const MenuSection = () => {
  const categories = [
    { name: "Artisan Sourdough", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800", color: "from-primary-green/80", span: "lg:col-span-2" },
    { name: "Fresh Harvest", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800", color: "from-accent-green/80", span: "lg:col-span-1" },
    { name: "Botanical Specials", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", color: "from-light-green/80", span: "lg:col-span-1" },
    { name: "Signature Panini", img: combosImage, color: "from-primary-green/40", span: "lg:col-span-2" },
  ];

  return (
    <section id="menu" className="py-10 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-gradient-to-tr from-[#3fac3c] via-[#357a26] to-[#3fac3c] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-accent-green/5 blur-[150px] rounded-full -mr-[30vw] -mt-[30vw] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-20 lg:mb-24 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-6xl sm:text-6xl lg:text-9xl font-display font-medium tracking-tighter text-white mb-6"
            >
              The Lineup
            </motion.h2>
            <p className="text-accent-green font-mono text-[15px] sm:text-md">Every dish is crafted with love, fresh ingredients, and a passion for pure vegetarian excellence.</p>
          </div>
          <Link to="/menu" className="group flex items-center gap-4 text-white font-bold relative pb-2 overflow-hidden">
            <span className="text-xl sm:text-2xl tracking-tight">Full Menu</span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-accent-green group-hover:translate-x-2 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-green/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to="/menu"
              className={`relative aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[500px] rounded-[2rem] sm:rounded-[2.75rem] overflow-hidden group cursor-pointer block ${cat.span}`}
            >
              <img
                src={cat.img}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                alt={cat.name}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60 transition-all duration-700 group-hover:opacity-90 flex flex-col justify-end p-8 sm:p-12`} />
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 z-10 transition-transform duration-700 group-hover:-translate-y-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-4">{cat.name}</h3>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <p className="text-white/70 text-sm sm:text-base font-medium tracking-tight">Browse Selection</p>
                  <ArrowRight className="w-4 h-4 text-accent-green" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
