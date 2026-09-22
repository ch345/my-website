import Image, { StaticImageData } from 'next/image';

interface ImageOverlayProps {
  src: string | StaticImageData;
  alt?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  height: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  transform?: string;
}

export default function ImageOverlay({
  src,
  alt = '',
  top,
  left,
  right,
  bottom,
  width,
  height,
  objectFit = 'contain',
  objectPosition,
  transform,
}: ImageOverlayProps) {
  return (
    <div style={{
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1,
      top,
      left,
      right,
      bottom,
      width,
      height,
      transform,
    }}>
      <Image src={src} alt={alt} fill style={{ objectFit, objectPosition }} />
    </div>
  );
}
