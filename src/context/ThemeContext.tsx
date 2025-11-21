"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps{
    theme:Theme;
    toggleTheme:()=>void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps{
    children:ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme]= useState<Theme>(()=>{
        if(typeof window!== 'undefined'){
            const storedTheme = localStorage.getItem('theme') as Theme | null;
            if (storedTheme){
                return storedTheme;
            }
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark':'light';
        }
        return 'light';
    });

        useEffect(() => {
        if (theme === 'dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = ()=>{
        const newTheme: Theme = theme === 'light' ? 'dark': 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error ('useTheme must be use within a ThemeProvider');
    }
    return context;
};