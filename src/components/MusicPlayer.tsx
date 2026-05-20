"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, SkipForward, SkipBack, Play, Pause } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

export const MusicPlayer: React.FC = () => {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    seek,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const prevVolume = useRef(volume);

  const currentTrack = tracks[currentTrackIndex];

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(prevVolume.current);
      setIsMuted(false);
    } else {
      prevVolume.current = volume;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-64 bg-white/90 backdrop-blur-lg rounded-xl border border-[#E8B4B8]/30 shadow-lg p-4"
          >
            {/* Track Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E8B4B8]/30 flex-shrink-0">
                <img
                  src={currentTrack?.cover || "/images/IMG_20260521_001540_001.webp"}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[#2d3436] font-sans text-sm font-semibold truncate">
                  {currentTrack?.title || "Untitled"}
                </p>
                <p className="text-[#8ca1a5] text-[10px] font-mono tracking-wider truncate">
                  {currentTrack?.artist || "Unknown"}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div
                className="w-full h-1 bg-[#E8B4B8]/20 rounded-full cursor-pointer relative group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  seek(pct * duration);
                }}
              >
                <div
                  className="h-full bg-[#C85A6B] rounded-full transition-all duration-150 relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#C85A6B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] font-mono text-[#8ca1a5]">{formatTime(currentTime)}</span>
                <span className="text-[9px] font-mono text-[#8ca1a5]">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <button onClick={prevTrack} className="text-[#8ca1a5] hover:text-[#C85A6B] transition-colors cursor-pointer">
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-[#C85A6B] text-white flex items-center justify-center hover:bg-[#a94858] transition-colors cursor-pointer shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button onClick={nextTrack} className="text-[#8ca1a5] hover:text-[#C85A6B] transition-colors cursor-pointer">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={handleMuteToggle} className="text-[#8ca1a5] hover:text-[#C85A6B] transition-colors cursor-pointer">
                {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={(e) => {
                  const v = parseInt(e.target.value) / 100;
                  setVolume(v);
                  if (v > 0) setIsMuted(false);
                }}
                className="w-full h-1 bg-[#E8B4B8]/20 rounded-full appearance-none cursor-pointer accent-[#C85A6B] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C85A6B]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Control Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-lg border border-[#E8B4B8]/40 shadow-lg flex items-center justify-center cursor-pointer group transition-colors hover:border-[#C85A6B]/40 relative"
      >
        <Music className={`w-5 h-5 transition-colors ${isPlaying ? "text-[#C85A6B]" : "text-[#8ca1a5]"}`} />
        {isPlaying && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#C85A6B] rounded-full animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
