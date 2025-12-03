"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps{
    theme:Theme;
    toggleTheme:()=>void;
    isThemeLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps{
    children:ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    // const [theme, setTheme]= useState<Theme>(()=>{
    //     if(typeof window!== 'undefined'){
    //         const storedTheme = localStorage.getItem('theme') as Theme | null;
    //         if (storedTheme){
    //             return storedTheme;
    //         }
    //         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //         return prefersDark ? 'dark':'light';
    //     }
    //     return 'light';
    // });

    const [theme, setTheme]= useState<Theme>('light');

    const [isThemeLoaded, setIsThemeLoaded] = useState(false);

        useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;

        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.toggle('dark', storedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = prefersDark ? 'dark' : 'light';

            setTheme(initialTheme);
            document.documentElement.classList.toggle('dark', prefersDark);
        }
        setIsThemeLoaded(true);
    }, []);

    const toggleTheme = ()=>{
        const newTheme: Theme = theme === 'light' ? 'dark': 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isThemeLoaded }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error ('useTheme doit être utilisé avec un ThemeProvider');
    }
    return context;
};