"use client";

import StatCard from "./StatCard";
import {
    Package,
    AlertTriangle,
    Boxes
} from "lucide-react";

type SummaryProps = {
    data:{
        totalProducts: number;
        outOfStock: number;
        lowStock:number;
    };
};

export default function SummaryCard({data}:SummaryProps){
    return(
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard
                title="Produits"
                value={data?.totalProducts || 0}
                icon={<Package size={20} />}
            />
            <StatCard
                title="Rupture de stock"
                value={data?.outOfStock || 0}
                icon={<AlertTriangle size={20} />}
                color="text-red-500"
            />

            <StatCard
                title="Stock faible"
                value={data?.lowStock || 0}
                icon={<Boxes size={20} />}
                color="text-orange-500"
            />
        </div>
    );
}