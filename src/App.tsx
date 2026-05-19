/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


import LogoImage from "./Assets/crustica-logo.png";
import Pizza1 from "./Assets/pizza_1.jpg";
import Cheif from "./Assets/cheif.jpg";
import MainEntire from "./Assets/main_entire.jpg";
import Interior from "./Assets/interior.jpg";
import Fries from "./Assets/fries.jpg";
import Juice from "./Assets/Juice.jpg";
import Billing from "./Assets/Billing.jpg";
import interior from "./Assets/Influencer-1.png";
import logoZomato from "./Assets/zomato-removebg-preview.png";
import logoSwiggy from "./Assets/Swiggy-Logo.png";
import logoMagicpin from "./Assets/magicpin-removebg-preview.png";

import {
  Menu as MenuIcon,
  X,
  Phone,
  MapPin,
  Clock,
  Leaf,
  ArrowRight,
  Info,
  Utensils,
  Camera,
  Coffee,
  Sun,
  Moon,
  Image as GalleryIcon,
  MessageCircle,
  Zap,
  ChefHat,
  UtensilsCrossed,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Mail,
  Star,
  Plus,
  Flame,
  MonitorOff,
  ShoppingBag,
  TrendingUp,
  Award,
  Zap as ZapIcon
} from "lucide-react";
import { menuData, addOns } from "./data/menu";
import { image } from "framer-motion/client";
import { img } from "framer-motion/m";

// --- Components ---

