"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { Heart } from "lucide-react";

interface LoaderProps {
  onEnter: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onEnter }) => {
  const { play } = useAudio();
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visibleTexts, setVisibleTexts] = useState<string[]>([]);

  const textSequences = [
    "365 days",
    "8,760 hours",
    "525,600 minutes",
    "and counting... with you.",
  ];

  useEffect(() => {
    if (percent < 100) {
      const interval = setInterval(() => {
        setPercent((prev) => {
          const next = prev + Math.floor(Math.random() * 8) + 1;
          return next >= 100 ? 100 : next;
        });
      }, 40);
      return () => clearInterval(interval);
    } else {
      setTimeout(() => setPhase(1), 500);
    }
  }, [percent]);

  useEffect(() => {
    if (phase !== 1) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < textSequences.length) {
        setVisibleTexts((prev) => [...prev, textSequences[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase(2), 1000);
      }
    }, 900);
    return () => clearInterval(interval);
  }, [phase]);

  const handleStart = () => {
    play();
    setPhase(3);
    setTimeout(() => onEnter(), 1200);
  };

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #F5E6D3 0%, #FFF0E6 40%, #FFF8F0 70%, #FDF5EC 100%)" }}
        >
          {/* Warm ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#E8B4B8]/10 rounded-full filter blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F5E6CC]/15 rounded-full filter blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4A5A8]/8 rounded-full filter blur-[60px] animate-breathe" />
          </div>

          {/* Corner flourishes */}
          <span className="absolute top-8 left-8 text-[#E8B4B8]/25 text-2xl select-none">❀</span>
          <span className="absolute top-8 right-8 text-[#E8B4B8]/25 text-2xl select-none scale-x-[-1]">❀</span>
          <span className="absolute bottom-8 left-8 text-[#E8B4B8]/25 text-2xl select-none rotate-180 scale-x-[-1]">❀</span>
          <span className="absolute bottom-8 right-8 text-[#E8B4B8]/25 text-2xl select-none rotate-180">❀</span>

          {phase === 0 && (
            <div className="relative flex flex-col items-center justify-center z-10">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="mb-8"
              >
                <Heart className="w-14 h-14 text-[#C85A6B] fill-[#C85A6B] drop-shadow-sm" />
              </motion.div>
              <div className="w-56 h-[2px] bg-[#E8B4B8]/30 rounded-full overflow-hidden mb-3">
                <motion.div className="h-full bg-[#C85A6B]" style={{ width: `${percent}%` }} />
              </div>
              <span className="text-[#D4A5A8] font-mono text-xs tracking-widest">{percent}%</span>
            </div>
          )}

          {phase >= 1 && (
            <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg z-10">
              <div className="space-y-4 md:space-y-6 mb-12">
                {visibleTexts.map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                    className={`tracking-wide font-sans ${
                      index === textSequences.length - 1
                        ? "text-gradient font-bold text-3xl md:text-5xl mt-8 font-serif"
                        : "text-[#8B7355] text-2xl md:text-4xl font-medium"
                    }`}
                  >
                    {text}
                  </motion.div>
                ))}
              </div>

              {phase === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <button
                    onClick={handleStart}
                    className="relative px-8 py-3.5 rounded-full font-sans font-semibold text-base tracking-wider overflow-hidden group cursor-pointer transition-all duration-300 border border-[#C85A6B]/40 text-[#2d3436] bg-white/70 backdrop-blur-sm hover:bg-[#C85A6B]/10 shadow-sm hover:shadow-md hover:border-[#C85A6B]/60"
                  >
                    <span className="relative flex items-center gap-2 z-10">
                      Begin Our Story
                      <Heart className="w-4 h-4 fill-[#C85A6B] text-[#C85A6B]" />
                    </span>
                  </button>
                  <p className="mt-4 text-[#D4A5A8] font-mono text-[10px] tracking-wider">
                    Turn your volume up for ambient audio 🎧
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
