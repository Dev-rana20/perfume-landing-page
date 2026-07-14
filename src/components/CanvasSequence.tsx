"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Draws a source image onto canvas with "object-fit: cover; object-position: right center"
 * behaviour, implemented manually so it works on all devices.
 */
function drawCoverRight(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  // Scale that fills the canvas completely (cover)
  const scale = Math.max(canvasW / imgW, canvasH / imgH);

  const scaledW = imgW * scale;
  const scaledH = imgH * scale;

  // Anchor horizontally to the RIGHT, vertically centered
  const offsetX = canvasW - scaledW; // negative → image overflows left (that's fine)
  const offsetY = (canvasH - scaledH) / 2;

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
}

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };

    // ── Resize canvas to match physical display pixels ──────────
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      // CSS size stays 100vw × 100vh
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.scale(dpr, dpr); // so draw calls use CSS px units
    };

    resizeCanvas();

    // ── Preload frames ───────────────────────────────────────────
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/frames_png/ezgif-frame-${i.toString().padStart(3, "0")}.png`;
      images.push(img);
    }

    // ── Render helpers ───────────────────────────────────────────
    const render = () => {
      const idx = Math.min(totalFrames - 1, Math.max(0, Math.round(state.frame)));
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Draw coordinates use CSS px because we ctx.scale(dpr, dpr) above
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      drawCoverRight(ctx, img, cssW, cssH);
    };

    images[0].onload = () => render();

    // ── GSAP scroll scrub ────────────────────────────────────────
    const trigger = gsap.to(state, {
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

    // ── Resize handler ───────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        render();
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    // Also handle orientation change on mobile
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] mix-blend-darken overflow-hidden">
      {/* Canvas is sized via JS to exactly fill the viewport at device pixel ratio */}
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
