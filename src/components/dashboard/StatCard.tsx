"use client";

import { ReactNode } from "react";

type StatCardProps = {
    title: string;
    value: number;
    icon?: ReactNode;
    color?: string;
}

export default function StatCard({
    title,
    value,
    icon,
    color = "text-primary"
}: StatCardProps){
    return(
        <div className="p-4 rounded-xl border border-border bg-background shadow-custom hover:shadow-md hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between">
                <p className="text-sm text-foreground/60">{title}</p>
                <div className={`${color}`}>{icon}</div>
            </div>

            <h2 className="mt-2 text-2xl font-bold text-foreground">{value}</h2>
        </div>
    );
}