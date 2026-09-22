import type { AsciiArt } from '../assets/ascii/overlays';

type AsciiStyle = React.CSSProperties & {
  '--ascii-hover-color'?: string;
};

export default function AsciiOverlay({
  art: { art, style: artStyle },
  style,
  charHover = true,
  color = 'var(--color-bg-detail)',
  hoverColor,
}: {
  art: AsciiArt;
  style?: React.CSSProperties;
  charHover?: boolean;
  color?: string;
  hoverColor?: string;
}) {
  const content = charHover
    ? art.split('').map((char, i) => <span key={i}>{char}</span>)
    : art;

  const computedStyle: AsciiStyle = {
    userSelect: 'none',
    position: 'absolute',
    margin: 0,
    ...artStyle,
    ...style,
    ...(color ? { 'color': color } : {}),
    ...(hoverColor ? { '--ascii-hover-color': hoverColor } : {}),
    ...(charHover ? { pointerEvents: 'auto' } : {}),
  };

  return (
    <pre className={`ascii${charHover ? ' char-hover' : ''}`} style={computedStyle}>
      {content}
    </pre>
  );
}
