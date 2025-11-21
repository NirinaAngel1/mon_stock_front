'use client';

import FormWrapper from "@/components/FormWrapper";
import React from "react";
import Link from "next/link";


export default function LoginPage() {
    const handleLogin = (data: Record<string, any>) => {
        console.log("Login data:", data);
    };

    const loginFields = [
        { name: "Nom", label: "Nom d'utilisateur", type: "text", placeholder: "Entrez votre nom d'utilisateur" },
        { name: "email", label: "Email", type: "email", placeholder: "Entrez votre email" },
        { name: "password", label: "Password", type: "password", placeholder: "Mot de passe" }
    ];

    return (
        <>
            <div className="mb-8 text-center w-full max-w-md md:max-w-lg mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-primary">Vous êtes nouveau? veuillez vous inscrire ici</h2>
            </div>
            <FormWrapper
            title="Inscription"
            fields={loginFields}
            onSubmit={handleLogin}
            submitLabel="S'inscrire"
        />
            <div className="mt-4 text-sm text-center">
                    <p className="text-gray-600">
                        Vous avez déjà un compte ? 
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium ml-1">
                            se connecter
                        </Link>
                    </p>
                    <p className="mt-2">
                        <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                            Retour à l'Accueil
                        </Link>
                    </p>
                </div>

                {/* Ajout du copyright en petite lettre en bas */}
                <footer className="mt-10 text-xs text-gray-400 text-center">
                    &copy; 2025 Stock'Eko - Tous droits réservés.
                </footer>
        </>
        
    );
}