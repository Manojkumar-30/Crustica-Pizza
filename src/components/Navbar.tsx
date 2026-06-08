import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu as MenuIcon, X, Utensils, Zap, Star } from "lucide-react";
import LogoImage from "../Assets/crustica-logo.png";
import { OrderModal } from "./OrderModal";

export const Navbar = () => {
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
                  className="w-full max-w-sm py-6 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 rounded-[2rem] bg-accent-green text-primary-green font-black text-2xl shadow-[0_20px_50px_rgba(174, 219, 13, 0.3)] hover:scale-105 active:scale-95 transition-transform"
                >
                  ORDER NOW
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-700 px-4 md:px-6 lg:px-8 py-4 ${isNavVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
          } ${isScrolled || isMobileMenuOpen
            ? "backdrop-blur-xl"
            : ""
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="h-[78px] bg-black/60 backdrop-blur-xl rounded-full px-6 lg:px-10 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/5">

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img
                src={LogoImage}
                alt="Crustica Logo"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10 xl:gap-14">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-accent-green text-[11px] font-semibold uppercase tracking-[0.28em] transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 lg:gap-8">
              <div className="hidden xl:flex items-center gap-2 text-white text-xs">
                <Phone className="w-4 h-4 text-accent-green" />
                <span>+91 81977 99090</span>
              </div>

              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="hidden sm:flex items-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 justify-center h-12 px-8 rounded-full bg-accent-green text-black font-bold tracking-wider text-xs hover:scale-105 transition-all"
              >
                ORDER NOW
              </button>

              <button
                className="lg:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
              </button>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};
