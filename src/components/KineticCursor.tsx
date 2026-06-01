import { useEffect, useRef } from "react";
import gsap from "gsap";

export const KineticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div ref={cursorRef} className="w-10 h-10 border border-accent-green/50 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
      <div ref={cursorDotRef} className="w-1.5 h-1.5 bg-accent-green rounded-full fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};
