"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeartCanvas from "@/scenes/HeartCanvas";
import { ArrowDown } from "lucide-react";

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollDown = () => {
    const timelineSection = document.getElementById("timeline-section");
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Heart R3F Canvas */}
      {isClient && <HeartCanvas mousePos={mousePos} />}

      {/* Warm Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(245,230,211,0.85)_100%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl select-none">

        {/* Floating handwritten notes */}
        <motion.div
          animate={{
            x: mousePos.x * 15 - 10,
            y: mousePos.y * -15 - 10,
            rotate: [2, 3, 2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-36 -left-20 hidden md:block px-6 py-5 w-56 rounded-lg bg-white/70 backdrop-blur-sm border border-[#E8B4B8]/30 shadow-sm origin-top-left -rotate-3"
        >
          <span className="font-handwriting text-[#8B7355] text-xl leading-relaxed">
            &ldquo;I want to reach you, even if it takes time.&rdquo;
          </span>
        </motion.div>

        <motion.div
          animate={{
            x: mousePos.x * -15 + 10,
            y: mousePos.y * 15 + 10,
            rotate: [-1, -2, -1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-32 -right-16 hidden md:block px-6 py-5 w-56 rounded-lg bg-white/70 backdrop-blur-sm border border-[#E8B4B8]/30 shadow-sm origin-bottom-right rotate-2"
        >
          <span className="font-handwriting text-[#8B7355] text-xl leading-relaxed">
            &ldquo;You complete me, jaanu.&rdquo;
          </span>
        </motion.div>

        {/* Super Title */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.3em] text-[#D4A5A8] font-semibold mb-4"
        >
          Delhi to Jammu • 600 km of love
        </motion.span>

        {/* Massive Title */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.0, duration: 2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif text-[#2d3436] leading-tight tracking-tight mb-8"
        >
          From Sky <br />
          <span className="italic text-[#C85A6B]">To Ruri.</span>
        </motion.h1>

        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 2.0 }}
          className="px-8 py-5 rounded-xl bg-white/50 backdrop-blur-md max-w-lg mb-12 border border-[#E8B4B8]/30 shadow-sm"
        >
          <p className="text-[#8B7355] font-sans text-sm md:text-base leading-relaxed">
            A quiet journey across 600 kilometers, written in shared smiles, late-night calls, and a love that slowly reached across the distance. 君に届け。
          </p>
        </motion.div>

        {/* Scroll CTA */}
        <motion.button
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 1.5 }}
          onClick={handleScrollDown}
          className="relative px-6 py-3 rounded-full text-xs font-semibold tracking-widest text-[#2d3436] border border-[#C85A6B]/25 hover:border-[#C85A6B]/50 hover:bg-white/50 transition-all duration-500 flex items-center gap-3 group cursor-pointer"
        >
          BEGIN OUR STORY
          <ArrowDown className="w-4 h-4 text-[#C85A6B] group-hover:translate-y-1 transition-transform duration-500" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
