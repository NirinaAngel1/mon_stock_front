"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, User, LogIn, LogOut, UserPlus } from "lucide-react";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = false; // À remplacer par la logique d'authentification réelle

  const { theme } = useTheme();

  const privateLinks = [
    { href: "#", label: "Se déconnecter", icon: <LogOut size={18} /> },
    { href: "/profile", label: "Mon profil", icon: <User size={18} /> },
  ];
  const publicLinks = [
    { href: "/login", label: "Se connecter", icon: <LogIn size={18} /> },
    { href: "/register", label: "S'inscrire", icon: <UserPlus size={18} /> },
  ];

  const links = isAuthenticated ? privateLinks : publicLinks;

  const mobileNavVariants: Variants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <header 
    className={`bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-b border-primary shadow-md fixed w-full z-10`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <Image src={ theme === 'dark' ? "/logo-light.png" : "/logo-dark.png" } alt="logo" width={200} height={50} className="cursor-pointer" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label, icon }) => (
            <Link
             key={href}
             href={href}
             className="flex items-center gap-2 hover:text-primary transition-colors">
              {icon}
              <span>{label}</span>
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <button
          className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

       <motion.nav
          className="md:hidden flex flex-col gap-3 px-6 pt-3 pb-6 bg-background-light dark:bg-background-dark overflow-hidden border-t border-gray-300 dark:border-gray-700"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={mobileNavVariants}
        >
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 py-2 text-lg"
              onClick={() => setIsOpen(false)}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}

          {/* Theme Toggle centered, with space below */}
          <div className="flex justify-center mt-2 mb-2">
            <ThemeToggle />
          </div>
        </motion.nav>
    </header>
  );
}
