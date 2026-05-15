"use client";
import { useEffect, useRef } from "react";

export default function DataRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const chars = "01∑∏∫λΔΩπ∇σμ{}[]<>=+-%#@";
    const columns: number[] = [];
    const fontSize = 14;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / fontSize);
      columns.length = 0;
      for (let i = 0; i < cols; i++) {
        columns.push(Math.random() * canvas.height);
      }
    };

    const draw = () => {
      ctx.fillStyle = "rgba(10, 15, 28, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = columns[i];

        // Alternate between blue and purple
        const color = Math.random() > 0.5
          ? `rgba(74, 144, 217, ${Math.random() * 0.15 + 0.03})`
          : `rgba(123, 97, 255, ${Math.random() * 0.15 + 0.03})`;

        ctx.fillStyle = color;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          columns[i] = 0;
        }
        columns[i] += fontSize;
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}
