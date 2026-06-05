import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { OrderModal } from "./OrderModal";
import heroImage from "../Assets/Hero_Pizza (1) - Copy.png";
import heroImage2 from "../Assets/Hero_Pizza (1).png";


export const Hero = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const pizzaY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const pizzaRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#3fac3c] selection:bg-accent-green py-24 sm:py-32 lg:py-0">
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      {/* Hyper-Dimensional Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_10%,_rgba(118,255,3,0.12),_transparent_200%)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#3fac3c] via-[#357a26] to-[#aedb0d] opacity-70" />

        {/* Neon Blobs */}
        <motion.div
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-green/10 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary-green/20 blur-[180px] rounded-full"
        />

        {/* Grain Texture */}
        {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />*/}

        {/* <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }} />*/}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 sm:gap-20">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ opacity: textOpacity }}
          className="text-left w-full"
        >
          <motion.div variants={itemVariants} className="mb-4 pt-5 font-mono text-[14px] sm:text-lg font-bold text-white/90 uppercase tracking-[0.0.5em] drop-shadow-[0_0_100px_#76ff03]">
            Bangalore's Finest Sourdough 🍕✨
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[clamp(3rem,10vw,6.5rem)] font-display font-black text-white leading-[0.82] tracking-tightest uppercase mb-8 sm:mb-10"
          >
            Pure. <br />
            <span className="text-accent-green drop-shadow-[0_0_30px_rgba(118,255,3,0.4)]">Artesanal</span> <br />
            <span className="font-light italic opacity-90 lowercase tracking-tighter">Sourdough.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-white/60 text-base sm:text-lg lg:text-xl font-medium leading-relaxed tracking-tight mb-10 sm:mb-12"
          >
            Handcrafted sourdough pizzas made with love, fresh local ingredients, and a whole lot of Bangalore spirit.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="px-8 sm:px-12 py-4 cursor-pointer sm:py-6 rounded-2xl sm:rounded-[2rem] bg-accent-green text-black font-black tracking-widest text-xs sm:text-sm shadow-[0_20px_50px_rgba(118,255,3,0.3)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-500"
            >
              ORDER NOW
            </button>
            <Link to="/menu" className="w-full sm:w-auto">
              <button className="w-full px-8 sm:px-12 py-4 cursor-pointer sm:py-6 rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl text-white font-bold tracking-widest text-xs sm:text-sm hover:border-accent-green hover:bg-black hover:scale-105 hover:text-accent-green transition-all duration-500">
                EXPLORE MENU
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Product Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ y: pizzaY, rotateZ: pizzaRotate }}
          className="relative flex justify-center items-center py-12 lg:py-0"
        >
          <div className="relative w-full max-w-[350px] sm:max-w-[460px] lg:max-w-[560px] aspect-square">
            <div className="absolute inset-0 bg-accent-green/20 blur-[100px] sm:blur-[150px] rounded-full scale-110 opacity-0" />

            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full rounded-full overflow-hidden shadow-[0_60px_90px_rgba(0,0,0,0.5)] border-[8px] sm:border-[8px] border-white/5 bg-white/10"
            >
              <img
                src={heroImage2}
                alt="Premium Pizza"
                className="w-full h-full object-cover scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/20 pointer-events-none" />
            </motion.div>

            {/* Float tags */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-15, -12, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 sm:-top-8 sm:-right-1 bg-accent-green text-primary-green px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-[9px] sm:text-[10px] tracking-widest shadow-2xl z-40"
            >
              100% Pure Veg.
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-15, -12, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeIn" }}
              className="absolute sm:-bottom-1 bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-[9px] sm:text-[10px] tracking-widest shadow-2xl z-40"
            >
              Local Love.
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Marquee Footer */}
      <div className="absolute bottom-0 left-0 right-0 py-8 sm:py-12 border-t border-white/5 bg-primary-green/60 backdrop-blur-3xl overflow-hidden z-20">
        <div className="flex animate-marquee-fast whitespace-nowrap gap-24 sm:gap-48">
          {Array(8).fill("100% PURE VEG • SLOW FERMENTED • ARTISAN CRUST • NAMMA OORU").map((text, i) => (
            <span key={i} className="text-xl sm:text-xl font-display font-normal text-white/60 tracking-[0.3em] sm:tracking-[0.5em] uppercase transition-colors pointer-events-none">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
