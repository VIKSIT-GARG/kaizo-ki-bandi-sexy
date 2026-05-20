"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapCanvas from "@/scenes/MapCanvas";
import { X, Calendar, Map, ArrowLeft } from "lucide-react";
import data from "@/content/data.json";

interface PinData {
  id: string;
  location: string;
  title: string;
  description: string;
  date: string;
}

export const LongDistanceMap: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<PinData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePinSelect = (pin: PinData | null) => {
    setSelectedPin(pin);
  };

  const handleClose = () => {
    setSelectedPin(null);
  };

  const pins = data.mapPins;

  return (
    <section className="relative w-full h-screen bg-[#fdfbf7] text-[#2d3436] overflow-hidden flex flex-col md:flex-row">
      
      {/* 3D Map Canvas */}
      {isClient && (
        <MapCanvas
          pins={pins}
          selectedPinId={selectedPin ? selectedPin.id : null}
          onPinSelect={handlePinSelect}
        />
      )}

      {/* Grid overlay for aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(140,161,165,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(140,161,165,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Soft Vignetting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(253,251,247,0.7)_100%)] pointer-events-none" />

      {/* Main Instructions Banner */}
      <div className="absolute top-8 left-8 z-10 select-none max-w-sm pointer-events-none">
        <h2 className="text-2xl md:text-3xl font-serif text-[#2d3436] tracking-tight mb-2">
          The Distance <span className="italic text-[#ffb7c5]">Between Us</span>
        </h2>
        <p className="text-[#636e72] font-sans text-xs leading-relaxed max-w-xs bg-white/50 backdrop-blur-sm p-2 rounded-sm border border-[#e0d6c8]/50">
          600 kilometers feels like nothing when I'm talking to you. Click the floating pins to explore our shared moments.
        </p>
      </div>

      {/* SIDE/CENTER OVERLAY CARD FOR ACTIVE PIN */}
      <div className="absolute right-0 bottom-0 md:top-0 w-full md:w-[480px] h-3/5 md:h-full z-20 p-6 md:p-8 flex flex-col justify-end md:justify-center pointer-events-none">
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[90%] md:h-[80%] rounded-sm bg-white/80 border border-[#e0d6c8] p-6 md:p-8 shadow-xl flex flex-col justify-between overflow-y-auto pointer-events-auto backdrop-blur-xl relative"
            >
              {/* Top Bar Actions */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#8ca1a5] uppercase flex items-center gap-1.5 border border-[#8ca1a5]/20 px-2.5 py-1 rounded-sm bg-white/50">
                  <Map className="w-3.5 h-3.5 text-[#ffb7c5]" />
                  {selectedPin.location}
                </span>
                
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full bg-black/5 border border-black/5 text-[#636e72] hover:text-[#ff4d6d] hover:bg-black/10 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Memory Information */}
              <div>
                <span className="text-xs font-mono text-[#8ca1a5] flex items-center gap-1 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#ffb7c5]" />
                  {selectedPin.date}
                </span>
                
                <h3 className="text-3xl font-serif text-[#2d3436] tracking-wide mb-6">
                  {selectedPin.title}
                </h3>
                
                <p className="text-[#636e72] font-sans text-base leading-relaxed mb-8">
                  {selectedPin.description}
                </p>
                
                {/* Secret message nested box */}
                <div className="p-4 rounded-sm bg-[#fdfbf7] border border-[#e0d6c8] relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-[#ffb7c5] opacity-5 rounded-bl-full" />
                   <p className="font-handwriting text-2xl text-[#2d3436] leading-relaxed">
                     君に届け (Reaching You)
                   </p>
                </div>
              </div>

              {/* Back Command */}
              <button
                onClick={handleClose}
                className="mt-8 w-full py-3 rounded-sm border border-[#e0d6c8] hover:border-[#ffb7c5] text-[#636e72] hover:text-[#2d3436] font-sans text-xs font-semibold tracking-wider flex items-center gap-2 justify-center bg-white hover:bg-[#fdfbf7] cursor-pointer transition-all shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#ffb7c5]" />
                Return to Map
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default LongDistanceMap;
