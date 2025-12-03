import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          <Header />
          <main className="min-h-screen pt-24 md:pt-28">{children}</main>
          <Footer />
    </>
  );
}
