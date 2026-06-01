import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { MenuSection } from "../components/MenuSection";
import { ProcessSection } from "../components/ProcessSection";
import { GallerySection } from "../components/GallerySection";
import { OrderSection } from "../components/OrderSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ContactSection } from "../components/ContactSection";

export const HomePage = () => (
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
