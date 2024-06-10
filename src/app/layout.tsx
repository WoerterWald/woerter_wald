import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inspiration, Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const inspiration = Inspiration({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-inspiration',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  rules,
}: Readonly<{
  children: ReactNode;
  rules: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${inspiration.variable}`}>
      <body>
        {children}
        {rules}
      </body>
    </html>
  );
}
