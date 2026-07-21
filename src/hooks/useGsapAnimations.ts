import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate an element when it enters the viewport using ScrollTrigger.
 * Returns a ref to attach to the container element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    trigger?: RefObject<HTMLElement | null>;
    delay?: number;
    stagger?: number;
  }
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 30,
          ...(options?.from || {}),
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: options?.trigger?.current || el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          ...(options?.to || {}),
          delay: options?.delay || 0,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options?.delay, options?.stagger]);

  return ref;
}

/**
 * Animate children items with staggered reveal on scroll.
 * Attach ref to the parent container. Children should be direct children.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options?: {
    childSelector?: string;
    from?: gsap.TweenVars;
    stagger?: number;
    start?: string;
  }
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const children = options?.childSelector
        ? el.querySelectorAll(options.childSelector)
        : el.children;

      if (children.length === 0) return;

      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
          ...(options?.from || {}),
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: options?.stagger || 0.06,
          scrollTrigger: {
            trigger: el,
            start: options?.start || "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options?.stagger, options?.childSelector, options?.start]);

  return ref;
}

/**
 * Floating animation for a single element (e.g., AI button, decorative elements).
 */
export function useFloatingAnimation<T extends HTMLElement = HTMLButtonElement>(
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
  }
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: options?.y ?? -6,
        duration: options?.duration ?? 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: options?.delay ?? 0,
      });
    }, el);

    return () => ctx.revert();
  }, [options?.y, options?.duration, options?.delay]);

  return ref;
}

/**
 * Pulse/glow animation for elements (e.g., AI button, sale badges).
 */
export function useGlowPulse<T extends HTMLElement = HTMLButtonElement>(
  options?: {
    scale?: number;
    duration?: number;
    boxShadowColor?: string;
  }
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scale: options?.scale ?? 1.05,
        duration: options?.duration ?? 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        boxShadow: `0 0 20px ${options?.boxShadowColor || "rgba(255,255,255,0.3)"}`,
      });
    }, el);

    return () => ctx.revert();
  }, [options?.scale, options?.duration, options?.boxShadowColor]);

  return ref;
}

/**
 * Hover animation for cards/buttons (scale + shadow on hover).
 * Attach ref to the element you want to animate on hover.
 */
export function useHoverScale<T extends HTMLElement = HTMLDivElement>(
  options?: {
    scale?: number;
    duration?: number;
  }
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          scale: options?.scale ?? 1.03,
          duration: options?.duration ?? 0.4,
          ease: "power2.out",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          y: -4,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          scale: 1,
          duration: options?.duration ?? 0.4,
          ease: "power2.out",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          y: 0,
        });
      });
    }, el);

    return () => ctx.revert();
  }, [options?.scale, options?.duration]);

  return ref;
}

/**
 * Counter animation for numbers (e.g., statistics).
 * Animates from 0 to the target value.
 */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  targetValue: number,
  options?: {
    duration?: number;
    suffix?: string;
    prefix?: string;
  }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: targetValue,
        duration: options?.duration ?? 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          el!.textContent = `${options?.prefix || ""}${Math.round(obj.value).toLocaleString()}${options?.suffix || ""}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [ref, targetValue, options?.duration, options?.suffix, options?.prefix]);
}

/**
 * Parallax scroll effect for sections.
 */
export function useParallaxScroll<T extends HTMLElement = HTMLDivElement>(
  speed?: number
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: (speed ?? 0.3) * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Entrance animation for page sections (fade in + slide up).
 */
export function useSectionEntrance<T extends HTMLElement = HTMLDivElement>(
  options?: {
    delay?: number;
    y?: number;
    duration?: number;
  }
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: options?.y ?? 40 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
          delay: options?.delay ?? 0,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options?.delay, options?.y, options?.duration]);

  return ref;
}
