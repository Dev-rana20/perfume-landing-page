"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = 300;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };
    const mobile = window.innerWidth < 768;

    // Preload images
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
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

    // Helper to draw the frame — on mobile, we center-crop to keep the bottle visible
    const render = () => {
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(airpods.frame)));
      const img = images[frameIndex];

      if (img && img.complete && canvas.width > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mobile) {
          // On mobile: draw the right 60% of the frame (where the bottle lives)
          const srcX = img.naturalWidth * 0.35;
          const srcW = img.naturalWidth * 0.65;
          ctx.drawImage(img, srcX, 0, srcW, img.naturalHeight, 0, 0, canvas.width, canvas.height);
        } else {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    images[0].onload = () => {
      setCanvasSize();
      render();
    };

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
        /* On mobile: center the bottle, on desktop: anchor right */
        className="w-full h-full object-cover md:object-right object-center"
      />
    </div>
  );
}
