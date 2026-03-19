import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


export const ThemeToggle = ()=>{
    const {theme, toggleTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
    setMounted(true); // on est côté client
  }, []);

  if (!mounted) return null; // ne rien rendre côté serveur

    return (
        <motion.button
        onClick={toggleTheme}
        whileHover={{scale:1.05}}
        whileTap={{scale:0.96}}
        className="p-1 border border-border rounded-full bg-primary/10 text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        title={theme === 'dark' ? "Passer en mode clair":"Passer en mode sombre"}
        >
            {theme === 'light' ? '🌞':'🌙'}
        </motion.button>
    );
};