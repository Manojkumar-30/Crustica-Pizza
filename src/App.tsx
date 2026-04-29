/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import LogoImage from "./Assets/crustica-logo.png";
import Pizza1 from "./Assets/pizza_1.jpg";
import Cheif from "./Assets/cheif.jpg";
import MainEntire from "./Assets/main_entire.jpg";
import Interior from "./Assets/interior.jpg";
import ExteriorMain from "./Assets/exterior_main.jpg";
import Fries from "./Assets/fries.jpg";
import Juice from "./Assets/Juice.jpg";
import Billing from "./Assets/Billing.jpg";

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
  Mail
} from "lucide-react";
import { menuData, addOns } from "./data/menu";

// --- Components ---

const OrderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const platforms = [
    {
      name: "Zomato",
      url: "https://www.zomato.com/bangalore/crustica-pizza-banaswadi-bangalore/order",
      color: "bg-[#CB202D]",
      desc: "Order via Zomato",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-3-13.5v7h1.5v-7h-1.5zm.75-1.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75zm3.75 3c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm1.5 7.5v-1.5h-1.5v1.5H15zm-2.25 0v-1.5H12V17h.75zm1.5-3v-1.5h-1.5V14H15zm-2.25 0v-1.5H12V14h.75z" />
        </svg>
      )
    },
    {
      name: "Swiggy",
      url: "https://www.swiggy.com/city/bangalore/crustica-pizzeria-kammanahalli/kalyan-nagar-kammanahalli-rest1302425",
      color: "bg-[#FC8019]",
      desc: "Order via Swiggy",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M18.528 5.4c-.23-.377-.674-.6-1.127-.6H6.6c-.453 0-.897.223-1.127.6-.23.377-.23.834 0 1.2l5.313 8.7a1.328 1.328 0 0 0 2.254 0l5.488-9c.23-.366.23-.823 0-1.2v-.7zM12 15c-.443 0-.877-.214-1.127-.6L5.56 5.7h12.879l-5.312 8.7c-.25.386-.684.6-1.127.6z" />
        </svg>
      )
    },
    {
      name: "Magicpin",
      url: "https://magicpin.in/walletRecharge?merchantId=57637832",
      color: "bg-[#6533FF]",
      desc: "Order via Magicpin",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-green/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md glass-fresh rounded-[2rem] p-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-cream/40 hover:text-cream transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-3xl font-display font-bold text-cream mb-2 tracking-tight">Order Online</h3>
            <p className="text-cream/40 text-sm mb-10">Select a platform to browse our menu.</p>

            <div className="space-y-4">
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-6 rounded-2xl ${platform.color} text-white font-bold transition-all hover:scale-[1.02] active:scale-95 group`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      {platform.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl">{platform.name}</span>
                      <span className="text-[10px] opacity-70 tracking-widest uppercase font-mono">{platform.desc}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Story", href: "/#about", isStatic: false },
    { name: "Menu", href: "/menu", isStatic: true },
    { name: "Ingredients", href: "/#ingredients", isStatic: false },
    { name: "Gallery", href: "/#gallery", isStatic: false },
    { name: "Visit", href: "/#contact", isStatic: false },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const id = href.split("#")[1];
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-5 ${isScrolled || isMobileMenuOpen
          ? "bg-[#1A3A0F]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={LogoImage} alt="Crustica Logo" className="h-12 md:h-16 w-auto object-contain transition-transform hover:scale-105" />
          </Link>

          {/* Center: Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((item) => (
              item.isStatic ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-cream/70 hover:text-light-green font-medium text-[11px] tracking-[0.2em] uppercase transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-green transition-all duration-300 group-hover:w-full"></span>
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
                  className="text-cream/70 hover:text-light-green font-medium text-[11px] tracking-[0.2em] uppercase transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-green transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-8 shrink-0">
            <div className="flex items-center gap-2 text-cream/70 text-xs font-mono">
              <Phone className="w-3.5 h-3.5 text-accent-green" />
              <span>+91 81977 99090</span>
            </div>
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="px-8 py-3 rounded-xl bg-[#4CAF50] text-cream text-[13px] font-bold hover:bg-[#76FF03] hover:text-[#1A3A0F] transition-all hover:scale-105 shadow-lg shadow-black/20"
            >
              ORDER NOW
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-cream"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed inset-0 top-0 bg-[#1A3A0F] flex flex-col items-center justify-center gap-8 py-10 px-6 z-[99]"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-8 text-cream p-2"
              >
                <X className="w-8 h-8" />
              </button>
              {navLinks.map((item) => (
                item.isStatic ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-display font-bold text-cream hover:text-accent-green transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (location.pathname === "/") {
                        e.preventDefault();
                        handleNavClick(item.href);
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="text-4xl font-display font-bold text-cream hover:text-accent-green transition-colors"
                  >
                    {item.name}
                  </a>
                )
              ))}
              <div className="w-full h-px bg-white/5 my-4" />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="w-full py-6 rounded-2xl bg-[#4CAF50] text-[#1A3A0F] font-black text-xl shadow-2xl"
              >
                ORDER NOW
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const pizzaRef = useRef<HTMLDivElement>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Stagger
      const words = headingRef.current?.querySelectorAll(".hero-word");
      if (words) {
        gsap.fromTo(words,
          { opacity: 0, y: 100, rotateX: -45 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 1.2,
            stagger: 0.3,
            ease: "expo.out"
          }
        );
      }

      // Pizza Entrance
      gsap.fromTo(pizzaRef.current,
        { scale: 0.5, opacity: 0, rotate: -30 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: "elastic.out(1, 0.7)" }
      );

      // Soft Floating
      gsap.to(pizzaRef.current, {
        y: -30,
        rotate: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Parallax on Scroll
      gsap.to(pizzaRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        },
        y: 200,
        rotate: 45,
        scale: 1.2
      });

      // Descriptions Fade-in
      gsap.fromTo(".hero-desc",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, delay: 1.5, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A3A0F]">
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      {/* Background Gradient & Texture */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(76,175,80,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A0F] via-[#2D5016] to-[#1A3A0F]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 lg:pt-0">
        {/* Left Side: Staggered Content */}
        <div className="text-left perspective-[1000px]">
          <div ref={headingRef} className="mb-8 overflow-hidden">
            <h1 className="text-[12vw] lg:text-[5vw] font-display font-black text-cream leading-[0.8] tracking-tighter uppercase">
              <span className="block hero-word">Fresh.</span>
              <span className="block hero-word text-[#76FF03]">Sourdough.</span>
              <span className="block hero-word font-light italic opacity-90 lowercase tracking-normal">Crafted.</span>
            </h1>
          </div>

          <div className="hero-desc space-y-8">
            <div className="flex flex-wrap items-center  gap-4">
              {["100% Pure Vegetarian", "Namma Ooru", "Namma Sourdough Pizza"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#76FF03]">
                  {tag}
                </span>
              ))}
            </div>

            <p className="max-w-md text-cream font-light italic opacity-90 text-lg md:text-xl font-light leading-relaxed">
              Handcrafted sourdough pizzas made with fresh local ingredients and a 24-hour slow fermentation process.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-6">
              <motion.button
                onClick={() => setIsOrderModalOpen(true)}
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "#fdfdfdff", color: "#1A3A0F" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 rounded-2xl bg-[#4CAF50] text-cream font-black tracking-[0.2em] shadow-[0_20px_50px_rgba(76,175,80,0.3)] transition-all"
              >
                ORDER NOW
              </motion.button>
              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.05, border: "1px solid #ffffffff" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 rounded-2xl border border-white/20 bg-transparent text-cream font-bold tracking-[0.1em] transition-all"
                >
                  EXPLORE MENU
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Popping Visual */}
        <div className="relative flex justify-center items-center">
          <div ref={pizzaRef} className="relative z-10 w-full max-w-[650px] group">
            {/* Shadows & Glow */}
            <div className="absolute inset-0 bg-[#76FF03]/20 blur-[120px] rounded-full scale-110 opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
            <div className="absolute bottom-[-10%] left-[10%] right-[10%] h-[20px] bg-black/60 blur-[40px] rounded-[100%]" />

            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-full"
            >
              <img
                src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=1200"
                alt="3D Popping Margherita Pizza"
                className="w-full h-auto object-cover drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
              />
              {/* Optional: Add reflection or highlights via overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee remains but styled for depth */}
      <div className="absolute bottom-0 left-0 right-0 py-4 border-t border-white/5 bg-[#1A3A0F]/75 backdrop-blur-md overflow-hidden z-10">
        <div className="flex animate-marquee-fast whitespace-nowrap gap-28">
          {Array(8).fill("PURE VEG • SLOW FERMENTED • ARTISAN CRUST").map((text, i) => (
            <span key={i} className="text-xxl font-display font-light tracking-[0.4em] uppercase">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const pillars = [
    { icon: Leaf, title: "24h Sourdough", desc: "Long fermentation for deep, nuanced flavor and easy digestion." },
    { icon: Utensils, title: "100% Vegetarian", desc: "A creative playground for the finest botanical ingredients." },
    { icon: ChefHat, title: "Artisan Craft", desc: "Hand-stretched dough and small-batch preparation." },
    { icon: MapPin, title: "Local Bounty", desc: "Partnering with local farmers for the freshest harvest." },
  ];

  return (
    <section id="about" className="py-32 px-6 bg-primary-green/95 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 text-xl gap-2">Our Commitment</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-cream leading-[1.1]">
            PURE INGREDIENTS.<br /><span className="text-light-green italic opacity-90">HONEST CRAFT.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="p-10 rounded-3xl bg-cream/[0.03] border border-white/5 hover:border-accent-green/20 transition-smooth group"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent-green/10 flex items-center justify-center mb-8 border border-accent-green/20 group-hover:bg-accent-green transition-smooth">
                <item.icon className="w-7 h-7 text-accent-green group-hover:text-cream transition-smooth" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-cream">{item.title}</h3>
              <p className="text-cream/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const categories = [
    { name: "Artisan Sourdough", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800", color: "from-primary-green/80" },
    { name: "Fresh Harvest", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800", color: "from-accent-green/80" },
    { name: "Botanical Specials", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", color: "from-light-green/80" },
    { name: "Signature Kabsa", img: "https://images.unsplash.com/photo-1567305041168-96df58f5068a?auto=format&fit=crop&q=80&w=800", color: "from-highlight-green/40" },
    { name: "Cold Pressed", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800", color: "from-accent-green/60" },
  ];

  return (
    <section id="menu" className="py-32 px-6 bg-primary-green">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl font-display font-medium tracking-tight text-cream">The Lineup</h2>
            <p className="text-cream/30 font-mono tracking-widest mt-6 text-xs uppercase">Curated with conscience</p>
          </div>
          <Link to="/menu" className="px-10 py-4 border border-accent-green text-accent-green rounded-xl font-semibold hover:bg-accent-green hover:text-cream transition-smooth">
            Full Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to="/menu"
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group cursor-pointer block"
            >
              <img
                src={cat.img}
                className="w-full h-full object-cover transition-all duration-1000"
                alt={cat.name}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-40 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-12`} />
              <div className="absolute inset-0 flex flex-col justify-end p-12 z-10">
                <h3 className="text-3xl font-display font-bold text-cream tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-smooth duration-700">{cat.name}</h3>
                <p className="text-cream/70 text-sm mt-5 opacity-0 group-hover:opacity-100 transition-smooth duration-700 font-medium">Explore fresh flavor</p>
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
    <section className="py-40 px-6 bg-primary-green/90">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-cream">THE ART OF <span className="text-accent-green italic font-light opacity-90">SLOW.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {[
            { step: "01", title: "Select", icon: UtensilsCrossed, desc: "Browse your botanical sourdough favorites." },
            { step: "02", title: "Prepare", icon: Leaf, desc: "Hand-stretched dough meets fresh harvest." },
            { step: "03", title: "Stonebake", icon: ChefHat, desc: "Precision baked to a perfect artisan crunch." },
            { step: "04", title: "Savor", icon: Zap, desc: "Delivered fresh to your table or doorstep." },
          ].map((item, i) => (
            <div key={i} className="relative p-12 rounded-[2.5rem] bg-cream/[0.02] border border-white/5 group hover:border-accent-green/20 transition-smooth overflow-hidden text-center md:text-left">
              <span className="absolute -top-6 -right-6 text-[10rem] font-display font-bold text-cream/[0.03] group-hover:text-cream/[0.05] transition-smooth">{item.step}</span>
              <div className="w-16 h-16 rounded-2xl bg-accent-green/10 flex items-center justify-center mb-8 mx-auto md:mx-0">
                <item.icon className="w-8 h-8 text-accent-green" />
              </div>
              <h3 className="text-2xl font-display font-bold text-cream mb-5 tracking-tight">{item.title}</h3>
              <p className="text-cream/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="py-32 px-6 bg-primary-green">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-cream tracking-tight">Gallery</h2>
          <button className="text-accent-green font-semibold border-b border-accent-green/30 pb-2 hover:text-cream hover:border-cream transition-smooth">View More</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            Pizza1,
            Cheif,
            MainEntire,
            Interior,
            ExteriorMain,
            Fries,
            Juice,
            Billing
          ].map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className="aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer relative"
            >
              <img src={src} className="w-full h-full object-cover transition-smooth duration-700" />
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
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-3-13.5v7h1.5v-7h-1.5zm.75-1.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75zm3.75 3c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm1.5 7.5v-1.5h-1.5v1.5H15zm-2.25 0v-1.5H12V17h.75zm1.5-3v-1.5h-1.5V14H15zm-2.25 0v-1.5H12V14h.75z" />
        </svg>
      )
    },
    {
      name: "Swiggy",
      color: "bg-[#FC8019]",
      url: "https://www.swiggy.com/city/bangalore/crustica-pizzeria-kammanahalli/kalyan-nagar-kammanahalli-rest1302425",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M18.528 5.4c-.23-.377-.674-.6-1.127-.6H6.6c-.453 0-.897.223-1.127.6-.23.377-.23.834 0 1.2l5.313 8.7a1.328 1.328 0 0 0 2.254 0l5.488-9c.23-.366.23-.823 0-1.2v-.7zM12 15c-.443 0-.877-.214-1.127-.6L5.56 5.7h12.879l-5.312 8.7c-.25.386-.684.6-1.127.6z" />
        </svg>
      )
    },
    {
      name: "Magicpin",
      color: "bg-[#6533FF]",
      url: "https://magicpin.in/walletRecharge?merchantId=57637832",
      icon: <Zap className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-accent-green">
      <div className="bg-primary-green py-5 flex overflow-hidden whitespace-nowrap z-50 absolute top-0 left-0 right-0">
        <div className="flex animate-marquee-fast gap-24 font-display font-medium text-cream/40 text-xs tracking-[1em] uppercase">
          {Array(20).fill("PURE VEGETARIAN • SLOW CRAFTED • ARTISAN SOURDOUGH").map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center mt-16">
        <h2 className="text-6xl md:text-8xl font-display font-medium text-cream tracking-tighter leading-[0.9] mb-14">FRESH. NATURAL. <br className="hidden md:block" /> <span className="opacity-70">CRAFTED FOR YOU.</span></h2>
        <div className="flex flex-wrap justify-center gap-6">
          {platforms.map((plat) => (
            <a
              key={plat.name}
              href={plat.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-10 py-5 rounded-2xl ${plat.color} text-white font-bold tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3`}
            >
              <div className="shrink-0">{plat.icon}</div>
              {plat.name.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const reviews = [
    { name: "Rahul S.", review: "The sourdough crust is exceptional. Airy, flavorful, and surprisingly light. A True artisan experience.", label: "Most Loved" },
    { name: "Priya V.", review: "I love that everything is pure vegetarian but doesn't compromise on bold, fresh flavors. Absolute favorite.", label: "Trusted by thousands" },
    { name: "Anish G.", review: "The texture of the fresh dough is unlike anything else. You can taste the slow-fermentation quality.", label: "Verified Review" }
  ];

  return (
    <section className="py-40 px-6 bg-primary-green">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-display font-bold text-cream tracking-tight">KIND WORDS FROM <span className="text-accent-green italic font-light opacity-90">THE HEART.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((item, i) => (
            <div key={i} className="p-12 rounded-[2.5rem] bg-cream/[0.03] border border-white/5 relative">
              <span className="text-[10px] font-mono text-accent-green uppercase tracking-[0.3em] block mb-6">{item.label}</span>
              <p className="text-xl font-medium leading-relaxed mb-10 text-cream/80 font-serif italic">"{item.review}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-green/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-accent-green opacity-40" />
                </div>
                <span className="font-bold text-sm text-cream tracking-tight">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const reviews = [
    { name: "Rahul S.", review: "Best sourdough pizza in Bangalore. Super fresh and light!", source: "Google", rating: 5 },
    { name: "Divya K.", review: "The interiors are so cozy, perfect for a weekend hangout. The Margherita is a must-try.", source: "Instagram", rating: 5 },
    { name: "Arjun M.", review: "Finally a 100% veg place that takes its dough seriously. 24h fermentation really shows.", source: "Google", rating: 5 },
  ];

  const gallery = [
    ExteriorMain,
    Interior,
    Pizza1,
    Fries
  ];

  return (
    <section id="experience" className="py-40 px-6 bg-primary-green relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Left: Visuals */}
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`rounded-3xl overflow-hidden shadow-2xl relative ${i % 2 === 0 ? 'mt-8' : ''}`}
              >
                <img src={img} alt="Restaurant interior" className="w-full h-full object-cover aspect-square" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Reviews */}
        <div className="order-1 lg:order-2">
          <span className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 text-xs">Proof in every bite</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-cream leading-[1.1] mb-8">
            EXPERIENCE <br /><span className="text-light-green italic opacity-90">THE VIBE.</span>
          </h2>
          <p className="text-cream/50 text-lg mb-12 max-w-lg font-light leading-relaxed">
            From our long-fermented dough to our botanical-inspired interiors, discover why we are Bangalore's favorite 100% vegetarian sanctuary.
          </p>

          <div className="flex overflow-x-auto lg:flex-col lg:overflow-visible gap-6 scrollbar-hide pb-8 lg:pb-0">
            {reviews.map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[300px] lg:min-w-0 bg-white rounded-2xl p-8 shadow-xl border border-primary-green/5 group hover:border-accent-green/20 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array(rev.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-accent-green text-lg">★</span>
                  ))}
                </div>
                <p className="text-primary-green text-lg font-medium leading-relaxed mb-6 italic">"{rev.review}"</p>
                <div className="flex justify-between items-center whitespace-nowrap">
                  <span className="font-bold text-primary-green/80 text-sm">— {rev.name}</span>
                  <span className="text-[10px] font-mono text-primary-green/30 uppercase tracking-widest">{rev.source}</span>
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
    <section id="contact" className="py-40 px-6 bg-primary-green/95">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-6xl font-display font-bold text-cream leading-[1.1] mb-14 tracking-tight">VISIT OUR <br /><span className="text-accent-green">BOTANICAL HAVEN.</span></h2>
          <div className="space-y-12">
            <div className="flex gap-8 text-cream">
              <div className="w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center shrink-0"><MapPin className="text-accent-green w-6 h-6" /></div>
              <div>
                <p className="font-mono text-[10px] text-cream/30 uppercase tracking-[0.4em] mb-2">Address</p>
                <p className="text-xl font-medium tracking-tight">AC-822, 8th E Main, Kalyan Nagar, Bangalore (Behind ibaco ice cream parlour)</p>
              </div>
            </div>
            <div className="flex gap-8 text-cream">
              <div className="w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center shrink-0"><Phone className="text-light-green w-6 h-6" /></div>
              <div>
                <p className="font-mono text-[10px] text-cream/30 uppercase tracking-[0.4em] mb-2">Phone</p>
                <p className="text-xl font-medium tracking-tight">+91 81977 99090</p>
              </div>
            </div>
            <div className="flex gap-8 text-cream">
              <div className="w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center shrink-0"><Mail className="text-accent-green w-6 h-6" /></div>
              <div>
                <p className="font-mono text-[10px] text-cream/30 uppercase tracking-[0.4em] mb-2">Email</p>
                <p className="text-xl font-medium tracking-tight">crusticapizza@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-8 text-cream">
              <div className="w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center shrink-0"><Clock className="text-light-green w-6 h-6" /></div>
              <div>
                <p className="font-mono text-[10px] text-cream/30 uppercase tracking-[0.4em] mb-2">Hours</p>
                <p className="text-xl font-medium tracking-tight">11:00 AM - 10:00 PM</p>
                <p className="text-sm opacity-50">Open all days</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center shrink-0"><MessageCircle className="text-accent-green w-6 h-6" /></div>
              <button
                onClick={() => window.open("https://wa.me/918197799090", "_blank")}
                className="px-10 py-3 bg-accent-green text-cream rounded-xl font-bold uppercase text-xs tracking-widest hover:opacity-90 transition-smooth font-sans"
              >
                WhatsApp Concierge
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-fresh p-4 rounded-[3rem] overflow-hidden aspect-video relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2796122616823!2d77.6418873!3d13.0184405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1119b48f95db%3A0xe543df65e903f6f9!2sAC-822%2C%208th%20E%20Main%20Rd%2C%20HRBR%20Layout%201st%20Block%2C%20HRBR%20Layout%2C%20Kalyan%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560043!5e0!3m2!1sen!2sin!4v1713830000000!5m2!1sen!2sin"
              className="w-full h-full rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-8 right-8">
              <a
                href="https://maps.app.goo.gl/3q6Z1w6GZX9Z9Z9Z9"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cream text-primary-green rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-accent-green hover:text-cream transition-smooth"
              >
                Open in Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="glass-fresh p-12 rounded-[3rem]">
            <form className="space-y-8 text-cream">
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-cream/30 uppercase tracking-[0.4em]">Your Name</label>
                <input type="text" className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 focus:border-accent-green outline-none transition-smooth" placeholder="Enter name" required />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-cream/30 uppercase tracking-[0.4em]">Message</label>
                <textarea className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 focus:border-accent-green outline-none h-32 transition-smooth" placeholder="How can we help?" required />
              </div>
              <button className="w-full py-5 bg-accent-green text-cream font-bold rounded-2xl hover:bg-accent-green/80 transition-smooth shadow-lg shadow-accent-green/5">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 bg-primary-green border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-24">
        <div className="max-w-md">
          <div className="flex items-center mb-10">
            <img src={LogoImage} alt="Crustica Logo" className="h-16 md:h-20 w-auto object-contain" />
          </div>
          <p className="text-cream/30 text-sm mb-12 leading-relaxed lowercase">
            Crustica Pizza was born to redefine how the world sees vegetarian pizza. Pure veg, pure taste — that's our promise.
          </p>
          <p className="text-cream/80 font-serif italic text-xl mb-12">"For the Love of Veg"</p>
          <div className="flex gap-8">
            <Instagram className="w-5 h-5 text-cream/20 hover:text-accent-green transition-smooth cursor-pointer" onClick={() => window.open("https://instagram.com/crusticapizza_", "_blank")} />
            <Facebook className="w-5 h-5 text-cream/20 hover:text-accent-green transition-smooth cursor-pointer" />
            <Twitter className="w-5 h-5 text-cream/20 hover:text-accent-green transition-smooth cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 text-sm font-medium tracking-tight">
          <div className="flex flex-col gap-6 text-cream/30 italic">
            <span className="text-cream not-italic mb-3 font-display font-bold uppercase tracking-widest">Quick Links</span>
            <Link to="/#about" className="hover:text-accent-green transition-smooth">About</Link>
            <Link to="/menu" className="hover:text-accent-green transition-smooth">Menu</Link>
            <Link to="/#gallery" className="hover:text-accent-green transition-smooth">Gallery</Link>
            <Link to="/#contact" className="hover:text-accent-green transition-smooth">Visit Us</Link>
            <a href="#contact" className="hover:text-accent-green transition-smooth">Contact Us</a>
          </div>

          <div className="flex flex-col gap-6 text-cream/30 italic">
            <span className="text-cream not-italic mb-3 font-display font-bold uppercase tracking-widest">Connect</span>
            <p className="text-cream/50 not-italic">AC-822, 8th E Main, Kalyan Nagar, Bangalore (Behind ibaco ice cream parlour)</p>
            <p className="text-cream/50 not-italic">+91 8197799090</p>
            <p className="text-cream/50 not-italic">crusticapizza@gmail.com</p>
            <a href="https://instagram.com/crusticapizza_" target="_blank" className="hover:text-accent-green transition-smooth not-italic text-accent-green opacity-100 font-mono">@crusticapizza_</a>
          </div>

          <div className="flex flex-col gap-6 text-cream/30 italic font-mono">
            <span className="text-cream not-italic mb-3 font-display font-bold font-sans tracking-tight uppercase tracking-widest">Opening</span>
            <p>Daily</p>
            <p className="text-accent-green font-bold">11AM - 10PM</p>
          </div>
        </div>
      </div>
      <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row">
        <p className="font-mono text-[10px] text-cream/10 uppercase tracking-[0.5em]">© 2026 Crustica Pizza. All rights reserved.</p>
        <p className="text-[10px] opacity-30 mt-10 tracking-widest">Designed by Manvel</p>
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
    <Footer />
  </>
);

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [pizzaSizes, setPizzaSizes] = useState<Record<string, "reg" | "lg">>({});
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const toggleSize = (itemName: string) => {
    setPizzaSizes(prev => ({
      ...prev,
      [itemName]: prev[itemName] === "lg" ? "reg" : "lg"
    }));
  };

  return (
    <div className="pt-24 bg-primary-green min-h-screen">
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      {/* Menu Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <span className="text-accent-green font-mono uppercase tracking-[0.4em] block mb-6 text-xs">Curated with conscience</span>
        <h1 className="text-6xl md:text-8xl font-display font-bold text-cream mb-8 tracking-tighter">
          THE <span className="text-light-green italic">Sourdough</span> LINEUP.
        </h1>
        <p className="text-cream/40 text-xl font-light max-w-2xl leading-relaxed">
          Explore our artisan 100% vegetarian menu, featuring 24h slow-fermented sourdough pizza and botanical garden fresh favorites.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[72px] z-40 bg-primary-green/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide py-5 px-6 flex items-center gap-12">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const el = document.getElementById(cat.id);
                if (el) {
                  const offset = 140;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = el.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
              className={`whitespace-nowrap font-display font-bold text-sm tracking-widest uppercase transition-all ${activeCategory === cat.id ? "text-accent-green scale-110" : "text-cream/40 hover:text-cream"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {menuData.map((category) => (
          <div key={category.id} id={category.id} className="mb-32 last:mb-0 scroll-mt-40">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-cream mb-16 tracking-tight flex items-center gap-6">
              {category.name}
              <div className="h-px flex-1 bg-white/10" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {category.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2.5rem] flex flex-col justify-between group hover:shadow-2xl hover:shadow-accent-green/5 transition-all duration-500 border border-transparent hover:border-accent-green/10 overflow-hidden"
                >
                  {item.image && (
                    <div className="w-full h-56 overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-8 md:p-10 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-6">
                        <h3 className="text-2xl font-display font-bold text-primary-green leading-tight group-hover:text-accent-green transition-colors">{item.name}</h3>
                        {item.tag && (
                          <span className="px-3 py-1 bg-accent-green text-cream text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm shrink-0 whitespace-nowrap">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-primary-green/40 text-sm mb-10 leading-relaxed min-h-[3rem] font-medium">
                        {item.description || "Crafted with local ingredients and artisan passion."}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Pizza Size Logic */}
                      {typeof item.price === "object" && 'reg' in item.price ? (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-primary-green/5 p-1.5 rounded-2xl w-full max-w-[200px]">
                              <button
                                onClick={() => setPizzaSizes(prev => ({ ...prev, [item.name]: "reg" }))}
                                className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${(pizzaSizes[item.name] || "reg") === "reg" ? "bg-accent-green text-cream shadow-lg" : "text-primary-green/40 hover:text-primary-green"
                                  }`}
                              >
                                8" REG
                              </button>
                              <button
                                onClick={() => setPizzaSizes(prev => ({ ...prev, [item.name]: "lg" }))}
                                className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${pizzaSizes[item.name] === "lg" ? "bg-accent-green text-cream shadow-lg" : "text-primary-green/40 hover:text-primary-green"
                                  }`}
                              >
                                12" LG
                              </button>
                            </div>
                            <div className="text-4xl font-display font-bold text-primary-green tracking-tighter">
                              ₹{pizzaSizes[item.name] === "lg" ? item.price.lg : item.price.reg}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="text-4xl font-display font-bold text-primary-green tracking-tighter">
                            ₹{typeof item.price === "number" ? item.price : 0}
                          </div>
                          <span className="text-[10px] font-mono text-primary-green/20 uppercase tracking-widest font-bold">Standard Size</span>
                        </div>
                      )}

                      <div className="w-full h-px bg-primary-green/5" />

                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-mono text-primary-green/30 uppercase tracking-[0.2em] font-bold">Chef recommended</p>
                        <button
                          onClick={() => setIsOrderModalOpen(true)}
                          className="w-14 h-14 rounded-2xl bg-accent-green text-cream flex items-center justify-center shadow-lg transition-all hover:scale-110 hover:shadow-accent-green/20"
                        >
                          <ChevronRight className="w-8 h-8" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Add-ons Section */}
        <div className="bg-white/5 border border-white/10 p-16 rounded-[4rem] mb-32 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-green/10 rounded-full blur-[100px] -mr-32 -mt-32 transition-colors group-hover:bg-accent-green/20" />
          <h3 className="text-3xl font-display font-bold text-cream mb-10 relative z-10">Enhance Your Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {addOns.map((addon) => (
              <div key={addon.name} className="flex justify-between items-center bg-primary-green/40 p-8 rounded-3xl border border-white/5 hover:border-accent-green/20 transition-all">
                <div>
                  <span className="font-display font-bold text-xl text-cream block mb-1">{addon.name}</span>
                  <span className="text-[10px] font-mono text-cream/30 uppercase tracking-widest">Optional Extra</span>
                </div>
                <div className="text-3xl font-display font-bold text-accent-green">₹{addon.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-20 pb-40">
          <h2 className="text-5xl md:text-8xl font-display font-bold text-cream mb-16 tracking-tighter">Order your favorite <br /><span className="text-accent-green">pizza now.</span></h2>
          <div className="flex flex-wrap justify-center gap-10">
            <button onClick={() => setIsOrderModalOpen(true)} className="px-14 py-6 bg-[#CB202D] text-white rounded-2xl font-black tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">ZOMATO</button>
            <button onClick={() => setIsOrderModalOpen(true)} className="px-14 py-6 bg-[#FC8019] text-white rounded-2xl font-black tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">SWIGGY</button>
            <button onClick={() => setIsOrderModalOpen(true)} className="px-14 py-6 bg-[#6533FF] text-white rounded-2xl font-black tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">MAGICPIN</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// --- App Entry ---

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-primary-green flex flex-col items-center justify-center text-center p-6">
        <div className="relative mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-accent-green rounded-2xl glow-soft flex items-center justify-center"
          >
            <Leaf className="w-10 h-10 text-cream" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-mono text-cream/40 uppercase tracking-[0.5em]">Harvesting Flavor...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="selection:bg-accent-green selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>

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
        `}</style>
      </div>
    </BrowserRouter>
  );
}
