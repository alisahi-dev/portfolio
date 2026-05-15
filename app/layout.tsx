import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ali Sahi — Data Scientist & ML Engineer',
  description:
    'Portfolio of Ali Sahi — 4th year BSc Data Science at York University. Building ML products end-to-end. Try the live demos.',
  openGraph: {
    title: 'Ali Sahi — Data Scientist & ML Engineer',
    description: 'Live ML demos, real projects, honest skill levels.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
