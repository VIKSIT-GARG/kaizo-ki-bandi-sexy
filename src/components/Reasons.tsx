"use client";

import React from "react";
import { motion } from "framer-motion";
import data from "@/content/data.json";

interface Reason {
  id: number;
  title: string;
  content: string;
}

const ReasonCard: React.FC<{
  reason: Reason;
  index: number;
}> = ({ reason, index }) => {
  const rotation = (index % 3 === 0 ? -2 : index % 3 === 1 ? 1 : -1.5) + (index * 0.5 - 1);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      style={{ rotate: rotation }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative w-full h-64 p-4 bg-white text-[#2d3436] shadow-sm rounded-sm border border-[#e0d6c8] overflow-hidden"
    >
      {/* Background grain */}
      <div className="absolute inset-0 opacity-10 pointer-events-none paper-texture" />
      
      {/* Soft Bloom overlay on hover */}
      <div className="absolute inset-0 bg-[#ffb7c5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="w-full h-32 bg-[#fdfbf7] rounded-sm flex items-center justify-center mb-4 border border-[#e0d6c8]/50">
         <h3 className="text-xl font-serif tracking-wide text-center px-4">
           {reason.title}
         </h3>
      </div>

      <div className="text-center font-handwriting">
        <p className="text-lg text-[#636e72] leading-snug group-hover:text-[#2d3436] transition-colors duration-500">
          {reason.content}
        </p>
      </div>

      {/* Tiny Sakura Petal Decorative */}
      <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-40 transition-opacity duration-1000">
        <div className="w-2 h-2 bg-[#ffb7c5] rounded-full" style={{ borderRadius: "100% 0 100% 0" }} />
      </div>
    </motion.div>
  );
};

export const Reasons: React.FC = () => {
  const reasons = data.reasons;

  return (
    <section className="relative w-full py-24 md:py-36 overflow-hidden px-4 md:px-8">
      {/* Header */}
      <div className="relative text-center max-w-2xl mx-auto mb-16 md:mb-24 z-10">
        <h2 className="text-3xl md:text-5xl font-serif text-[#2d3436] tracking-tight mb-4">
          Quiet <span className="italic text-[#ffb7c5]">Certainties</span>
        </h2>
        <div className="w-12 h-[2px] bg-[#ffb7c5] mx-auto mb-6 rounded-full" />
        <p className="text-[#636e72] font-sans text-sm md:text-base leading-relaxed">
          The small, soft things that make me realize how much I cherish you.
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10">
        {reasons.map((reason, idx) => (
          <ReasonCard
            key={reason.id}
            reason={reason}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};

export default Reasons;
