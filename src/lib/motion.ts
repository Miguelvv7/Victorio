"use client";

import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

/** Punto de corte único para todo el sitio. */
const MOBILE_MAX = 899;

export const MQ = {
  desktop: `(min-width: ${MOBILE_MAX + 1}px)`,
  mobile: `(max-width: ${MOBILE_MAX}px)`,
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia(MQ.reduced).matches;

/**
 * ScrollSmoother activo también en móvil (smoothTouch) para que las
 * animaciones con scrub se comporten igual en las dos plataformas.
 * Devuelve una función de limpieza.
 */
export function createSmoother() {
  if (typeof window === "undefined") return () => {};
  if (prefersReducedMotion()) return () => {};

  const existing = ScrollSmoother.get();
  if (existing) existing.kill();

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.15,
    smoothTouch: 0.12,
    effects: true,
    normalizeScroll: false,
    ignoreMobileResize: true,
  });

  return () => smoother.kill();
}

/** Divide en caracteres y devuelve el split (o null si no hay elemento). */
export function splitChars(target: string | Element) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return null;
  return SplitText.create(el, { type: "chars,words", charsClass: "sp-char" });
}

/** Divide en líneas envueltas en máscara para reveals verticales. */
export function splitLines(target: string | Element) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return null;
  return SplitText.create(el, {
    type: "lines",
    linesClass: "sp-line",
    mask: "lines",
  });
}

const SCRAMBLE_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\*#$%&";

/** Efecto máquina de escribir aleatoria sobre caracteres ya divididos. */
export function scramble(chars: Element[], speed = 45) {
  const timers: ReturnType<typeof setInterval>[] = [];
  chars.forEach((char) => {
    const el = char as HTMLElement;
    const original = el.dataset.original ?? el.textContent ?? "";
    if (!original.trim()) return;
    el.dataset.original = original;

    let ticks = 0;
    const max = 4 + Math.floor(Math.random() * 6);
    const timer = setInterval(() => {
      el.textContent =
        SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
      if (++ticks >= max) {
        clearInterval(timer);
        el.textContent = original;
      }
    }, speed);
    timers.push(timer);
  });
  return () => timers.forEach(clearInterval);
}

/**
 * Inclina los elementos indicados según la velocidad de scroll.
 * Funciona igual con rueda y con gesto táctil.
 */
export function skewOnVelocity(selector: string, max = 12) {
  const proxy = { skew: 0 };
  const setter = gsap.quickSetter(selector, "skewY", "deg");
  const clamp = gsap.utils.clamp(-max, max);

  return ScrollTrigger.create({
    onUpdate: (self) => {
      const velocity = clamp(self.getVelocity() / -220);
      if (Math.abs(velocity) > Math.abs(proxy.skew)) {
        proxy.skew = velocity;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.75,
          ease: "power3",
          overwrite: true,
          onUpdate: () => setter(proxy.skew),
        });
      }
    },
  });
}

/** Refresca ScrollTrigger cuando cambian imágenes/fuentes. */
export function refreshOnLoad() {
  if (typeof window === "undefined") return () => {};
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  document.fonts?.ready.then(refresh).catch(() => {});
  return () => window.removeEventListener("load", refresh);
}

export { gsap, ScrollTrigger };
