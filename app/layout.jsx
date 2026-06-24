import { Oswald, Inter } from 'next/font/google';
import './globals.css';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Veterans Life Insurance — Free Quote',
  description:
    'See life insurance options built for U.S. veterans. Answer a few questions and a licensed agent will review your information.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
