import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import type { BorderCollection } from '../assets/ascii/borders';
import AsciiOverlay from '../components/AsciiOverlay';
import { swoosh, flourish, wind, lillies, bubbles, jellyfish, jellyfish2 } from '../assets/ascii/overlays';
import { sparkleLine, whimsyLine } from '../assets/ascii/borders';

export function entrySlug(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
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
    title: 'too soon once again, it feels like summer\'s already ending',
    date: new Date(Date.UTC(2026, 7, 5)),
    body: (
      <>
        It's already the last week of my internship and I'm busy wrapping everything up :(
        <br /><br />
        Took a weekend trip to Martha's Vineyard with some other interns last weekend though!
        It was definitely a top-10 way to end the summer :)
        <br /><br />
        I'm talking like school's starting really soon, but there's still a month until classes
        start again. Yet I already know it's fast approaching.
      </>
    ),
    image: require('../assets/archive/marthas vineyard.png').default,
    caption: 'alas didn\'t get any vineyard exclusives here',
    borders: whimsyLine,
    overlay: (
      <>
        <AsciiOverlay
          art={bubbles}
          style={{ transform: 'scaleX(-1)', bottom: '50%', left: '2%' }}
         />
        <AsciiOverlay
          art={bubbles}
          style={{ bottom: '28%', left: '-6%' }}
         />
        <AsciiOverlay
          art={bubbles}
          style={{ bottom: '20%', left: '4%' }}
         />
        <AsciiOverlay
          art={jellyfish}
          style={{ fontSize: '0.6rem', top: '10%', right: '-10%' }}
         />
        <AsciiOverlay
          art={jellyfish2}
          style={{ bottom: '0%', left: '30%' }}
         />
      </>
    )
  },
  {
    title: 'today i stayed in the park until dark',
    date: new Date(Date.UTC(2026, 6, 20)),
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
    date: new Date(Date.UTC(2026, 6, 19)),
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
    date: new Date(Date.UTC(2026, 2, 2)),
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
