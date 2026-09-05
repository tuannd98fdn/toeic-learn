import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'TOEIC Vocabulary Mastery',
  description: 'Master TOEIC vocabulary using scientifically proven methods like Spaced Repetition and Active Recall.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <main className="page-container animate-fade-in">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
