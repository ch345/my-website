'use client';
import { useRef, useState, useEffect } from 'react';
import type { BorderCollection } from '../assets/ascii/borders';

export default function FitBorder({
  borders,
  style,
  className,
  charHover = true,
}: {
  borders: BorderCollection;
  style?: React.CSSProperties;
  className?: string;
  charHover?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [chosen, setChosen] = useState('');

  useEffect(() => {
    const sorted = [...borders].sort((a, b) => b.length - a.length);

    const pick = () => {
      const el = ref.current;
      if (!el) return;

      const available = el.getBoundingClientRect().width;
      const cs = getComputedStyle(el);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;

      const selected = sorted.find(s => ctx.measureText(s).width <= available) ?? '';
      setChosen(selected);
    };

    document.fonts.ready.then(pick);

    const observer = new ResizeObserver(pick);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [borders]);

  const content = charHover
    ? Array.from(chosen).map((char, i) => <span key={i}>{char}</span>)
    : chosen;

  return (
    <div
      ref={ref}
      className={`ascii${charHover ? ' char-hover' : ''}${className ? ` ${className}` : ''}`}
      style={{ overflow: 'hidden', whiteSpace: 'nowrap', ...(charHover ? { pointerEvents: 'auto' } : {}), ...style }}
    >
      {content}
    </div>
  );
}
