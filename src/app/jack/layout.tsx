import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import './jack.css';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
});

export const metadata: Metadata = {
  title: 'Miguel Victorio — Desarrollador Web',
};

export default function JackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={kanit.className}
      style={{ background: '#0C0C0C', minHeight: '100vh' }}
    >
      {children}
    </div>
  );
}
