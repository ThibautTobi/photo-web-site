import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'site-photo',
  description: `site d'un professionnele de la photoqraphie`,
}

export default function RootLayout({ children, }: { children: React.ReactNode}) {

  return (
    <html lang="fr">
      <body>
        <Header />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  )
};
