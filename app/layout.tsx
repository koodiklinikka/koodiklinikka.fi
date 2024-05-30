import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BottomFade from '@/components/BottomFade';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Koodiklinikka',
  description: 'Yhteisö kaikille ohjelmoinnista ja ohjelmistoalasta kiinnostuneille harrastajille ja ammattilaisille',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className={`${inter.className} pb-24 text-white`}>
        {children}
        <BottomFade />
      </body>
    </html>
  );
}
