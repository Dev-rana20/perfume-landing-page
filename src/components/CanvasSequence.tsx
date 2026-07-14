"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Draws an image onto canvas using "object-fit: cover; object-position: right center"
 * maths — implemented manually so it works correctly on every device and screen size.
 * sx/sy/sw/sh are the SOURCE crop rectangle (in image pixels).
 * We never use ctx.scale() so there's no transform state to worry about.
 */
function drawCoverRight(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  if (!img.complete || img.naturalWidth === 0) return;

  const iW = img.naturalWidth;
  const iH = img.naturalHeight;

  // Scale factor needed so the image fully covers the canvas (cover)
  const scale = Math.max(canvasW / iW, canvasH / iH);

  const scaledW = iW * scale;
  const scaledH = iH * scale;

  // Anchor to RIGHT (x) and CENTER (y)
  const dx = canvasW - scaledW;   // ≤ 0  — image overflows to the left (intentional)
  const dy = (canvasH - scaledH) / 2;

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, dx, dy, scaledW, scaledH);
}

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Track physical canvas dimensions separately from CSS ─────
    let physW = 0;
    let physH = 0;

    /**
     * Resize the canvas backing store to match the physical display pixels.
     * We do NOT use ctx.scale() — instead we pass physW/physH to drawImage
     * directly so DPR scaling is baked into the pixel buffer dimensions.
     */
    const syncCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      physW = Math.round(window.innerWidth * dpr);
      physH = Math.round(window.innerHeight * dpr);
      canvas.width = physW;
      canvas.height = physH;
      // Keep the CSS size at exactly 100vw × 100vh
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };

    syncCanvasSize();

    // ── Preload all frames ────────────────────────────────────────
    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/frames_png/ezgif-frame-${i.toString().padStart(3, "0")}.png`;
      images.push(img);
    }

    // ── Render current frame ─────────────────────────────────────
    const render = () => {
      const idx = Math.min(totalFrames - 1, Math.max(0, Math.round(state.frame)));
      const img = images[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        drawCoverRight(ctx, img, physW, physH);
      }
    };

    // Render frame 0 as soon as it loads (or immediately if cached)
    if (images[0].complete) {
      render();
    } else {
      images[0].onload = render;
    }

    // ── GSAP scroll scrub ─────────────────────────────────────────
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

    // ── Window resize + orientation change ────────────────────────
    let resizeRaf: number;
    const handleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        syncCanvasSize();
        render();
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] mix-blend-darken overflow-hidden">
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
