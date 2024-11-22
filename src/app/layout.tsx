import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../utils/config';

import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic';
import './global.css';

const OnchainProviders = dynamic(() => import('src/context/OnchainProviders'), {
  ssr: false,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'OnchainKit App',
  description: 'Built with OnchainKit',
  openGraph: {
    title: 'OnchainKit App',
    description: 'Built with OnchainKit',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

/**
 * Root Layout
 * @param param0
 * @returns
 */
export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico"></link>
        <meta name="theme-color" content="#b8e986" />
      </head>
      <body className="flex items-center justify-center">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
