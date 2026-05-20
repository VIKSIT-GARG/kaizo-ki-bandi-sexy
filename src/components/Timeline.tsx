"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Train, Eye, EyeOff, Music, Play, Pause, MapPin } from "lucide-react";
import data from "@/content/data.json";

interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  gif: string;
  audio: string;
  hiddenNote: string;
}

const TimelineCard: React.FC<{ milestone: Milestone; index: number }> = ({ milestone, index }) => {
  const [showNote, setShowNote] = useState(false);
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Cinematic ease out
      className={`relative flex w-full justify-start md:justify-between items-center mb-16 md:mb-24 ${
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="hidden md:block w-5/12" />

      {/* Central Connector Node - Train Stop Style */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20 bg-[var(--background)] p-1 rounded-full">
        <motion.div
          whileInView={{ scale: [0.5, 1.2, 1], borderColor: ["#d1e8e2", "#ffb7c5", "#ffb7c5"] }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-4 h-4 rounded-full border-4 border-[#ffb7c5] bg-white shadow-sm flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffb7c5]" />
        </motion.div>
      </div>

      {/* Card Content - Ticket/Passport Aesthetic */}
      <div className="w-full md:w-5/12 pl-12 md:pl-0">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="p-6 rounded-sm bg-white/70 backdrop-blur-md border border-[#8ca1a5]/20 shadow-md relative group overflow-hidden"
        >
          {/* Subtle paper grain internal overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none paper-texture" />

          {/* Polaroid Image Container */}
          <div className="relative w-full h-56 md:h-64 overflow-hidden bg-[#fdfbf7] mb-5 border-[6px] border-white shadow-sm rounded-sm">
            <img
              src={milestone.image}
              alt={milestone.title}
              className="w-full h-full object-cover filter contrast-[0.95] sepia-[0.1]"
              loading="lazy"
            />
            
            {/* Play Sound Snippet overlay */}
            <button
              onClick={() => setIsPlayingLocal(!isPlayingLocal)}
              className="absolute bottom-3 right-3 p-2 rounded-full bg-white/40 backdrop-blur-md border border-white/40 text-[#2d3436] hover:text-[#ffb7c5] hover:bg-white/80 transition-all cursor-pointer z-10 shadow-sm"
              title="Play ambient memory sound"
            >
              {isPlayingLocal ? (
                <div className="flex items-center gap-1 px-1">
                  <span className="w-1 h-3 bg-[#ffb7c5] rounded-full animate-pulse" />
                  <span className="w-1 h-4 bg-[#ffb7c5] rounded-full animate-pulse [animation-delay:0.2s]" />
                  <span className="w-1 h-2 bg-[#ffb7c5] rounded-full animate-pulse [animation-delay:0.4s]" />
                </div>
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </button>

            {/* Stamp Date Tag */}
            <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-bold text-[#636e72] bg-white/80 backdrop-blur-sm rounded-sm border border-black/5 flex items-center gap-1.5 shadow-sm rotate-[-2deg]">
              <MapPin className="w-3 h-3 text-[#ffb7c5]" />
              {milestone.date}
            </span>
          </div>

          {/* Text details */}
          <h3 className="text-2xl font-serif tracking-wide text-[#2d3436] mb-2">
            {milestone.title}
          </h3>
          
          <p className="text-[#636e72] font-sans text-sm leading-relaxed mb-4">
            {milestone.description}
          </p>

          {/* Interactive Hidden Note Section */}
          <div className="border-t border-dashed border-[#8ca1a5]/30 pt-4">
            <button
              onClick={() => setShowNote(!showNote)}
              className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#8ca1a5] hover:text-[#ffb7c5] cursor-pointer transition-colors"
            >
              {showNote ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" /> FOLD NOTE
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" /> UNFOLD NOTE
                </>
              )}
            </button>

            <AnimatePresence initial={false}>
              {showNote && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-sm bg-[#fdfbf7] border border-[#ffb7c5]/30 shadow-inner relative">
                    <div className="absolute top-2 right-3 opacity-10">
                      <Train className="w-6 h-6 text-[#ffb7c5]" />
                    </div>
                    <p className="font-handwriting text-xl leading-relaxed text-[#2d3436]/90">
                      "{milestone.hiddenNote}"
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="timeline-section"
      ref={containerRef}
      className="relative w-full py-24 md:py-36 overflow-hidden px-4 md:px-8"
    >
      {/* Header */}
      <div className="relative text-center max-w-2xl mx-auto mb-20 md:mb-28 z-10">
        <h2 className="text-3xl md:text-5xl font-serif text-[#2d3436] tracking-tight mb-4">
          Journey <span className="italic text-[#ffb7c5]">Together</span>
        </h2>
        <div className="w-12 h-[2px] bg-[#ffb7c5] mx-auto mb-6 rounded-full" />
        <p className="text-[#636e72] font-sans text-sm md:text-base leading-relaxed">
          The stops along the way that brought us closer. 
        </p>
      </div>

      {/* Timeline core tree */}
      <div className="relative max-w-5xl mx-auto">
        
        {/* Dynamic Glowing Center Line - Train Track Style */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 z-10 pointer-events-none">
          {/* Static dashed line */}
          <div className="absolute inset-0 border-l-2 border-dashed border-[#8ca1a5]/20" />
          {/* Dynamic filled line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute inset-0 bg-[#ffb7c5]"
          />
        </div>

        <div className="relative z-20">
          {data.timeline.map((milestone, idx) => (
            <TimelineCard key={milestone.id} milestone={milestone} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
