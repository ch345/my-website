"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from './navLinks';
import { useIsMobile } from './useIsMobile';
import shellDouble from '../assets/shell double.png';

export default function TopNav() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  return (
    <nav className="top-nav" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem 2rem',
    }}>
      <Link href="/" className="top-nav-home" style={{
        fontFamily: 'var(--font-title), serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      }}>
        {isMobile ? (
          <Image
            src={shellDouble}
            alt="connie huang"
            width={52}
            height={52}
            unoptimized
            className="pixelated"
            style={{ display: 'block' }}
          />
        ) : (
          'connie huang'
        )}
      </Link>
      <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none', padding: 0, margin: 0 }}>
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link href={href} className={`top-nav-link${active ? ' active' : ''}`} style={{
                fontFamily: 'var(--font-body), monospace',
                fontSize: '1rem',
              }}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
