import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://portfolio-.vercel.app')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Chandrika S — Bioinformatics & Computational Biology',
  description:
    'M.Sc. Bioinformatics & Biotechnology student working across RNA-seq analysis, NGS workflows, computational pipelines and scientific software.',
  openGraph: {
    title: 'Chandrika S — Bioinformatics & Computational Biology',
    description:
      'M.Sc. Bioinformatics & Biotechnology student working across RNA-seq analysis, NGS workflows, computational pipelines and scientific software.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Chandrika S · Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chandrika S — Bioinformatics & Computational Biology',
    description:
      'M.Sc. Bioinformatics & Biotechnology student working across RNA-seq analysis, NGS workflows, computational pipelines and scientific software.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
