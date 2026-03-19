"use client";

import React from "react";

export default function TestPage(){
    return(
        <>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center ">
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">
                            Titre du Projet
                        </h3>
                        <p className="text-sm text-slate-500">
                            Description courte et aérée du projet.
                        </p>
                    </div>
                </div>   
            </div>
        </>
    )
}