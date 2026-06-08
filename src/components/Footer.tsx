import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import LogoImage from "../Assets/crustica-logo.webp";

export const Footer = () => {
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
              {[
                { Icon: Instagram, href: "https://www.instagram.com/crusticapizza_/" },
                { Icon: Facebook, href: "https://www.facebook.com/people/Crustica-pizza/61585704837699/" }
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2, color: "#aedb0d" }}
                  href={href}
                  className="text-white/70 transition-all duration-500"
                  target="_blank"
                  rel="noopener noreferrer"
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
          <p className="font-mono text-[9px] sm:text-[10px] text-white/60 uppercase font-black md:text-left leading-relaxed">
            © 2026 Crustica Pizza. All Rights Reserved.
          </p>
          <div className="flex gap-20 text-[9px] font-mono text-white/70 tracking-[0.4em] font-black">
            <span className="hover:text-accent-green cursor-pointer transition-all duration-500">Privacy</span>
            <span className="hover:text-accent-green cursor-pointer transition-all duration-500">Terms</span>
            <span className="hover:text-accent-green cursor-pointer transition-all duration-500">Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
