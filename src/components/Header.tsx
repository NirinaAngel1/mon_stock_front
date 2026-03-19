"use client";


import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User, Menu, LogOut, ChevronDownIcon, ChevronUpIcon, Search, Settings } from "lucide-react";
import { Button } from "./UI/Button";

export default function Header(){
    const [open, setOpen] = useState(false);
      const { user, logout } = useAuth();
      const { isThemeLoaded } = useTheme();
      const router = useRouter();
      const dropdownRef = useRef<HTMLDivElement>(null);

    //   fermeture du menu déroulant lorsque l'utilisateur clique en dehors

        useEffect(()=>{
            const handleClickOutside = (event: MouseEvent)=>{
                if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                    setOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return()=> document.removeEventListener("mousedown", handleClickOutside);
        },[]);

      const handleLogout = () => {
        logout();
        router.replace("/login");
      };

      if (!isThemeLoaded) return null;

      const handleProfileClick = () => {
        setOpen(false);
        router.push("/profile");
      };

      const handleSettingsClick = () => {
        setOpen(false);
        router.push("/settings");
      };

    return(
        <header
        className="h-16 border-b border-border bg-background flex items-center justify-between px-6"
        >
            {/* partie gauche */}
            <div className="flex items-center gap-3">
                <Button className="md:hidden"><Menu size={18}/></Button>
                <span className="text-primary font-semibold">Dashboard</span>
            </div>

            {/* partie centrale */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
                <div className="relative group">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors"/>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                </div>
            </div>
            {/* partie droite */}
            <div className="flex items-center gap-3">
                <ThemeToggle/>
            <div className="relative" ref={dropdownRef}>
            <Button
            onClick={()=>setOpen(!open)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-primary/10 cursor-pointer"
            aria-expanded={open}
            aria-haspopup="true"
            >
                <User size={18}/>
                <span className="text-sm font-medium">{user?.username || "Utilisateur"}</span>
                {open ? <ChevronUpIcon size={18}/> : <ChevronDownIcon size={18}/>}
            </Button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-custom z-50">
                    <button 
                    className="w-full flex gap-2 text-left px-4 py-2 hover:bg-primary/10"
                    onClick={handleProfileClick}
                    >
                        <User size={18}/>
                        <span className="text-xs">Mon profil</span>
                        </button>

                        <button
                        className="w-full flex gap-2 text-left px-4 py-2 hover:bg-primary/10"
                        onClick={handleSettingsClick}
                        >
                        <Settings size={18}/>
                        <span className="text-xs">Paramètres</span>
                        </button>

                        <hr className="my-1 border-border" />

                        <button
                        onClick={handleLogout}
                        className="w-full flex gap-2 text-left px-4 py-2 font-semibold hover:bg-primary/10 hover:text-red-500"
                        >
                        <LogOut size={18}/>
                        <span className="text-xs">
                        Déconnexion</span>
                        </button>
                </div>
            )}
            </div>
                </div>
        </header>
    );
}