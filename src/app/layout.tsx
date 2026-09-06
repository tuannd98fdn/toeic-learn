import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: {
    default: 'TOEIC Master VN — Luyện thi TOEIC miễn phí, hiệu quả nhất',
    template: '%s | TOEIC Master VN',
  },
  description: 'Ứng dụng luyện thi TOEIC miễn phí #1 Việt Nam. Luyện đề thật ETS, Flashcard thông minh, Spaced Repetition, giải thích chi tiết. Nâng điểm TOEIC nhanh chóng.',
  keywords: ['TOEIC', 'luyện thi TOEIC', 'đề thi TOEIC', 'TOEIC online', 'học TOEIC miễn phí', 'ETS TOEIC', 'TOEIC Việt Nam', 'thi TOEIC'],
  authors: [{ name: 'TOEIC Master VN' }],
  creator: 'TOEIC Master VN',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://toeicmaster.vn',
    siteName: 'TOEIC Master VN',
    title: 'TOEIC Master VN — Luyện thi TOEIC miễn phí, hiệu quả nhất',
    description: 'Luyện đề thật ETS, Flashcard thông minh, giải thích chi tiết. Nâng điểm TOEIC nhanh chóng.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOEIC Master VN',
    description: 'Luyện thi TOEIC miễn phí #1 Việt Nam',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
