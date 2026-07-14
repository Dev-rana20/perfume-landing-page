"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = 300; // Based on ezgif-frame-001.png to ezgif-frame-300.png

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    // Preload images
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Format number to 3 digits (e.g., 001, 012, 145)
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/frames_png/ezgif-frame-${frameNum}.png`;
      images.push(img);
    }

    const setCanvasSize = () => {
      if (images[0] && images[0].complete && images[0].naturalWidth > 0) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = images[0].naturalWidth * dpr;
        canvas.height = images[0].naturalHeight * dpr;
      }
    };

    // Draw first frame when loaded
    images[0].onload = () => {
      setCanvasSize();
      ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    };

    // Helper to draw the frame
    const render = () => {
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(airpods.frame)));
      const img = images[frameIndex];
      
      if (img && img.complete) {
        // Ensure canvas size is set (in case onload was missed or cached)
        if (canvas.width === 0) setCanvasSize();
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // ScrollTrigger to animate the frame property
    const trigger = gsap.to(airpods, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: render,
      },
    });

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      render();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      trigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden mix-blend-darken">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover object-right"
      />
    </div>
  );
}
