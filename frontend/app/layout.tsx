import ClientSessionManager from '@/components/clientSessionmanager';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduGradely',
  description: 'This is an AI based assignment grading tool',
  icons: {
    icon: '/images/Eg_i.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionManager />
        {children}
      </body>
    </html>
  );
}
