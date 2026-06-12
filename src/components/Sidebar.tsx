"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { 
    Home,
    Package,
    LayoutGrid,
    ChartColumnBig,
    History,
    Settings,
    Wrench,
    ChevronLeft,
    ChevronRight,
    ShoppingCart,
    Users,
    Truck
} from "lucide-react";
import { Button } from "./UI/Button";

export default function Sidebar() {
    const { user } = useAuth();
    const [collapsed, setCollapsed] = useState(true);
    const pathname = usePathname();

    const sidebarWidth = collapsed ? "w-20" : "w-64"; 

    const isAdmin = user?.roles?.includes("ROLE_ADMIN");
    // Le staff et l'admin ont accès aux partenaires commerciaux
    const isStaff = user?.roles?.includes("ROLE_STAFF") || isAdmin; 

    // Vérifie si le lien est actif
    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };
    
    // Styles de base et états (reprend tes variables CSS)
    const baseStyle = "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200";
    const activeStyle = "bg-primary text-primary-foreground shadow-sm font-medium";
    const inactiveStyle = "text-foreground/70 hover:bg-primary/10 hover:text-primary";

    // Liens accessibles à tous les utilisateurs connectés
    const links = [
        { href: "/", label: "Accueil", icon: <Home size={18} /> },
        { href: "/dashboard", label: "Dashboard", icon: <ChartColumnBig size={18} /> },
        { href: "/product", label: "Produits", icon: <Package size={18} /> },
        { href: "/category", label: "Catégories", icon: <LayoutGrid size={18} /> },
        { href: "/orders", label: "Commandes", icon: <ShoppingCart size={18} /> },
        { href: "/history", label: "Historique", icon: <History size={18} /> },
    ];

    // Liens accessibles uniquement aux admins et staffs
    const partnerLinks = [
        { href: "/suppliers", label: "Fournisseurs", icon: <Truck size={18} /> },
        { href: "/customers", label: "Clients", icon: <Users size={18} /> },
    ];

    // Liens réservés à l'administrateur
    const adminLinks = [
        { href: "/settings", label: "Paramètres", icon: <Settings size={18} /> },
        { href: "/admin", label: "Admin", icon: <Wrench size={18} /> },
    ];

    return (
        <aside className={`h-screen ${sidebarWidth} p-4 border-r border-border bg-background transition-all duration-300 flex flex-col justify-between`}>
            <div>
                {/* Logo / Titre de l'application */}
                <div className={`flex items-center mb-8 text-xl font-bold text-primary ${collapsed ? "justify-center" : "justify-between px-4"}`}>
                    <span className="text-xs font-thin text-primary items-baseline">
                        {!collapsed ? "Stock'Eko 2026" : ""}
                    </span>
                    <Button 
                        variant="outline" 
                        onClick={() => setCollapsed(!collapsed)} 
                        className="p-0 flex items-center justify-center hover:bg-primary/20 w-8 h-8"
                        aria-label={collapsed ? "ouvrir le menu" : "fermer le menu"}
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </Button>    
                </div>

                {/* Section Navigation Principale */}
                <nav className="space-y-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${baseStyle} ${isActive(link.href) ? activeStyle : inactiveStyle} ${collapsed && "justify-center"}`}
                            title={collapsed ? link.label : ""}
                        >
                            {link.icon}
                            {!collapsed && <span>{link.label}</span>}
                        </Link>
                    ))}
                </nav>
                
                {/* Section Partenaires (Fournisseurs et Clients) */}
                {isStaff && (
                    <>
                        <hr className="my-6 border-border" />
                        <nav className="space-y-2">
                            {partnerLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${baseStyle} ${isActive(link.href) ? activeStyle : inactiveStyle} ${collapsed && "justify-center"}`}
                                    title={collapsed ? link.label : ""}
                                >
                                    {link.icon}
                                    {!collapsed && <span>{link.label}</span>}
                                </Link>
                            ))}
                        </nav>
                    </>
                )}

                {/* Section Admin (Paramètres et Panel) - Séparateur inclus uniquement pour l'admin */}
                {isAdmin && (
                    <>
                        <hr className="my-6 border-border" />
                        <nav className="space-y-2">
                            {adminLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${baseStyle} ${isActive(link.href) ? activeStyle : inactiveStyle} ${collapsed && "justify-center"}`}
                                    title={collapsed ? link.label : ""}
                                >
                                    {link.icon}
                                    {!collapsed && <span>{link.label}</span>}
                                </Link>
                            ))}
                        </nav>
                    </>
                )}
            </div>
        </aside>
    );
}