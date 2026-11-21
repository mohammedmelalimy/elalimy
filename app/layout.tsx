// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '../components/site-footer';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body className="bg-[#050B12] text-white antialiased light:bg-[#F7FAFC] light:text-[#122638]">
        <SiteHeader />

        <main className="pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
