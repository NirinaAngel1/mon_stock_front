"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({children, allowedRoles}: ProtectedRouteProps) {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        //Changement de l'état auth
        if(!loading){
            if(!isAuthenticated){
                router.replace("/login");
            }else if(allowedRoles && user){
                const hasRole = user.roles.some(role => allowedRoles.includes(role));
                if(!hasRole){
                    router.replace("/login");
                }
            }
        }
    },[loading, isAuthenticated, user, allowedRoles, router]);

    //Loader pendant la vérification de l'authentification
    if(loading){
        return <Loader />;
    }

    if(!isAuthenticated){
        return null; //ou un message d'erreur
    }

    if(allowedRoles && user){
        const hasRole = user.roles.some(role => allowedRoles.includes(role));
        if(!hasRole){
            return null; //ou un message d'erreur
        }
    }

    return <>{children}</>;
}
