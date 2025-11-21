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
        whileHover={{scale:1.1}}
        whileTap={{scale:0.9}}
        className="p-2 rounded-full bg-indigo-600 text-white dark:bg-indigo-700"
        >
            {theme === 'light' ? '🌞 Light':'🌙 Dark'}
            <>
            {console.log("Current theme:", theme)}
            </>
        </motion.button>
    );
};