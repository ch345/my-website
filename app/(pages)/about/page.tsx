import Image from 'next/image';
import Link from 'next/link';
import AsciiOverlay from '@/app/components/AsciiOverlay';
import PageLayout from '../../components/PageLayout';
import FitBorder from '../../components/FitBorder';
import { wings, bannerLine } from '../../assets/ascii/borders';
import { ornamentSwirl, birds } from '@/app/assets/ascii/overlays';

import meOnThePhone from '../../assets/me on the phone.png';
import meToddler from '../../assets/me toddler.png';
import meChild from '../../assets/me child.png';
import meTween from '../../assets/me tween.png';

const SOCIAL_LINKS = [
  { label: 'email', href: 'mailto:cohuang@mit.edu' },
  { label: 'linkedin', href: 'http://www.linkedin.com/in/co-huang' },
  { label: 'github', href: 'https://github.com/ch345' },
];

const CHILDHOOD_PHOTOS = [
  { src: meToddler, alt: 'me as a toddler' },
  { src: meChild, alt: 'me as a child' },
  { src: meTween, alt: 'me as a tween' },
];

const overlay = (
  <>
    <AsciiOverlay
      art={ornamentSwirl}
      style={{ top: '0', left: '10%', transform: 'rotate(270deg)' }}
    />
    <AsciiOverlay
      art={birds}
      style={{ top: '-10%', right: '0' }}
    />
  </>
);

export default function About() {
  return (
    <PageLayout overlay={overlay}>
      <div style={{ display: 'flex', gap: '5rem' }}>
        {/* <Image
          src={meOnThePhone}
          alt="me on the phone"
          width={487}
          height={650}
          unoptimized
          className="pixelated"
          style={{ display: 'block', flexShrink: 0, aspectRatio: '3 / 4', objectFit: 'cover' }}
        /> */}

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '1.25rem' }}>
          <FitBorder
            borders={wings}
            style={{ color: 'var(--color-accent-muted)', fontSize: '2rem', textAlign: 'center' }}
          />

          <div>
            <h1>
              Hi, I&apos;m Connie Huang.
            </h1>
            <p>
              I&apos;m an aspiring software engineer and designer from NY. I love building things that are both functional and beautiful, and I&apos;m always looking for new things to learn.
            </p>
          </div>

          <FitBorder
            borders={bannerLine}
            style={{ color: 'var(--color-bg-detail)', fontSize: '1.25rem', textAlign: 'center' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '1.1rem' }}>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body), monospace' }}>
                <u>{label}</u>
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', height: '11rem' }}>
            {CHILDHOOD_PHOTOS.map(({ src, alt }) => (
              <div key={alt} style={{ position: 'relative', flex: 1 }}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  unoptimized
                  className="pixelated"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
