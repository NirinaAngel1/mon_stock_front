export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
        <main className="min-h-screen justify-center items-center flex flex-col gap-6 p-4">
          {children}
        </main>
  );
}