import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import type { BorderCollection } from '../assets/ascii/borders';
import AsciiOverlay from '../components/AsciiOverlay';
import { swoosh, flourish, wind, lillies } from '../assets/ascii/overlays';
import { sparkleLine, whimsyLine } from '../assets/ascii/borders';

export function entrySlug(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth()).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

export type ArchiveEntry = {
  title: string;
  date: Date;
  body: ReactNode;
  image: StaticImageData;
  caption: string;
  borders: BorderCollection;
  overlay?: ReactNode;
  defaultLightMode?: boolean;
};

export const entries: ArchiveEntry[] = [
  {
    title: 'today i stayed in the park until dark',
    date: new Date(2026, 7, 20),
    body: (
      <>
        Ate my dinner and continued making this website on the picnic table. I got 3 mosquito bites but worth it.
      </>
    ),
    image: require('../assets/archive/working on website outside.png').default,
    caption: 'working on this website right now.',
    borders: whimsyLine,
    overlay: (
      <>
        <AsciiOverlay
          art={lillies}
          style={{ bottom: '-40%', left: '20%' }}
         />
      </>
    )
  },
  {
    title: 'making this website',
    date: new Date(2026, 7, 19),
    body: (
      <>
        Finally getting around to making this website. Entering my blogger life soon?!
        <br /><br />
        I spent so long trying to decide if I wanted to keep the green in this photo...
      </>
    ),
    image: require('../assets/archive/ring delivery photo.png').default,
    caption: 'cheese! photo from ring delivery',
    borders: sparkleLine,
    overlay: (
      <>
        <AsciiOverlay
          art={flourish}
          style={{ top: '4%', left: '12%' }}
        />
      </>
    )
  },
  {
    title: 'hello from my figma mockup in march when there was still snow on the ground',
    date: new Date(2026, 3, 2),
    body: (
      <>
        <p>
          I'm including this mostly because i really like this photo and it feels weird to put it unattached to some other date.
          <br /><br />
          I remember mocking up this website in the library as a distraction from schoolwork. From my mockup, and I quote:
        </p>
        <blockquote>
          my update blah blah blah here is what is going on in my life. it is snowing today
        </blockquote>
        <p>
          Very insightful!
        </p>
      </>
    ),
    image: require('../assets/archive/windy beach.png').default,
    caption: 'this photo is actually from 2024 shh',
    borders: whimsyLine,
    overlay: (
      <>
        <AsciiOverlay
          art={swoosh}
          style={{ top: '-4%', left: '40%' }}
        />
        <AsciiOverlay
          art={flourish}
          style={{ top: '0', right: '-4%', transform: '' }}
        />
        <AsciiOverlay
          art={wind}
          style={{ top: '32%', left: '16%' }}
        />
      </>
    )
  },
];
