"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Heart } from "lucide-react";
import data from "@/content/data.json";

interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  ratio: string;
}

export const PhotoGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const photos = data.gallery;

  return (
    <section className="relative w-full min-h-screen py-24 overflow-hidden px-4 md:px-8">
      {/* Ambient blurs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#E8B4B8]/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F5E6CC]/12 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative text-center max-w-2xl mx-auto mb-20 z-10">
        <h2 className="text-3xl md:text-5xl font-serif text-[#2d3436] tracking-tight mb-4">
          Our <span className="italic text-[#C85A6B]">Scrapbook</span>
        </h2>
        <div className="w-12 h-[2px] bg-[#C85A6B] mx-auto mb-6 rounded-full" />
        <p className="text-[#8B7355] font-sans text-sm md:text-base leading-relaxed">
          Drag them around, or click to zoom into our captured moments.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="columns-2 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {photos.map((photo, index) => {
            const rotation = (index % 3 === 0 ? -3 : index % 3 === 1 ? 2 : -1.5) + (index * 0.3 - 0.5);

            return (
              <motion.div
                key={photo.id}
                drag
                dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
                dragElastic={0.15}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 15 }}
                whileDrag={{ scale: 1.05, zIndex: 30, rotate: rotation * 0.4 }}
                style={{ rotate: rotation }}
                className="break-inside-avoid inline-block w-full p-3 bg-white/90 backdrop-blur-sm text-[#2d3436] shadow-sm rounded-lg transform hover:scale-[1.02] hover:-translate-y-1 hover:z-20 transition-transform duration-300 select-none cursor-grab active:cursor-grabbing border border-[#E8B4B8]/25"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#FFF8F0] mb-3 rounded-md group">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  <button
                    onClick={() => setActivePhoto(photo)}
                    className="absolute inset-0 bg-[#2d3436]/15 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
                  >
                    <div className="p-3 rounded-full bg-white/70 backdrop-blur-sm border border-[#E8B4B8]/40 text-[#C85A6B] hover:scale-110 active:scale-95 transition-all">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </button>
                </div>
                <div className="text-center font-handwriting min-h-[40px] flex flex-col justify-center items-center px-1">
                  <p className="text-base md:text-lg text-[#8B7355] leading-snug">{photo.caption}</p>
                  <div className="flex gap-1 mt-1 opacity-25">
                    <Heart className="w-2 h-2 fill-[#C85A6B] text-[#C85A6B]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#F5E6D3]/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActivePhoto(null)} />
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="relative w-full max-w-3xl bg-white/95 backdrop-blur-lg rounded-xl border border-[#E8B4B8]/30 p-4 md:p-6 shadow-2xl flex flex-col items-center justify-center z-10"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute -top-10 right-0 md:-top-4 md:-right-10 p-2 rounded-full bg-white border border-[#E8B4B8]/40 text-[#8B7355] hover:text-[#C85A6B] hover:bg-white cursor-pointer transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-full max-h-[70vh] rounded-lg overflow-hidden border border-[#E8B4B8]/20 mb-4">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.caption}
                  className="w-full h-full object-contain max-h-[70vh] mx-auto"
                />
              </div>
              <div className="text-center w-full max-w-xl">
                <p className="font-handwriting text-2xl md:text-3xl text-[#C85A6B] leading-snug">
                  {activePhoto.caption}
                </p>
                <span className="text-[10px] font-mono tracking-widest text-[#D4A5A8] uppercase mt-2 block">
                  Scrapbook Memory
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
