"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";

interface MainLayoutProps{
  children: ReactNode;
}

export default function MainLayout({children}: MainLayoutProps) {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
            <main className="flex-1 overflow-y-auto flex flex-col">
              <div className="flex-1 px-6 py-8">
              {children}
              </div>
              <Footer />
            </main>
          </div>
      </div>
    </ProtectedRoute>
  );
}
