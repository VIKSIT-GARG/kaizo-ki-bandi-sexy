"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { Cat, RefreshCw } from "lucide-react";

export const Ending: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const { setVolume } = useAudio();
  const [easterEggFound, setEasterEggFound] = useState(false);
  const hasReducedVolume = useRef(false);

  // Soften volume when reaching the very end for cinematic atmosphere
  // Using a ref to prevent infinite re-render loops
  useEffect(() => {
    if (isInView && !hasReducedVolume.current) {
      hasReducedVolume.current = true;
      setVolume(0.12);
    } else if (!isInView && hasReducedVolume.current) {
      hasReducedVolume.current = false;
      setVolume(0.4);
    }
  }, [isInView, setVolume]);

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen text-[#2d3436] overflow-hidden flex flex-col items-center justify-center px-4"
    >
      {/* Background paper texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply paper-texture" />

      {/* Soft Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(245,230,211,0.9)_100%)] pointer-events-none" />

      {/* Easter Egg: Kurumi's Cat (Pedro / Pedro-chan) */}
      <div className="absolute top-1/4 left-1/4 md:left-1/3 opacity-20 hover:opacity-100 transition-opacity duration-1000 cursor-pointer z-20">
        <Cat
          className={`w-6 h-6 text-[#ffb7c5] transition-transform duration-700 ${easterEggFound ? "scale-125" : ""}`}
          onClick={() => setEasterEggFound(true)}
        />
        <AnimatePresence>
          {easterEggFound && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-6 left-8 bg-white px-2 py-1 rounded-sm shadow-sm border border-[#e0d6c8] text-[10px] font-mono text-[#8ca1a5] whitespace-nowrap"
            >
              Meow. (I found Pedro!)
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Drawing Floral Motif / Reaching out */}
      <div className="relative mb-12 flex items-center justify-center z-10">
        <svg
          viewBox="0 0 100 100"
          className="w-32 h-32 md:w-48 md:h-48"
        >
          {/* Simple elegant leaf/petal stroke */}
          <motion.path
            d="M 50 90 C 20 90, 10 50, 50 10 C 90 50, 80 90, 50 90 Z"
            fill="transparent"
            stroke="#ffb7c5"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ strokeDasharray: "300", strokeDashoffset: "300" }}
            animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 300 }}
            transition={{ duration: 4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </svg>
      </div>

      {/* Final Slow-reveal Message */}
      <div className="relative text-center max-w-xl z-10 mb-12">
        <motion.h2
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-serif leading-tight tracking-wide text-[#2d3436]"
        >
          Thank you for <br />
          <span className="italic text-[#8ca1a5]">finding me, Ruri.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 3.5, duration: 2.0 }}
          className="mt-6 text-[#636e72] font-handwriting text-xl md:text-2xl"
        >
          Happy 1st Anniversary, jaanu. ❤️
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 5.0, duration: 2.0 }}
          className="mt-3 text-[#8ca1a5] font-handwriting text-base italic"
        >
          — yours and only yours, Sky
        </motion.p>
      </div>

      {/* Relive Experience Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 4.5, duration: 1.5 }}
        className="z-10"
      >
        <button
          onClick={handleRestart}
          className="relative px-6 py-2.5 rounded-sm text-xs font-semibold tracking-widest text-[#636e72] border border-[#e0d6c8] hover:border-[#ffb7c5] hover:bg-white transition-all duration-500 flex items-center gap-3 group cursor-pointer bg-[#fdfbf7]"
        >
          <RefreshCw className="w-3.5 h-3.5 group-hover:-rotate-180 transition-transform duration-700 text-[#ffb7c5]" />
          RELIVE OUR JOURNEY
        </button>
      </motion.div>

      {/* Little branding trademark footer */}
      <div className="absolute bottom-6 text-[9px] font-mono tracking-widest text-[#8ca1a5]/50 uppercase">
        Written with sincerity • Sky & Ruri • One Year Of Us
      </div>
    </section>
  );
};

export default Ending;
