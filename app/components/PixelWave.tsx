'use client'
import { useRef, useEffect } from 'react';

interface PixelWaveProps {
  color?: string;
  maxHeight?: string | number;
  pixelSize?: number;    // pixel square size in px
  gap?: number;          // gap between pixels in px
  shape?: 'square' | 'circle';
  sharpness?: number;    // power exponent: higher = spikier, lower = rounder
  speed?: number;        // animation speed multiplier (1 = default)
  pushStrength?: number; // cursor push intensity (1 = default)
  animated?: boolean;    // false = draw once, no RAF loop
  fade?: boolean;        // false = all pixels at full opacity
}

export default function PixelWave({
  color = 'var(--color-bg-detail)',
  maxHeight = '30vh',
  pixelSize = 3,
  gap = 1,
  shape = 'square' as const,
  sharpness = 4,
  speed = 1,
  pushStrength = 1,
  animated = true,
  fade = true,
}: PixelWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseXRef = useRef(-1);
  const activeRef = useRef(false);
  const pausedRef = useRef(false);
  const frozenTRef = useRef(0);
  const colorRef = useRef(color);
  const sharpnessRef = useRef(sharpness);
  const speedRef = useRef(speed);
  const pushStrengthRef = useRef(pushStrength);
  const pixelSizeRef = useRef(pixelSize);
  const gapRef = useRef(gap);
  const shapeRef = useRef(shape);
  const fadeRef = useRef(fade);

  useEffect(() => {
    if (color.startsWith('var(')) {
      const name = color.slice(4, -1).trim();
      colorRef.current = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    } else {
      colorRef.current = color;
    }
  }, [color]);

  useEffect(() => { sharpnessRef.current = sharpness; }, [sharpness]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { pushStrengthRef.current = pushStrength; }, [pushStrength]);
  useEffect(() => { pixelSizeRef.current = pixelSize; }, [pixelSize]);
  useEffect(() => { gapRef.current = gap; }, [gap]);
  useEffect(() => { shapeRef.current = shape; }, [shape]);
  useEffect(() => { fadeRef.current = fade; }, [fade]);

  // Track mouse and clicks anywhere on the page
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) mouseXRef.current = e.clientX - rect.left;
      activeRef.current = true;
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect && e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        pausedRef.current = !pausedRef.current;
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;

    const draw = (timestamp: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (!pausedRef.current) frozenTRef.current = timestamp * 0.001 * speedRef.current;
      const t = frozenTRef.current;
      const pxSize = pixelSizeRef.current;
      const step = pxSize + gapRef.current;
      const cols = Math.floor(W / step);
      const rows = Math.floor(H / step);
      const midRow = (rows - 1) / 2;
      const r = sharpnessRef.current;

      const mx = mouseXRef.current;
      const active = activeRef.current;

      ctx.fillStyle = colorRef.current;

      for (let c = 0; c < cols; c++) {
        const colX = c * step;
        const norm = c / Math.max(cols - 1, 1);

        // Scale frequency with sqrt(sharpness): spikier = more peaks, rounder = fewer wider ones
        const freq1 = 14 * Math.sqrt(r);
        const freq2 = 8.5 * Math.sqrt(r);
        const s1 = Math.pow(Math.abs(Math.sin(norm * Math.PI * freq1 + t * 0.8)), r) * 0.65;
        const s2 = Math.pow(Math.abs(Math.sin(norm * Math.PI * freq2 - t * 0.5)), r) * 0.45;
        const env = 0.6 + Math.sin(norm * Math.PI * 5 + t * 0.18) * 0.28
                      + Math.sin(norm * Math.PI * 2.7 - t * 0.11) * 0.15;

        let push = 0;
        if (active && mx >= 0) {
          const dist = (colX - mx) / W;
          push = Math.exp(-dist * dist * 200) * 0.22 * pushStrengthRef.current;
        }

        const amp = Math.min((0.07 + (s1 + s2) * env + push) * midRow, midRow * 0.92);

        for (let row = 0; row < rows; row++) {
          const d = Math.abs(row - midRow);
          if (d <= amp) {
            ctx.globalAlpha = (1 - d / (amp + 0.001)) * 0.88;
            if (shapeRef.current === 'circle') {
              const r = pxSize / 2;
              ctx.beginPath();
              ctx.arc(colX + r, row * step + r, r, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillRect(colX, row * step, pxSize, pxSize);
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      if (animated) animId = requestAnimationFrame(draw);
    };

    // After draw is defined: ResizeObserver can now reference it to redraw when not animated
    const ro = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (!animated) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(draw);
      }
    });
    ro.observe(canvas);

    // Initial draw — ResizeObserver fires async with correct dimensions and redraws if needed
    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight, display: 'block' }}
    />
  );
}
