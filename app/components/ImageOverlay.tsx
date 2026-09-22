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
  eager?: boolean;
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
  eager = false,
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
      <Image
        src={src}
        alt={alt}
        fill
        sizes={width}
        preload={eager}
        style={{ objectFit, objectPosition }}
      />
    </div>
  );
}