const ORDER_PLATFORMS = [
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

const OrderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Our Story", href: "/#about", isStatic: false },
    { name: "Menu", href: "/menu", isStatic: true },
    { name: "Gallery", href: "/#gallery", isStatic: false },
    { name: "Visit Us", href: "/#contact", isStatic: false },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const id = href.split("#")[1];
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const isNavVisible = !isScrolled || scrollDir === "up" || isMobileMenuOpen;

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
      {/* Mobile Menu Overlay - Outside main nav for perfect positioning */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[120] bg-black/60 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute inset-x-0 top-0 h-screen bg-[#0A1F05]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5 pointer-events-none" />

              <div className="flex flex-col items-center gap-8 relative z-10 w-full text-center">
                {navLinks.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={linkVariants}
                  >
                    {item.isStatic ? (
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-5xl sm:text-6xl font-display font-black text-white hover:text-accent-green transition-all duration-500 tracking-tightest uppercase italic block"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (location.pathname === "/") {
                            e.preventDefault();
                            handleNavClick(item.href);
                          } else {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className="text-5xl sm:text-6xl font-display font-black text-white hover:text-accent-green transition-all duration-500 tracking-tightest uppercase italic block"
                      >
                        {item.name}
                      </a>
                    )}
                  </motion.div>
                ))}

                <motion.div variants={linkVariants} className="w-full h-px bg-white/10 my-4 max-w-[120px]" />

                <motion.button
                  variants={linkVariants}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsOrderModalOpen(true);
                  }}
                  className="w-full max-w-sm py-6 rounded-[2rem] bg-accent-green text-primary-green font-black text-2xl shadow-[0_20px_50px_rgba(118,255,3,0.3)] hover:scale-105 active:scale-95 transition-transform"
                >
                  ORDER NOW
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-700 px-4 sm:px-6 md:px-8 py-4 lg:py-6 ${isScrolled || isMobileMenuOpen
          ? "bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40"
          : "bg-transparent"
          } ${isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: LogoImage */}
          <Link to="/" className="shrink-0 ">
            <img src={LogoImage} alt="Crustica Logo" className="h-10 sm:h-12 lg:h-14 w-auto object-contain scale-110" />
          </Link>


          {/* Center: Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((item) => (
              item.isStatic ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white/80 hover:text-accent-green font-medium text-[11px] tracking-[0.25em] uppercase transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-4 left-1/2 w-0 h-[2px] bg-accent-green transition-all duration-300 group-hover:w-full group-hover:left-0 shadow-[0_0_10px_#76FF03]"></span>
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className="text-white/70 hover:text-accent-green font-medium text-[11px] tracking-[0.25em] uppercase transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-4 left-1/2 w-0 h-[2px] bg-accent-green transition-all duration-300 group-hover:w-full group-hover:left-0 shadow-[0_0_10px_#76FF03]"></span>
                </a>
              )
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-10 shrink-0 relative z-[140]">
            <div className="hidden xl:flex items-center gap-3 text-white/120 text-xs font-mono">
              <Phone className="w-4 h-4 text-accent-green" />
              <span className="tracking-widest">+91 81977 99090</span>
            </div>
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="hidden sm:block px-6 lg:px-10 py-3 lg:py-3.5 rounded-xl bg-accent-green text-primary-green text-xs lg:text-[13px] font-black tracking-widest hover:bg-white transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(118,255,3,0.2)]"
            >
              ORDER NOW
            </button>
            <button
              className="p-3 text-white hover:text-accent-green transition-all duration-500 lg:hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-accent-green/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} strokeWidth={2.5} /> : <MenuIcon size={26} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};


const Hero = () => {
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
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1A07] selection:bg-accent-green py-24 sm:py-32 lg:py-0">

      {/* Hyper-Dimensional Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,_rgba(118,255,3,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1A3A0F] via-[#2D5016] to-[#1A3A0F] opacity-60" />

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
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }} />
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
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8 font-mono text-[10px] sm:text-xs font-black text-accent-green tracking-[0.5em] uppercase">
            Bangalore's Finest Sourdough
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
              className="px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] bg-accent-green text-primary-green font-black tracking-widest text-xs sm:text-sm shadow-[0_20px_50px_rgba(118,255,3,0.3)] hover:scale-105 active:scale-95 transition-all duration-500"
            >
              ORDER NOW
            </button>
            <Link to="/menu" className="w-full sm:w-auto">
              <button className="w-full px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl text-white font-bold tracking-widest text-xs sm:text-sm hover:border-accent-green hover:text-accent-green transition-all duration-500">
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
          <div className="relative w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[550px] aspect-square">
            <div className="absolute inset-0 bg-accent-green/20 blur-[100px] sm:blur-[150px] rounded-full scale-110 opacity-0" />

            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full rounded-full overflow-hidden shadow-[0_60px_90px_rgba(0,0,0,0.5)] border-[8px] sm:border-[8px] border-white/5 bg-white/10"
            >
              <img
                src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800"
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
            <span key={i} className="text-xl sm:text-xl font-display font-normal text-white/50 tracking-[0.3em] sm:tracking-[0.5em] uppercase transition-colors pointer-events-none">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const pillars = [
    { icon: Leaf, title: "48h Sourdough", desc: "Long fermentation for deep, nuanced flavor and easy digestion." },
    { icon: Utensils, title: "100% Vegetarian", desc: "A creative playground for the finest botanical ingredients." },
    { icon: ChefHat, title: "Artisan Craft", desc: "Hand-stretched dough and small-batch preparation." },
    { icon: MapPin, title: "Local Bounty", desc: "Partnering with local farmers for the freshest harvest." },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-primary-green relative overflow-hidden">
      {/* Decorative leaf background */}
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        className="absolute -left-20 top-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent-green blur-[80px] sm:blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            className="text-accent-green font-mono uppercase block mb-6 sm:mb-8 text-[14px] sm:text-lg font-black"
          >
            Our Story
          </motion.span>
          <h2 className="text-5xl sm:text-7xl lg:text-[7rem] font-display font-black text-white tracking-tightest leading-[0.8] uppercase">
            Pure Roots. <br /><span className="text-accent-green italic font-light lowercase">Love of Veg Pizza</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mt-6 sm:mt-8 md:mt-10 text-center max-w-4xl mx-auto">Crustica Pizza was born to redefine how the world sees vegetarian pizza. We celebrate vegetables as heroes not just toppings. Every pizza is crafted with farm-fresh produce, hand-made crusts, and 100% vegetarian ingredients.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-accent-green/30 transition-all duration-500 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-accent-green/10 flex items-center justify-center mb-6 sm:mb-8 border border-accent-green/20 group-hover:bg-accent-green transition-all duration-500">
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent-green group-hover:text-primary-green transition-colors duration-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 text-white tracking-tight">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const categories = [
    { name: "Artisan Sourdough", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800", color: "from-primary-green/80", span: "lg:col-span-2" },
    { name: "Fresh Harvest", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800", color: "from-accent-green/80", span: "lg:col-span-1" },
    { name: "Botanical Specials", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", color: "from-light-green/80", span: "lg:col-span-1" },
    { name: "Signature Panini", img: "src/Assets/combos.jpg", color: "from-primary-green/40", span: "lg:col-span-2" },
  ];

  return (
    <section id="menu" className="py-10 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-black overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-accent-green/5 blur-[150px] rounded-full -mr-[30vw] -mt-[30vw] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-20 lg:mb-24 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-6xl sm:text-6xl lg:text-8xl font-display font-medium tracking-tighter text-white mb-6"
            >
              The Lineup
            </motion.h2>
            <p className="text-accent-green font-mono  text-[10px] sm:text-xs">Every dish is crafted with love, fresh ingredients, and a passion for pure vegetarian excellence.</p>
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

const ProcessSection = () => {
  return (
    <section className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-primary-green relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent-green icon-[lucide--utensils] font-mono uppercase tracking-[0.4em] block mb-6 sm:mb-8 text-[1px] sm:text-xs italic font-black"
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
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[2.2rem] bg-accent-green/5 flex items-center justify-center mb-10 mx-auto lg:mx-0 border border-white/5 group-hover:bg-accent-green transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(118,255,3,0.3)]">
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

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-primary-green overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 lg:mb-32 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 text-[10px] sm:text-xs font-black italic">Visual Chronicle</span>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-black text-white leading-[0.85] tracking-tightest uppercase italic">The Piece <br /> <span className="text-accent-green font-light lowercase">of Art.</span></h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white font-black px-10 py-5 rounded-[2rem] border border-white/10 hover:bg-white hover:text-primary-green transition-all duration-700 text-[10px] uppercase font-mono tracking-[0.3em] italic"
          >
            Explore feed
          </motion.button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {[
            interior,
            "https://images.unsplash.com/photo-1620374645310-f9d97e733268?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",

          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, zIndex: 10, rotate: i % 2 === 0 ? 1 : -1 }}
              className="aspect-[4/5] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden cursor-pointer relative shadow-2xl group"
            >
              <img src={src} loading="lazy" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary-green/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <Instagram className="text-white w-8 h-8 sm:w-10 sm:h-10 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500" link="https://www.instagram.com/crustica_pizza/" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderSection = () => {
  const platforms = [
    {
      name: "Zomato",
      color: "bg-[#CB202D]",
      url: "https://www.zomato.com/bangalore/crustica-pizza-banaswadi-bangalore/order",
      img: interior
    },
    {
      name: "Swiggy",
      color: "bg-[#F47006]",
      url: "https://www.swiggy.com/city/bangalore/crustica-pizzeria-kammanahalli/kalyan-nagar-kammanahalli-rest1302425",
      image: logoSwiggy
    },
    {
      name: "Magicpin",
      color: "bg-[#6533FF]",
      url: "https://magicpin.in/walletRecharge?merchantId=57637832",
      icon: Star
    }
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-accent-green">
      <div className="bg-primary-green py-4 sm:py-6 flex overflow-hidden whitespace-nowrap z-50 absolute top-0 left-0 right-0">
        <div className="flex animate-marquee-fast gap-16 sm:gap-24 lg:gap-32 font-display font-medium text-white/20 text-[10px] sm:text-xs tracking-[1em] uppercase">
          {Array(20).fill("PURE VEGETARIAN • SLOW CRAFTED • ARTISAN SOURDOUGH").map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center mt-12 sm:mt-16 relative z-10 text-primary-green">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary-green/40 font-mono uppercase tracking-[0.4em] block mb-8 text-[10px] sm:text-xs font-black italic"
        >
          Delivery Sanctuary
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-primary-green tracking-tightest leading-[0.85] mb-12 sm:mb-20 uppercase italic"
        >
          Fresh. <br className="sm:hidden" /> Natural. <br /> <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Crafted for You.</span>
        </motion.h2>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 items-stretch sm:items-center">
          {ORDER_PLATFORMS.map((plat) => (
            <motion.a
              key={plat.name}
              href={plat.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 sm:px-14 py-6 sm:py-8 ${plat.color} text-white rounded-[2rem] font-black tracking-[0.25em] shadow-2xl flex items-center justify-center gap-4 transition-all duration-500 text-xs sm:text-sm font-mono`}
            >
              <plat.icon size={20} />
              {plat.name.toUpperCase()}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const reviews = [
    { name: "Rahul S.", review: "The sourdough crust is exceptional. Airy, flavorful, and light. A true artisan experience.", label: "Top Critic" },
    { name: "Priya V.", review: "Fell in love with the the confit tomato base. Pure vegetarian haven in Bangalore.", label: "Verified Foodie" },
    { name: "Anish G.", review: "The 24h slow-fermentation quality is something you can actually taste. Perfection.", label: "Dough Master" }
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-black">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16 sm:mb-24 md:mb-32">
          <h2 className="text-4xl sm:text-6xl lg:text-[7vw] font-display font-medium text-white tracking-tightest mb-6 uppercase italic">Heartfelt <span className="text-accent-green font-light">Words.</span></h2>
          <p className="text-white/900 font-mono uppercase tracking-[0.4em] text-[10px] sm:text-xs font-black">Trusted by the local soul</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {reviews.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] bg-white/[0.03] border border-white/10 relative group hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="mb-8 text-accent-green flex items-center gap-2">
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

const ExperienceSection = () => {
  const reviews = [
    { name: "Rahul S.", review: "Best sourdough pizza in Bangalore. Super fresh and light!", source: "Google Maps", rating: 4 },
    { name: "Sneha R.", review: "Namma Ooru's pride! The Peri Peri fries are addictive.", source: "Instagram", rating: 5 },
  ];

  const gallery = [
    MainEntire,
    Cheif,
    Interior,
    Billing
  ];

  return (
    <section id="experience" className="py-24 sm:py-32 lg:py-48 px-4 sm:px-6 md:px-8 bg-primary-green relative overflow-hidden">
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
            className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 sm:mb-8 text-[10px] sm:text-[16px] font-black"
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
                  {Array(rev.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-lg">★</span>
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

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 lg:py-32 px-4 sm:px-6 md:px-8 bg-primary-green relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white leading-[1] mb-12 sm:mb-20 tracking-tightest uppercase italic"
          >
            Visit Our <br /><span className="text-accent-green font-light lowercase">Botanical Haven.</span>
          </motion.h2>

          <div className="space-y-10 sm:space-y-14">
            {[
              { icon: MapPin, label: "Address", val: "AC-822, 8th E Main Rd, (Behind ibaco ice cream parlour), 1st Block, HRBR Layout, Kalyan Nagar, Bengaluru, Karnataka 560043", color: "text-accent-green" },
              { icon: Phone, label: "Phone", val: "+91 81977 99090", color: "text-white" },
              { icon: Mail, label: "Email", val: "crusticapizza@gmail.com", color: "text-white" },
              { icon: Clock, label: "Hours", val: "12:00 PM - 11:00 PM", detail: "Open all days", color: "text-white" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 sm:gap-8 text-white"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                  <item.icon className={`${item.color} w-6 h-6 sm:w-7 sm:h-7`} />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] mb-3 font-black">{item.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-display font-medium tracking-tight leading-snug">{item.val}</p>
                  {item.detail && <p className="text-xs sm:text-sm text-white/30 mt-2 italic">{item.detail}</p>}
                </div>
              </motion.div>
            ))}

            <div className="flex gap-6 sm:gap-8 pt-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                <MessageCircle className="text-accent-green w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <button
                onClick={() => window.open("https://wa.me/918197799090", "_blank")}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-accent-green text-primary-green rounded-2xl sm:rounded-[2rem] font-black lowercase tracking-widest text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-500 font-mono"
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-4 sm:p-4 rounded-[2.5rem] sm:rounded-[4rem] bg-white/[0.03] border border-white/10 overflow-hidden aspect-video sm:aspect-square lg:aspect-auto lg:h-[350px] relative group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2796122616823!2d77.6418873!3d13.0184405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1119b48f95db%3A0xe543df65e903f6f9!2sAC-822%2C%208th%20E%20Main%20Rd%2C%20HRBR%20Layout%201st%20Block%2C%20HRBR%20Layout%2C%20Kalyan%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560043!5e0!3m2!1sen!2sin!4v1713830000000!5m2!1sen!2sin"
              className="w-full h-full rounded-[2rem] sm:rounded-[3rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-10 right-10">
              <a
                href="https://www.google.com/maps/place/Crustica+Pizza/@13.015023,77.6439801,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17000d751a61:0xff9b662328f1524c!8m2!3d13.015023!4d77.646555!16s%2Fg%2F11yr2dfhnp?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-white text-primary-green rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-accent-green transition-all duration-500 shadow-2xl"
              >
                Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-10 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl"
          >
            <form className="space-y-8 sm:space-y-8 ">
              <div className="space-y-4 ">
                <label className="text-[14px] font-mono text-white/300 uppercase tracking-[0.2em] font-black">Your Personal </label>
                <input type="text" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[3rem] p-4 py-5 sm:py-6 focus:border-accent-green outline-none transition-all duration-500 text-white font-medium" placeholder="Full Name" required />
              </div>
              <div className="space-y-4">
                <label className="text-[14px] font-mono text-white/300 uppercase tracking-[0.2em] font-black">Email</label>
                <input type="text" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[3rem] p-4 py-5 sm:py-6 focus:border-accent-green outline-none transition-all duration-500 text-white font-medium" placeholder="Enter the email" required />
              </div>
              <div className="space-y-4">
                <label className="text-[14px] font-mono text-white/300 uppercase tracking-[0.2em] font-black">Message</label>
                <textarea className="w-full bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-[2rem] px-8 py-5 sm:py-6 focus:border-accent-green outline-none h-32 sm:h-40 transition-all duration-500 text-white font-medium resize-none" placeholder="We value your voice..." required />
              </div>
              <button className="w-full py-6 sm:py-7 bg-accent-green text-primary-green font-black uppercase tracking-[0.3em] text-xs rounded-2xl sm:rounded-[2rem] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-accent-green/20 font-mono">Send Fragment</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 sm:py-24 lg:py-10 px-4 sm:px-10 md:px-16 lg:px-25 bg-black relative selection:bg-accent-green selection:text-primary-green">
      <div className="max-w-8xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 lg:gap-32 border-b border-white/5">
          <div className="max-w-7xl">
            <div className="flex items-center gap-3 mb-10 sm:mb-12">
              <img src={LogoImage} alt="Crustica Logo" className="h-15 sm:h-12 lg:h-14 w-auto object-contain scale-110" />
            </div>
            <p className="text-white/40 text-lg sm:text-xl mb-12 sm:mb-16 leading-relaxed font-medium tracking-tight">
              Redefining the vegetarian experience through 24h slow-fermented artisan sourdough. Pure veg, pure craft, pure Bangalore.
            </p>
            <div className="flex gap-2 sm:gap-4">
              {[Instagram, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2, color: "#76FF03" }}
                  href="https://www.instagram.com/crustica_pizza/"
                  className="text-white/70 transition-all duration-500"
                >
                  <Icon className="w-7 h-7" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-16 lg:gap-20">
            <div className="flex flex-col gap-8">
              <span className="text-accent-green font-mono uppercase tracking-[0.4em] mb-4 text-[10px] font-black italic">Directory</span>
              <div className="flex flex-col gap-5 text-white/40 font-bold uppercase tracking-widest text-[10px]">
                {["About", "Menu", "Gallery", "Visit Us", "Contact"].map((link) => (
                  <Link key={link} to={`/#${link.toLowerCase().replace(' ', '')}`} className="hover:text-white transition-all duration-500 hover:translate-x-2">
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8 col-span-2 sm:col-span-1">
              <span className="text-accent-green font-mono uppercase tracking-[0.4em] mb-4 text-[10px] font-black italic">The Sanctuary</span>
              <div className="space-y-8 text-white/50 text-sm font-medium leading-relaxed tracking-tight">
                <p>AC-822, 8th E Main Rd, 1st Block, HRBR Layout, Kalyan Nagar, Bengaluru, Karnataka 560043 <br /> <span className="text-[10px] text-accent-green/70 uppercase font-black font-mono tracking-widest mt-2 block">(Behind ibaco ice cream parlour)</span></p>
                <p className="text-[17px] text-white tracking-tightest">+91 81977 99090</p>
              </div>
            </div>

            <div className="flex flex-col gap-8 col-span-2 sm:col-span-1">
              <span className="text-accent-green font-mono uppercase tracking-[0.4em] mb-4 text-[10px] font-black italic">The Oven</span>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-white/40 border-b border-white/5 pb-4">
                  <p className="text-[16px] font-mono uppercase font-black">Mon - Sun <br /> <span className="text-[10px] text-accent-green/70 uppercase font-black font-mono tracking-widest mt-2 block">(11AM - 11PM)</span> </p>
                </div>
                <p className="text-yellow-400 text-[12px] font-mono leading-loose underline underline-offset-8 decoration-2 decoration-yellow-400/50">Designed by <span className="cursor-pointer" onClick={() => window.open('https://manveltech.netlify.app/', '_blank')}>Manvel</span></p>
              </div>
            </div>
          </div>
          <p className="font-mono text-[9px] sm:text-[10px] text-white/60 uppercase  font-black md:text-left leading-relaxed">
            © 2026 Crustica Pizza. All Rights Reserved.
          </p>
          <div className="flex gap-20 text-[9px] font-mono  text-white/70 tracking-[0.4em] font-black">
            <span className="hover:text-accent-green cursor-pointer transition-all duration-500">Privacy</span>
            <span className="hover:text-accent-green cursor-pointer transition-all duration-500">Terms</span>
            <span className="hover:text-accent-green cursor-pointer transition-all duration-500">Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const HomePage = () => (
  <>
    <Hero />
    <AboutSection />

    <div className="bg-cream py-10 flex overflow-hidden whitespace-nowrap z-50">
      <div className="flex animate-marquee-fast gap-24 font-display font-bold text-primary-green text-3xl uppercase tracking-tighter">
        {Array(10).fill("PURE VEG • ARTISAN DOUGH • FRESH HARVEST • SLOW CRAFTED").map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>

    <MenuSection />
    <ProcessSection />
    <GallerySection />
    <OrderSection />
    <TestimonialsSection />
    <ExperienceSection />
    <ContactSection />
  </>
);

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [pizzaSizes, setPizzaSizes] = useState<Record<string, "reg" | "lg">>({});
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary-green min-h-screen selection:bg-accent-green selection:text-primary-green">
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      {/* Menu Header */}
      <div className="relative pt-32 sm:pt-40 pb-20 sm:pb-10 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(118,255,3,0.15),_transparent_70%)]" />
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
            className="text-white text-base sm:text-lg lg:text-base font-medium max-w-xxl leading-relaxed tracking-tight"
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
            {menuData.map((cat) => (
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
                  ? "bg-accent-green text-black border-accent-green shadow-[0_0_30px_rgba(118,255,3,0.3)]"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-4 lg:px-4 xl:px-4 2xl:px-4 pt-20 sm:pt-10">
        {/* Featured Menu Items */}
        {menuData.map((category) => (
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
                  className="group relative flex flex-col bg-gradient-to-br from-[#0b1408]/90 via-black/80 to-[#11210d]/90 backdrop-blur-2xl border border-[#76ff03]/10 rounded-[32px] p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#76ff03]/30 hover:bg-[#0f1d0c]/90 hover:shadow-[0_30px_80px_rgba(118,255,3,0.12)]"                
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
                        <span className="text-[12px] text-white/200 uppercase  tracking-[0.06em] font-black mb-1">
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
                    <div className=" absolute bottom-9 right-4">
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

            <div className=" border-t border-white/5">
              <span className="text-white/200 font-mono uppercase tracking-[0.2em] block mb-6 text-center text-[16px] font-black"> Order via Platforms</span>
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

// --- App Entry ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power4.out"
        });
        gsap.set(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", moveCursor);
    };
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
            className="fixed inset-0 z-[1000] bg-[#1A3A0F] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(118,255,3,0.12),_transparent_70%)]" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="flex flex-col items-center gap-10 relative z-10"
            >
              <Link to="/" className="shrink-0 ">
                <img src={LogoImage} alt="Crustica Logo" className="h-20 sm:h-24 lg:h-26 w-auto object-contain scale-110" />
              </Link>
              <div className="text-center">
                <h2 className="font-display font-black text-xl sm:text-2xl text-white/90 tracking-tightest uppercase mb-2">PREPARING THE OVEN..</h2>
                <div className="w-24 h-1 bg-accent-green mx-auto rounded-full" />
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
            <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
              <div ref={cursorRef} className="w-10 h-10 border border-accent-green/50 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
              <div ref={cursorDotRef} className="w-1.5 h-1.5 bg-accent-green rounded-full fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
            </div>

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
