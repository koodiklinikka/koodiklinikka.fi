import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BottomFade from '@/components/BottomFade';
import TopFade from '@/components/TopFade';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Koodiklinikka',
  description: 'Yhteisö kaikille ohjelmoinnista ja ohjelmistoalasta kiinnostuneille harrastajille ja ammattilaisille',
  metadataBase: new URL('https://koodiklinikka.fi'),
  verification: {
    google: 'UX5KbeTKwaeDzZKG7lL2nljricy_S3Qbr01BcuCYVxo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className={`${inter.className} pb-24 text-white`}>
        <TopFade />
        {children}
        <BottomFade />
      </body>
    </html>
  );
}
