import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import combosImage from "../Assets/combo.webp";
import MenuImage from "../Assets/menu-pizza.webp";
import drinksImage from "../Assets/Drinks.webp";
import combosImage2 from "../Assets/Combos.webp";


const categories = [
  {
    name: "Signature Pizza",
    subtitle: "Hand-Stretched",
    viaGradient: "via-black/30",
    img: combosImage,
    span: "lg:col-span-2",
  },
  {
    name: "Sourdough Crusts",
    subtitle: "Ancient Grains",
    viaGradient: "via-black/20",
    img: MenuImage,
    span: "lg:col-span-1",
  },
  {
    name: "Drinks & Tiramisu",
    subtitle: "Small Plates",
    viaGradient: "via-black/20",
    img: drinksImage,
    span: "lg:col-span-1",
  },
  {
    name: "Combos & Specials",
    subtitle: "Curated Pairings",
    viaGradient: "via-black/20",
    img: combosImage2,
    span: "lg:col-span-2",
  },
];

export const MenuSection = () => {
  return (
    <section id="menu" className="py-10 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-gradient-to-tr from-[#3fac3c] via-[#357a26] to-[#3fac3c] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-accent-green/5 blur-[150px] rounded-full -mr-[30vw] -mt-[30vw] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-8">
          <div>
            <motion.span
              initial={{ opacity: 0, letterSpacing: "1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
              className="text-accent-green font-mono uppercase block text-[18px] sm:text-xl font-black tracking-tightest mb-4 sm:mb-6"
            >
              Menu
            </motion.span>
            <h2 className="text-7xl sm:text-7xl lg:text-[8rem] font-display font-black text-white tracking-tightest leading-[0.8] uppercase">
              THE LINEUP
            </h2>

            <div className="flex flex-wrap gap-6 mt-4 ">
              <span className="text-accent-green font-mono uppercase block  text-[18px] sm:text-xl font-black">
                40+ Menu Items -
              </span>
              <span className="text-accent-green font-mono uppercase block  text-[18px] sm:text-xl font-black">
                100% Veg -
              </span>
              <span className="text-accent-green font-mono uppercase block text-[18px] sm:text-xl font-black">
                24H Fermented Dough -
              </span>
            </div>
          </div>
          <p className="max-w-md text-white/90 italic text-sm leading-relaxed mt-10">
            Crafted with seasonal heritage grains and garden produce sourced from local regenerative farms.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-14">
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
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 ${cat.viaGradient} to-transparent`} />

              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-[11px] uppercase tracking-[0.25em] text-accent-green font-bold">
                  {cat.subtitle}
                </span>
                <h3 className="text-white text-3xl md:text-5xl font-black mt-2">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="flex justify-center mt-12">
          <Link
            to="/menu"
            className="
              inline-flex
              items-center
              gap-4
              px-8
              py-5
              rounded-full
              bg-accent-green
              text-black
              font-bold
              hover:scale-105
              transition-all
            "
          >
            Explore All 40+ Items
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};
