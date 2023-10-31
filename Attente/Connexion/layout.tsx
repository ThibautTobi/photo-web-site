
export default function Layout({ children, }: { children: React.ReactNode}) {

  return (
    <html lang="fr">
      <body>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
      </body>
    </html>
  )
};
