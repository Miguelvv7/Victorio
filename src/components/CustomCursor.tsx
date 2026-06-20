"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide system cursor globally
    document.documentElement.style.cursor = "none";

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth loop for ring
    const loop = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(dot,  { x: mouseX, y: mouseY });
      gsap.set(ring, { x: ringX,  y: ringY  });
      raf = requestAnimationFrame(loop);
    };

    const expand = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.25, ease: "power2.out" });
      gsap.to(dot,  { scale: 0.4, duration: 0.2 });
    };
    const shrink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };
    const hide = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const show = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    const bindLinks = () => {
      document.querySelectorAll("a, button, [data-cursor-expand]").forEach(el => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", shrink);
      });
    };

    // Bind now + observe DOM changes
    bindLinks();
    const observer = new MutationObserver(bindLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
