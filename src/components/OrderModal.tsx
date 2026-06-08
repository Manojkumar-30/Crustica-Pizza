import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, Zap, Star, ArrowUpRight } from "lucide-react";
import logoSwiggy from "../Assets/swiggy.webp";
import logoZomato from "../Assets/zomato.webp";
import logoDistrict from "../Assets/district.webp";

export const ORDER_PLATFORMS = [
  {
    name: "Zomato",
    url: "https://www.zomato.com/bangalore/crustica-pizza-banaswadi-bangalore/order",
    color: "bg-accent-green",
    desc: "Instant delivery",
    icon: Utensils,
    img: logoZomato
  },
  {
    name: "Swiggy",
    url: "https://www.swiggy.com/city/bangalore/crustica-pizzeria-kammanahalli-kalyan-nagar-rest1302425",
    color: "bg-accent-green",
    desc: "Fast service",
    icon: Zap,
    img: logoSwiggy
  },
  {
    name: "district",
    url: "https://www.district.in/dining/bangalore/crustica-pizza-kalyan-nagar-bangalore",
    color: "bg-accent-green",
    desc: "Exclusive savings",
    icon: Star,
    img: logoDistrict
  }
];

export const OrderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 overflow-hidden ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl "
          />
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-lg bg-[#0D1A07] border border-white/10 rounded-[3rem] p-10 sm:p-14 shadow-3xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-green/10 blur-3xl rounded-full -mr-20 -mt-20" />

            <button
              onClick={onClose}
              className="absolute cursor-pointer top-12 right-8 text-black/90 hover:bg-black/40 hover:text-accent-green transition-colors rounded-full bg-white backdrop-blur-lg p-0.5"
            >
              <X size={45} />
            </button>

            <div className="relative z-10">
              <span className="text-accent-green font-display uppercase text-center tracking-[0.05em] block mb-6 text-[18px] font-black ">Instant Order</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-10 tracking-tightest uppercase italic">Select <br /><span className="text-accent-green text-6xl italic font-bold">Platform.</span></h2>

              <div className="space-y-4  ">
                {ORDER_PLATFORMS.map((plat) => (
                  <motion.a
                    key={plat.name}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-6 rounded-2xl ${plat.color} text-white group shadow-xl hover:bg-white/90 hover:text-black bg-primary-green transition-all duration-300 `}
                  >
                    <div className="flex items-center gap-4">
                      <div
                          className="
                            w-22
                            h-24      
                            group-hover:scale-120
                            transition-all
                            duration-300
                          "
                        >
                          <img
                            src={plat.img}
                            alt={plat.name}
                            className="
                              w-full
                              h-full
                              object-contain
                            "
                          />
                        </div>
                        
                      <div>
                        <p className="font-semibold uppercase text-lg font-mono tracking-wider">{plat.name}</p>
                        <p className="text-[12px] font-display text-black font-bold">{plat.desc}</p>
                      </div>
                    </div>
                    <ArrowUpRight className=" size-10 p-2  rounded-full group-hover:opacity-140 transition-opacity rounded-full bg-black/90 " />
                  </motion.a>
                ))}
              </div>
            </div>

            <p className="mt-9 text-center text-white/90 text-[12px]">
              Crafted with sourdough love • © 2026
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
