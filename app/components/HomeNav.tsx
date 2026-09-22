"use client"
import Link from 'next/link';
import { NAV_LINKS } from './navLinks';

export default function HomeNav() {
  return (
    <nav className="home-nav" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <h1 style={{
        margin: 0,
        color: 'white',
        userSelect: 'none',
      }}>
        connie huang
      </h1>
      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} style={{ fontFamily: 'var(--font-body), monospace', fontSize: '1rem' }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
