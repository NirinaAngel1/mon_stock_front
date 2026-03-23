"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {

    const { user } = useAuth();

    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-8 dark:text-text-dark light:text-text-light">
                    <h1 className="text-2xl font-bold">
                        Mon profil
                    </h1>
                    <p className="text-sm font-medium">
                        Gérez vos informations personnelles et vos paramètres.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 flex flex-col md:flex-row items-center gap-8">

                        <div className="relative group">
                            <div className="h-32 w-32 bg-indigo-50 rounded-full flex items-center justify-center p-1 ring-4 ring-slate-500">
                                <img 
                                src="/default-avatar.svg"
                                alt="Avatar de l'utilisateur"
                                className="h-full w-full rounded-full object-cover shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">Information générale</p>
                                <h2 className="text-3xl font-bold text-slate-900 capitalize">{user?.username}</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <span className="block text-xs text-slate-400 uppercase font-medium ">Email</span>
                                    <span className="text-slate-700 font-medium">{user?.email}</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-3 rounded-lg">
                                <span className="block text-xs text-slate-400 uppercase font-medium">Rôle</span>
                                <div className="flex gap-2 mt-1 justify-center md:justify-start">
                                {user?.roles?.map((role) => (
                                    <span key={role} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase">
                                    {role}
                                    </span>
                                ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 md:pt-0">
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                            Modifier
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}