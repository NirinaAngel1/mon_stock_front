"use client";

import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background/50 py-6 px-6">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-between">

        {/* Bloc 1 - Copyright et nom */}
        <div className="text-sm text-foreground/50">
          <span>Stock'Eko</span>
          <span className="mx-2">|</span>
          <span>&copy; {currentYear} - Tous droits réservés.</span>
        </div>
        
        {/* Bloc 2 - Liens rapides */}
        <nav className="flex gap-6 text-xs font-medium text-foreground/60">
          <Link href="/about" className="hover:text-primary transition-colors">À propos</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
        </nav>

        {/* Bloc 3 - Réseaux sociaux */}
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/nirina-angelin-razafimandimby" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="https://github.com/NirinaAngel1" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a href="mailto:angen3r@gmail.com" className="text-foreground/60 hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
