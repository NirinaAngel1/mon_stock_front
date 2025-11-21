// app/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <main className="min-h-screen flex justify-center items-center flex flex-col gap-6 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
