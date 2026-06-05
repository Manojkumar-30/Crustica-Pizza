import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import components
import LogoImage from "../src/assets/crustica-logo-love.png";
import { KineticCursor } from "./components/KineticCursor";
import { ScrollToTop } from "./components/ScrollToTop";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Import pages
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "circIn" }}
            className="fixed inset-0 z-[1000] bg-[#46a738] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 _transparent_70%)]" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="flex flex-col items-center gap-10 relative z-10"
            >
              <div className="shrink-0">
                <img src={LogoImage} alt="Crustica Logo" className="h-20 sm:h-24 lg:h-26 w-auto object-contain scale-110 " />
              </div>
              <div className="text-center">
                <h2 className="font-mono font-bold text-lg sm:text-3xl text-black/90 tracking-tightest uppercase mb-6 pt-4">PREPARING THE OVEN...</h2>
                <div className="w-24 h-2 bg-accent-green mx-auto rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative selection:bg-accent-green selection:text-primary-green antialiased"
          >
            {/* Custom Kinetic Cursor */}
            <KineticCursor />

            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
            </Routes>
            <Footer />

            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 30s linear infinite;
              }
              .animate-marquee-fast {
                animation: marquee 20s linear infinite;
              }
              html {
                scroll-behavior: smooth;
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .glass-fresh {
                backdrop-filter: blur(16px) saturate(180%);
                background-color: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
