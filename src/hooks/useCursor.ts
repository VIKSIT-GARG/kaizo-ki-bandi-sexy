"use client";

import { useState, useEffect } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export const useCursor = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [smoothMousePos, setSmoothMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<string>("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth mouse position interpolation (lerp)
  useEffect(() => {
    let animationFrameId: number;
    
    const updateSmoothPosition = () => {
      setSmoothMousePos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        // Adjust standard 0.1 for cursor speed trailing
        const lerpFactor = 0.15;
        
        // If difference is tiny, snap to target
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return mousePos;
        }

        return {
          x: prev.x + dx * lerpFactor,
          y: prev.y + dy * lerpFactor,
        };
      });

      animationFrameId = requestAnimationFrame(updateSmoothPosition);
    };

    animationFrameId = requestAnimationFrame(updateSmoothPosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor]");
      
      if (interactiveEl) {
        setIsHovering(true);
        setHoverType(interactiveEl.getAttribute("data-cursor") || "pointer");
      } else {
        setIsHovering(false);
        setHoverType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return {
    mousePos,
    smoothMousePos,
    isHovering,
    hoverType,
  };
};
