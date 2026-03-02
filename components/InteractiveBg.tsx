"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBg() {
  const blobRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const initialized = useRef(false);

  useEffect(() => {
    // Set initial position to top-right area
    mouse.current = { x: window.innerWidth * 0.85, y: window.innerHeight * 0.1 };
    current.current = { x: window.innerWidth * 0.85, y: window.innerHeight * 0.1 };
    initialized.current = true;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.current.x = lerp(current.current.x, mouse.current.x, 0.06);
      current.current.y = lerp(current.current.y, mouse.current.y, 0.06);

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${current.current.x - 400}px, ${current.current.y - 400}px)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed z-0"
      style={{
        width: 800,
        height: 800,
        background:
          "radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(37,99,235,0.12) 40%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(40px)",
        willChange: "transform",
        top: 0,
        left: 0,
      }}
    />
  );
}
