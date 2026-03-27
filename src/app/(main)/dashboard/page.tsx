'use client';

import React, { use, useEffect, useState } from "react";
import { getDashboard, getMonthlyStats, getCriticalsProducts } from "@/app/services/dashboardService";
import Loader from "@/components/Loader";
import SummaryCard from "@/components/dashboard/SummaryCard";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import CriticalProduct from "@/components/dashboard/CriticalProduct";
import CriticalProductsModal from "@/components/dashboard/CriticalProductsModal";
import RecentMovements from "@/components/dashboard/RecentMovements";

export default function DashboardPage() {

    const [data, setData]=useState<any>(null);
    const [monthly, setMonthly]=useState<any>([]);
    const [loading, setLoading]=useState(true);
    const [movements, setMovements]=useState([]);
    const [criticalProducts, setCriticalProducts]=useState([]);
    const [isModalOpen, setIsModalOpen]=useState(false);

    useEffect(()=>{
        const fetchDashboard = async ()=>{
            try{
                const dashboardData = await getDashboard();
                const stats = await getMonthlyStats();
                const critical = await getCriticalsProducts();

                const formattedMonthly = stats.labels.map((label: string, index: number )=>({
                    month:label,
                    total: stats.data[index]
                }));

                setData(dashboardData.summary);
                setMonthly(formattedMonthly);
                setMovements(dashboardData.lastMovements);
                setCriticalProducts(critical);
            }catch(error){
                console.error('Erreur Dashboard : ', error)
            }finally{
                setLoading(false);
            }
        };

        fetchDashboard();
    },[])

    console.log(criticalProducts, data, movements, monthly);

    if (loading){
        return <Loader/>
    }

    return (
        <>
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8 dark:text-text-dark light:text-text-light">
            <h1 className="text-2xl font-bold">
                Bienvenue sur votre tableau de bord
            </h1>
            <p className="text-sm font-medium">Visualisez vos statistiques, événements, et informations importantes.
            </p>
            </div>
        </div>
         <div className="space-y-6">
            <SummaryCard data={data} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentMovements data={movements}/>
                </div>
                <div className="lg:col-span-">
                    <CriticalProduct products={criticalProducts} onViewAll={()=>setIsModalOpen(true)}/>
                </div>
            </div>
                <CriticalProductsModal products={criticalProducts} isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)} />
            <MonthlyChart data={monthly} />
        </div>
        </>
    )
}