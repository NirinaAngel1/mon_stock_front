'use client';

import api from "@/app/services/api";
import { User } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react"; // Ajout de React pour React.ReactNode

interface User {
    email: string;
    roles: string[];
    username: string;
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
};


const AuthContext = createContext<AuthContextType>(
    {
        user: null,
        isAuthenticated: false,
        login: async () => {},
        logout: () => {}
    }
);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try{
            const { data } = await api.get('/users/me');
            setUser(data);
            setIsAuthenticated(true);
        }
        catch{
            setUser(null);
            setIsAuthenticated(false);
        }
    }
    
    useEffect(() => {
        //vérification du token au chargement de l'application
        const token = localStorage.getItem("token");
        if(token){
            fetchUser();
        }
    }, []);


    const login = async (token: string, refreshToken: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refreshToken);
        await fetchUser();
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setIsAuthenticated(false);
    };


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
