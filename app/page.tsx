"use client"
import ContextMenu from './components/ContextMenu';
import HomeNav from './components/HomeNav';
import ImageOverlay from './components/ImageOverlay';
import Dither from './components/Dither.tsx';

import succulentImg from './assets/originalSucculent.png';
import shellImg from './assets/shell.png';

export default function Home() {
  return (
    <ContextMenu style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Dither
        waveColor={[0.5333333333333333, 0.5333333333333333, 0.5333333333333333]}
        disableAnimation={false}
        enableMouseInteraction
        mouseRadius={0.15}
        colorNum={6}
        waveAmplitude={0.3}
        waveFrequency={5}
        waveSpeed={0.01}
      />
      <ImageOverlay
        src={shellImg}
        top="-10%"
        left="-30%"
        transform="rotate(270deg)"
        width="80vw"
        height="80vh"
      />
      <ImageOverlay
        src={succulentImg}
        top="20%"
        left="0"
        transform="scaleX(-1)"
        width="72vw"
        height="72vh"
        objectPosition="right center"
      />
      <ImageOverlay
        src={shellImg}
        top="50%"
        left="60%"
        transform="scaleX(-1) rotate(60deg)"
        width="60vw"
        height="60vh"
      />
      <ImageOverlay
        src={succulentImg}
        top="-10%"
        left="70%"
        width="72vw"
        height="72vh"
        objectPosition="left center"
      />
      <ImageOverlay
        src={shellImg}
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="40vw"
        height="40vh"
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <HomeNav />
        </div>
      </div>
    </ContextMenu>
  );
}
