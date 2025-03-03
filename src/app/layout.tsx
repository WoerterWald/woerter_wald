import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inspiration, Inter } from 'next/font/google';
import Head from 'next/head';
import '../styles/reset.scss';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const inspiration = Inspiration({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-inspiration',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${inspiration.variable}`}>
      <Head>
        <link rel="preload" as="image" href="/assets/bg_layer_top.webp" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
