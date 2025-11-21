'use client';

import FormWrapper from "@/components/FormWrapper";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../services/api";

export default function LoginPage() {

    const router = useRouter();
    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);

    // Type clair : data contient email + password
    const handleLogin = async (data: { email: string; password: string }) => {
        try {
            setErrorsMessage(null);

            const response = await api.post("/login_check", {
                email: data.email,
                password: data.password,
            });

            localStorage.setItem("token", response.data.token);
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            setErrorsMessage("Échec de la connexion. Vérifiez vos identifiants.");
        }
    };

    const loginFields = [
        { name: "email", label: "Email", type: "email", placeholder: "Entrez votre email" },
        { name: "password", label: "Password", type: "password", placeholder: "Mot de passe" }
    ];

    return (
        <>
            <div className="mb-8 text-center w-full max-w-md md:max-w-lg mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold text-primary">
                    Gérer votre stock, optimiser votre temps.
                </h2>
            </div>

            {errorsMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md md:max-w-lg mx-auto mb-4" role="alert">
                    <span>{errorsMessage}</span>
                </div>
            )}

            <FormWrapper
                title="Connexion"
                fields={loginFields}
                onSubmit={handleLogin}
                submitLabel="Se connecter"
            />

            <div className="mt-4 text-sm text-center">
                <p className="text-gray-600">
                    Pas encore de compte ?
                    <Link href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium ml-1">
                        S'inscrire
                    </Link>
                </p>
                <p className="mt-2">
                    <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                        Retour à l'Accueil
                    </Link>
                </p>
            </div>

            <footer className="mt-10 text-xs text-gray-400 text-center">
                &copy; 2025 Stock'Eko - Tous droits réservés.
            </footer>
        </>
    );
}
