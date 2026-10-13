// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/site-header';
import WhatsAppButton from '../components/shared/whatsapp-button';

export const metadata: Metadata = {
  title: 'Mohammed Elalimy | Portfolio',
  description: 'Full Stack Developer & Shopify Specialist'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050B12] text-white antialiased">
        <SiteHeader />

        <main className="pt-20">{children}</main>

        <WhatsAppButton />
      </body>
    </html>
  );
}
