"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Draws the current video frame onto canvas using
 * "object-fit: cover; object-position: right center" maths,
 * implemented manually so it works correctly on every device and screen size.
 */
function drawCoverRight(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  canvasW: number,
  canvasH: number
) {
  const iW = video.videoWidth;
  const iH = video.videoHeight;
  if (!iW || !iH) return;

  const scale = Math.max(canvasW / iW, canvasH / iH);
  const scaledW = iW * scale;
  const scaledH = iH * scale;

  const dx = canvasW - scaledW; // ≤ 0 — overflow to the left (intentional)
  const dy = (canvasH - scaledH) / 2;

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(video, dx, dy, scaledW, scaledH);
}

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Track physical canvas dimensions separately from CSS ─────
    let physW = 0;
    let physH = 0;

    const syncCanvasSize = () => {
      // Cap DPR — mobile GPUs choke on drawing full retina-res canvases
      // every frame; 1.5 is visually indistinguishable here.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      physW = Math.round(window.innerWidth * dpr);
      physH = Math.round(window.innerHeight * dpr);
      canvas.width = physW;
      canvas.height = physH;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };

    syncCanvasSize();

    // ── Video element used as the frame source (instead of 300 PNGs) ──
    const video = document.createElement("video");
    video.src = "/scroll-video.mp4";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    // Some mobile browsers require these for programmatic seeking to work
    // reliably without the user ever hitting "play".
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    let rafId = 0;
    let ready = false;

    const renderLoop = () => {
      if (ready) {
        drawCoverRight(ctx, video, physW, physH);
      }
      rafId = requestAnimationFrame(renderLoop);
    };

    const onLoadedData = () => {
      ready = true;
      // Draw the very first frame immediately, then keep the loop running
      // so every subsequent seek (from scroll) shows up right away.
      drawCoverRight(ctx, video, physW, physH);
      rafId = requestAnimationFrame(renderLoop);
    };
    video.addEventListener("loadeddata", onLoadedData);

    // ── GSAP scroll scrub — drive video.currentTime by scroll progress ──
    const trigger = ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        if (video.duration) {
          video.currentTime = self.progress * video.duration;
        }
      },
    });

    // ── Window resize + orientation change ────────────────────────
    let resizeRaf = 0;
    const handleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        syncCanvasSize();
        if (ready) drawCoverRight(ctx, video, physW, physH);
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      video.removeEventListener("loadeddata", onLoadedData);
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      video.src = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] mix-blend-darken overflow-hidden">
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
