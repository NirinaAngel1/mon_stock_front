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
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        //Changement de l'état auth
        if(isAuthenticated){
            //vérification des rôles
            if(allowedRoles && user){
                const hasRole = user.roles.some((role => allowedRoles.includes(role)));
                if(!hasRole){
                    router.push("/login");//redirection si rôle non autorisé
                }
            }
            setCheckingAuth(false);
        }else{
            //Redirection vers la page de login si non authentifié
            setTimeout(()=>{
                router.push("/login");
            }, 100);
        }
    },[isAuthenticated, user, allowedRoles, router]);

    //Loader pendant la vérification de l'authentification
    if(checkingAuth || !isAuthenticated){
        return <Loader />;
    }

    return <>{children}</>;
}
