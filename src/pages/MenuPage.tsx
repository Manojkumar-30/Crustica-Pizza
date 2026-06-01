import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChefHat, Flame, Leaf } from "lucide-react";
import { menuData, addOns } from "../data/menu";
import { OrderModal, ORDER_PLATFORMS } from "../components/OrderModal";

export const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [pizzaSizes, setPizzaSizes] = useState<Record<string, "reg" | "lg">>({});
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredMenuData = useMemo(() => {
    if (!searchQuery.trim()) return menuData;
    const query = searchQuery.toLowerCase().trim();
    return menuData
      .map((category) => {
        const items = category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query)) ||
            (item.tag && item.tag.toLowerCase().includes(query))
        );
        return { ...category, items };
      })
      .filter((category) => category.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="bg-primary-green min-h-screen selection:bg-accent-green selection:text-primary-green">
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      {/* Menu Header */}
      <div className="relative pt-32 sm:pt-40 pb-20 sm:pb-10 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(174,219,13,0.15),_transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 sm:mb-8 text-[10px] sm:text-[15px] font-black"
          >
            Curated with conscience
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-4xl lg:text-[6vw] font-display font-black text-white mb-8 sm:mb-10 tracking-tightest leading-[0.85] uppercase italic"
          >
            The <span className="text-accent-green font-light lowercase">Sourdough</span> Lineup.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-white text-base sm:text-lg lg:text-base font-medium max-w-2xl leading-relaxed tracking-tight"
          >
            Explore our artisan 100% vegetarian menu, featuring 24h slow-fermented crusts and garden-fresh specials.
          </motion.p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="relative z-40 bg-black/60 backdrop-blur-3xl border-y border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

          {/* Top Row */}
          <div className="flex items-center justify-between gap-4 mb-5">

            {/* Search */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 rounded-full bg-white/5 border border-white/10 pl-12 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent-green transition-all duration-300"
              />

              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Desktop Arrows */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => {
                  document.getElementById("category-scroll")?.scrollBy({
                    left: -300,
                    behavior: "smooth",
                  });
                }}
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  document.getElementById("category-scroll")?.scrollBy({
                    left: 300,
                    behavior: "smooth",
                  });
                }}
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-accent-green hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Categories */}
          <div
            id="category-scroll"
            className="flex items-center gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {filteredMenuData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);

                  const el = document.getElementById(cat.id);

                  if (el) {
                    const offset = 180;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`flex-shrink-0 px-8 py-4 rounded-full font-display font-black text-[12px] uppercase tracking-wider transition-all duration-500 border whitespace-nowrap ${activeCategory === cat.id
                  ? "bg-accent-green text-black border-accent-green shadow-[0_0_30px_rgba(174,219,13,0.3)]"
                  : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Mobile Bottom Scroll Hint */}
          <div className="md:hidden flex items-center justify-center mt-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/30">
              <span>Swipe for more</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-20 sm:pt-10">
        {/* Featured Menu Items */}
        {filteredMenuData.map((category) => (
          <div key={category.id} id={category.id} className="mb-24 sm:mb-40 last:mb-0 scroll-mt-48 sm:scroll-mt-64">
            <div className="flex items-center gap-6 sm:gap-10 mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-display font-black text-white tracking-tightests uppercase italic">{category.name}</h2>
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-accent-green/40 to-transparent my-10" />
            </div>
              
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
              {category.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (idx % 3) * 0.1 }}
                  className="group relative flex flex-col bg-gradient-to-br from-[#0b1408]/90 via-black/80 to-[#11210d]/90 backdrop-blur-2xl border border-[#aedb0d]/10 rounded-[32px] p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#aedb0d]/30 hover:bg-[#0f1d0c]/90 hover:shadow-[0_30px_80px_rgba(174,219,13,0.12)]"                
                >
                  {/* Info Section */}
                  <div className="flex-1 flex flex-col h-full">
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white italic tracking-tightest uppercase mb-4 group-hover:text-accent-green transition-colors leading-[0.9]">
                      {item.name}
                    </h3>

                    <p className="text-sm text-white/40 font-medium leading-relaxed mb-8 flex-1">
                      {item.description || ""}
                    </p>

                    {/* Size Selector */}
                    {typeof item.price === "object" && 'reg' in item.price && (
                      <div className="flex items-center bg-white/5 p-1 rounded-xl mb-6">
                        <button
                          onClick={() => setPizzaSizes(prev => ({ ...prev, [item.name]: "reg" }))}
                          className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest ${(pizzaSizes[item.name] || "reg") === "reg" ? "bg-accent-green text-primary-green shadow-lg" : "text-white/40 hover:text-white"
                            }`}
                        >
                          8"
                        </button>
                        <button
                          onClick={() => setPizzaSizes(prev => ({ ...prev, [item.name]: "lg" }))}
                          className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest ${pizzaSizes[item.name] === "lg" ? "bg-accent-green text-primary-green shadow-lg" : "text-white/40 hover:text-white"
                            }`}
                        >
                          12"
                        </button>
                      </div>
                    )}
                    {/* Price & Action */}
                    <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[12px] text-white/200 uppercase tracking-[0.06em] font-black mb-1">
                          {typeof item.price === "object" ? "Selected Price" : "Price"}
                        </span>
                        <div className="text-4xl font-display font-black text-accent-green tracking-tightest italic">
                          <span className="text-lg mr-2">₹</span>
                          {typeof item.price === "number" ? item.price : (pizzaSizes[item.name] === "lg" ? item.price.lg : item.price.reg)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Badge */}
                  {item.tag && (
                    <div className="absolute bottom-9 right-4">
                      <span className="flex items-center gap-2 px-4 py-2 border-yellow-400 border-2 text-yellow-400 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {item.tag === "Chef's Special" && <ChefHat size={12} />}
                        {item.tag === "Spicy" && <Flame size={12} />}
                        {item.tag === "Vegan" && <Leaf size={12} />}
                        {item.tag}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>           
          </div>
        ))}

        {filteredMenuData.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl text-white/60 font-display font-black uppercase tracking-widest">No items found matching your query</h3>
          </div>
        )}

        {/* Dynamic Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black border border-white/5 p-10 sm:p-16 lg:p-10 rounded-[3rem] sm:rounded-[4rem] mb-24 sm:mb-40 relative overflow-hidden group shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-accent-green/10 rounded-full blur-[120px] sm:blur-[180px] -mr-32 -mt-32 transition-colors group-hover:bg-accent-green/20" />
          <div className="relative z-10">
            <span className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 sm:mb-8 text-[12px] sm:text-[16px] font-black italic">The Extras</span>
            <h3 className="text-4xl sm:text-4xl lg:text-[4vw] font-display font-black text-white mb-16 sm:mb-24 tracking-tightest uppercase italic">Enhance the <span className="text-accent-green font-light lowercase">Experience.</span></h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-20">
              {addOns.map((addon) => (
                <div key={addon.name} className="flex justify-between items-center bg-white/[0.03] p-10 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 hover:border-accent-green/20 transition-all duration-500 group/addon">
                  <div>
                    <span className="font-display font-black text-2xl sm:text-3xl text-white block mb-2 sm:mb-3">{addon.name}</span>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest font-black italic">Artisan Addition</span>
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-accent-green tracking-tightest italic">₹{addon.price}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-10">
              <span className="text-white/200 font-mono uppercase tracking-[0.2em] block mb-6 text-center text-[16px] font-black">Order via Platforms</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {ORDER_PLATFORMS.map((plat) => (
                  <button
                    key={plat.name}
                    onClick={() => setIsOrderModalOpen(true)}
                    className={`px-10 sm:px-14 py-6 sm:py-8 ${plat.color} text-white rounded-[2rem] font-black tracking-[0.25em] shadow-3xl hover:scale-105 active:scale-95 transition-all duration-500 flex items-center justify-center gap-4 text-xs sm:text-sm font-mono`}
                  >
                    <plat.icon size={18} /> {plat.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
