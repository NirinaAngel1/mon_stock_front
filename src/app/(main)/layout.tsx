"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

interface MainLayoutProps{
  children: ReactNode;
}

export default function MainLayout({children}: MainLayoutProps) {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
          <Header user = {user}/>
          <main className="flex-1 px-6 md:px-12 py-6 mt-28">{children}</main>
          <Footer />
      </div>
    </ProtectedRoute>
  );
}
