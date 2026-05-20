"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = () => {
  useEffect(() => {
    // Check if we are running in the browser
    if (typeof window === "undefined") return;

    // Initialize Lenis with custom smooth scrolling settings
    const lenis = new Lenis({
      duration: 1.3, // Inertia transition length
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like exponential decay
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;
    
    const updateScroll = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    animationFrameId = requestAnimationFrame(updateScroll);

    // Make lenis instance available globally for animations if needed
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
};

export default SmoothScroll;
