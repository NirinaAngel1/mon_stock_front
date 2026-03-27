"use client";

import { AlertCircle, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Product {
    id:number;
    name:string;
    lowStockThreshold:number;
    stock:number;
}

interface CriticalProductProps {
    products: Product[];
    onViewAll: () => void;
}

export default function CriticalProduct({ products, onViewAll }:CriticalProductProps){
   
    return(
        <div className="bg-background border border-border rounded-xl shadow-custom p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-destructive font-bold">
                    <AlertCircle size={18}/>
                    <span>Alerts Stocks</span>
                </div>
                <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                    {products.length} critiques
                </span>
            </div>

            <div className="space-y-2">
                {products.length > 0 ? (
                    products.slice(0, 3).map((product)=>(
                        <div
                         key={product.id}
                         className="group flex items-center justify-between p-2 hover:bg-foreground/5 rounded-lg transition-colors cursor-pointer">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground truncate max-w-[150px]">
                                    {product.name}
                                </span>
                                <span className="text-[10px] text-foreground/50">Seuil : {product.lowStockThreshold}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-bold ${product.stock === 0 ? 'text-destructive':'text-orange-500'}`}>{product.stock}</span>
                                <ChevronRight size={14} className="text-foreground/20 group-hover:text-foreground/60 transition-colors"/>
                            </div>
                         </div>
                    ))
                ):(
                    <p className="text-sm text-foreground/40 text-center py-4">Aucune alerte de stock</p>
                )}
            </div>
                {products.length > 6 && (
                    <button onClick={onViewAll} className="w-full mt-4 pt-3 border-t border-border text-xs font-semibold text-primary hover:opacity-80 transition-opacity">VOIR TOUT L'INVENTAIRE</button>
                )}
        </div>
    );
}