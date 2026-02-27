"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogIn, LogOut, UserPlus, Settings, UserPen, LayoutDashboardIcon } from "lucide-react";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type NavLink =
  | { type: "link"; href: string; label: string; icon: React.ReactNode }
  | { type: "action"; label: string; icon: React.ReactNode; action: () => void }
  | { type: "label"; label: string };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, isThemeLoaded } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const isAdmin = user?.roles.includes("ROLE_ADMIN");

  if (!isThemeLoaded) return null;

  const privateLinks: NavLink[] = [
    { type: "link", href: "/dashboard", label: "Dashboard", icon: <LayoutDashboardIcon size={18} /> },
    { type: "link", href: "/profile", label: "Mon profil", icon: <UserPen size={18} /> },
    ...(isAdmin
      ? [{ type: "link", href: "/admin", label: "Admin", icon: <Settings size={18} /> } as NavLink]
      : []),
    { type: "label", label: user?.username ?? "" },
    {
      type: "action",
      label: "Se déconnecter",
      icon: <LogOut size={18} />,
      action: handleLogout,
    },
  ];

  const publicLinks: NavLink[] = [
    { type: "link", href: "/login", label: "Se connecter", icon: <LogIn size={18} /> },
    { type: "link", href: "/register", label: "S'inscrire", icon: <UserPlus size={18} /> },
  ];

  const links = isAuthenticated ? privateLinks : publicLinks;

  const mobileNavVariants: Variants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  const renderLink = (link: NavLink, index: number) => {
    switch (link.type) {
      case "link":
        return (
          <Link
            key={index}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        );

      case "action":
        return (
          <button
            key={index}
            onClick={() => {
              link.action();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            {link.icon}
            {link.label}
          </button>
        );

      case "label":
        return (
          <span
            key={index}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {link.label}
          </span>
        );
    }
  };

  return (
    <header
      className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-b border-primary shadow-md fixed w-full z-10"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <Image
            src={theme === "dark" ? "/logo-light.png" : "/logo-dark.png"}
            alt="logo"
            width={200}
            height={50}
            className="cursor-pointer"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(renderLink)}
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
        {links.map(renderLink)}
        <div className="flex justify-center mt-2 mb-2">
          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  );
}