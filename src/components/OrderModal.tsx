import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, Zap, Star, ArrowUpRight } from "lucide-react";
import logoSwiggy from "../Assets/Swiggy-Logo.png";

export const ORDER_PLATFORMS = [
  {
    name: "Zomato",
    url: "https://www.zomato.com/bangalore/crustica-pizza-banaswadi-bangalore/order",
    color: "bg-[#CB202D]",
    desc: "Instant delivery",
    icon: Utensils
  },
  {
    name: "Swiggy",
    url: "https://www.swiggy.com/city/bangalore/crustica-pizzeria-kammanahalli/kalyan-nagar-kammanahalli-rest1302425",
    color: "bg-[#FC8019]",
    desc: "Fast service",
    icon: Zap
  },
  {
    name: "Magicpin",
    url: "https://magicpin.in/walletRecharge?merchantId=57637832",
    color: "bg-[#6533FF]",
    desc: "Exclusive savings",
    icon: Star,
    img: logoSwiggy
  }
];

export const OrderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
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
              className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="relative z-10">
              <span className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 text-[10px] font-black italic">Instant Order</span>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-10 tracking-tightest uppercase italic">Select <br /> <span className="text-accent-green font-light lowercase">Platform.</span></h2>

              <div className="space-y-4">
                {ORDER_PLATFORMS.map((plat) => (
                  <motion.a
                    key={plat.name}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-6 rounded-2xl ${plat.color} text-white group shadow-xl`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <plat.icon size={22} />
                      </div>
                      <div>
                        <p className="font-black uppercase tracking-widest text-sm">{plat.name}</p>
                        <p className="text-[10px] opacity-60 uppercase tracking-widest font-mono mt-1">{plat.desc}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>

            <p className="mt-12 text-center text-white/10 font-mono text-[9px] uppercase tracking-[0.4em] font-black">
              Crafted with sourdough love • © 2026
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
