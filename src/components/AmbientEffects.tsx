"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Sakura petal
const SakuraPetal: React.FC<{ index: number }> = ({ index }) => {
  const style = useMemo(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 12 + Math.random() * 10,
    size: 6 + Math.random() * 8,
    drift: (Math.random() - 0.5) * 120,
  }), []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[5]"
      style={{ left: `${style.left}%`, top: -20 }}
      animate={{
        y: [0, 1200],
        x: [0, style.drift],
        rotate: [0, 360 + Math.random() * 360],
        opacity: [0, 0.55, 0.55, 0],
      }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        delay: style.delay,
        ease: "linear",
      }}
    >
      <div
        className="bg-[#E8B4B8]"
        style={{
          width: style.size,
          height: style.size,
          borderRadius: "100% 0 100% 0",
          opacity: 0.6,
        }}
      />
    </motion.div>
  );
};

// Floating heart
const FloatingHeart: React.FC<{ index: number }> = ({ index }) => {
  const style = useMemo(() => ({
    left: 10 + Math.random() * 80,
    delay: Math.random() * 20,
    duration: 16 + Math.random() * 12,
    size: 8 + Math.random() * 6,
  }), []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[5] text-[#E8B4B8]"
      style={{ left: `${style.left}%`, bottom: -20, fontSize: style.size }}
      animate={{
        y: [0, -1200],
        x: [0, (Math.random() - 0.5) * 60],
        opacity: [0, 0.3, 0.3, 0],
      }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        delay: style.delay,
        ease: "linear",
      }}
    >
      ♥
    </motion.div>
  );
};

// Twinkling sparkle
const Sparkle: React.FC<{ index: number }> = ({ index }) => {
  const style = useMemo(() => ({
    left: Math.random() * 95,
    top: Math.random() * 95,
    delay: Math.random() * 8,
    duration: 2 + Math.random() * 3,
  }), []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[5]"
      style={{ left: `${style.left}%`, top: `${style.top}%` }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        delay: style.delay,
        ease: "easeInOut",
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#F5E6CC] shadow-[0_0_6px_rgba(245,230,204,0.8)]" />
    </motion.div>
  );
};

export const AmbientEffects: React.FC = () => {
  return (
    <>
      {Array.from({ length: 18 }).map((_, i) => (
        <SakuraPetal key={`petal-${i}`} index={i} />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <FloatingHeart key={`heart-${i}`} index={i} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <Sparkle key={`sparkle-${i}`} index={i} />
      ))}
    </>
  );
};

export default AmbientEffects;
