"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import LoveLetter from "@/components/LoveLetter";
import SharedBraincells from "@/components/SharedBraincells";
import LongDistanceMap from "@/components/LongDistanceMap";
import PhotoGallery from "@/components/PhotoGallery";
import Reasons from "@/components/Reasons";
import Ending from "@/components/Ending";
import MusicPlayer from "@/components/MusicPlayer";
import AmbientEffects from "@/components/AmbientEffects";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!hasEntered) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = "unset";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
  }, [hasEntered, isMounted]);

  if (!isMounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #F5E6D3 0%, #FFF0E6 100%)" }}>
        <span className="text-[#D4A5A8] font-mono text-xs tracking-widest uppercase">
          Waiting for the train...
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {!hasEntered && (
        <Loader onEnter={() => setHasEntered(true)} />
      )}

      {hasEntered && (
        <>
          {/* Global ambient effects */}
          <AmbientEffects />

          <Hero />
          <Timeline />
          <LoveLetter />
          <SharedBraincells />
          <LongDistanceMap />
          <PhotoGallery />
          <Reasons />
          <Ending />
          <MusicPlayer />
        </>
      )}
    </div>
  );
}
