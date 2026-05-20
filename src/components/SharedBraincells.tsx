"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, MessageCircleHeart } from "lucide-react";
import data from "@/content/data.json";

export const SharedBraincells: React.FC = () => {
  const [activeJoke, setActiveJoke] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);

  const sectionData = data.sharedBraincells;

  const nextJoke = () => {
    setActiveJoke((prev) => (prev + 1) % sectionData.jokes.length);
  };

  return (
    <section className="relative w-full py-24 md:py-36 bg-[#fdfbf7] text-[#2d3436] overflow-hidden px-4 md:px-8 border-y border-[#e0d6c8]/50">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-[#ffb7c5]/20 rounded-full filter blur-[40px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-[#c4e0e5]/20 rounded-full filter blur-[40px] pointer-events-none" />

      {/* Header */}
      <div className="relative text-center max-w-2xl mx-auto mb-16 md:mb-20 z-10">
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4 text-[#2d3436]">
          {sectionData.title}
        </h2>
        <div className="w-12 h-[2px] bg-[#8ca1a5] mx-auto mb-4 rounded-full" />
        <p className="text-[#636e72] font-sans text-sm md:text-base italic">
          "{sectionData.subtitle}"
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 z-10 relative">
        
        {/* Joke Chat Bubble Interaction */}
        <div className="flex-1 w-full bg-white border border-[#e0d6c8] p-8 rounded-sm shadow-sm relative">
           <div className="absolute -top-4 -left-4 p-2 bg-[#ffb7c5] rounded-full shadow-sm">
             <MessageCircleHeart className="w-6 h-6 text-white" />
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={activeJoke}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 10 }}
               transition={{ duration: 0.3 }}
               className="min-h-[80px] flex items-center"
             >
               <p className="text-[#2d3436] font-sans text-lg font-medium">
                 {sectionData.jokes[activeJoke]}
               </p>
             </motion.div>
           </AnimatePresence>

           <div className="mt-6 flex justify-end">
             <button
               onClick={nextJoke}
               className="px-4 py-2 bg-[#fdfbf7] border border-[#e0d6c8] hover:border-[#8ca1a5] rounded-sm text-xs font-semibold tracking-wider text-[#636e72] transition-colors shadow-sm cursor-pointer"
             >
               NEXT MEMORY
             </button>
           </div>
        </div>

        {/* Dynamic Vibe Slider */}
        <div className="flex-1 w-full bg-white border border-[#e0d6c8] p-8 rounded-sm shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#8ca1a5] mb-8">
            Relationship Dynamic
          </h3>

          <div className="w-full flex flex-col gap-6">
            <div className="flex justify-between w-full text-xs font-semibold text-[#2d3436]">
              <span>Sawako Overthinking</span>
              <span>Kazehaya Confidence</span>
            </div>
            
            <input 
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full h-2 bg-[#e0d6c8] rounded-full appearance-none outline-none cursor-pointer accent-[#ffb7c5]"
            />

            <div className="text-center mt-4">
              <span className="text-[#ffb7c5] font-serif text-2xl">
                {sliderValue < 30 ? "Complete Panic 💦" : sliderValue > 70 ? "Smooth Criminal ✨" : "Awkward Silence 😳"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SharedBraincells;
