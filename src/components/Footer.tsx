"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://twitter.com", icon: <Twitter size={20} /> },
    { href: "https://www.linkedin.com/in/nirina-angelin-razafimandimby", icon: <Linkedin size={20} /> },
    { href: "https://github.com/NirinaAngel1", icon: <Github size={20} /> },
    { href: "https://www.facebook.com/Nirina-razafimandimby", icon: <Facebook size={20} /> },
    { href: "https://www.instagram.com/", icon: <Instagram size={20} /> },
  ];

  return (
    <footer className="text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark border-t border-primary shadow-inner pt-12 pb-6 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

        {/* Bloc 1 - Description + Réseaux */}
        <div>
          <motion.h2
            className="text-2xl text-center font-bold text-primary dark:text-primary-light mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ce que nous proposons ?
          </motion.h2>
          <p className="text-sm md:text-lg leading-relaxed text-center">
            Optimisez votre gestion de stock avec une solution moderne et intelligente.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors text-center"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bloc 2 - Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-primary dark:text-primary-light mb-4">
            Navigation
          </h4>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="hover:text-text transition-colors">Accueil</Link>
            <Link href="/about" className="hover:text-text transition-colors">À propos</Link>
            <Link href="/use" className="hover:text-text transition-colors">Fonctionnalités</Link>
            <Link href="/contact" className="hover:text-text transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Bloc 3 - Informations */}
        <div>
          <h4 className="text-lg font-semibold text-primary dark:text-primary-light mb-4">
            Informations
          </h4>

          <p className="flex items-center gap-2 text-sm">
            <Mail size={20} />
            <a href="mailto:angen1r@yahoo.fr" className="hover:text-text transition-colors">
              angen1r@yahoo.fr
            </a>
          </p>

          <p className="flex items-center gap-2 text-sm mt-2">
            <Phone size={20} />
            <a href="tel:+261341227314" className="hover:text-text transition-colors">
              +261 34 12 273 14
            </a>
          </p>
        </div>

        {/* Bloc 4 - Légales */}
        <div>
          <h4 className="text-lg font-semibold text-primary dark:text-primary-light mb-4">
            Légales
          </h4>

          <nav className="flex flex-col gap-2">
            <Link href="/cdc" className="hover:text-text transition-colors">
              Conditions générales d'utilisation
            </Link>
            <Link href="/legal" className="hover:text-text transition-colors">
              Mentions légales
            </Link>
            <Link href="/privacy" className="hover:text-text transition-colors">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-10 pt-4 text-center text-xs">
        <p>&copy; {currentYear} Stock'Eko — Tous droits réservés.</p>
      </div>
    </footer>
  );
}
