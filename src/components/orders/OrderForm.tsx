"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

interface OrderFormProps {
    onSubmit: (data: any) => void;
    products: any[];
    customers: any[];
    suppliers: any[];
}

export default function OrderForm({ onSubmit, products, customers, suppliers }: OrderFormProps){
    const [type, setType] = useState("purchase");
    const [partenerId, setPartenerId] = useState("");
    const [lines,setLines] = useState<Array<{ productId: string; quantity: number }>>([
        { productId: "", quantity: 1}
    ]);

    // Réinitialiser le partenerId lorsque le type de commande change
    useEffect(()=>{
        setPartenerId("");
    }, [type]);

    const handleLineChange = (index: number, field: string, value: any)=>{
        const updatedLines = [...lines];
        updatedLines[index] = { ...updatedLines[index], [field]: value };
        setLines(updatedLines);
    };

    const addLine = () => {
        setLines([...lines, { productId: "", quantity: 1 }]);
    };

    const removeLine = (index: number) => {
        if(lines.length > 1){
            setLines(lines.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            type,
            partenerId,
            lines: lines.map(line => ({
                product: parseInt(line.productId),
                quantity: Math.max(1, line.quantity) // s'assurer que la quantité est au moins 1
            }))
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* configuration du flux  */}
            <div className="grid grid-cols-1 ">
                <div>
                    <label className="block text-sm font-medium mb-1">Type de commande</label>
                    <select 
                    value={type}
                    onChange={(e)=>setType(e.target.value)}
                    className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none"
                    >
                        <option value="purchases">Achat Fournisseur (Entrée de stock)</option>
                        <option value="sales">Vente Client (Sortie de stock)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        {type === "sales" ? "Client" : "Fournisseur"}
                    </label>
                    <select 
                    aria-required
                    value={partenerId}
                    onChange={(e)=>setPartenerId(e.target.value)}
                    className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none"
                    >
                        <option value="">Séléctionner un tiers...</option>
                        {type === "sales" ? (
                            customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))
                        ) : (
                            suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>
            </div>

            {/* section des lignes de commande */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-2">
                    <h3 className="text-sm font-medium text-foreground">Lignes de commande</h3>
                    <button type="button" onClick={addLine} className="flex items-center gap-1.5 text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all">
                        <Plus size={16} />
                        Ajouter une ligne
                    </button>
                </div>
                {lines.map((line, index) => {
                    const currentProduct = products.find(p => p.id === parseInt(line.productId));
                    return (
                        <div key={index} className="flex gap-4 items-end bg-foreground/[0.02] p-3 rounded-xl border border-border/40 group relative">
                            <div className="flex-1">
                                <label className="block text-xs text-foreground/50 mb-1">Désignation du produit</label>
                                <select
                                    required
                                    value={line.productId}
                                    onChange={(e) => handleLineChange(index, "productId", e.target.value)}
                                    className="w-full p-2 bg-foreground/5 border border-border rounded-lg outline-none text-sm"
                                >
                                    <option value="">Sélectionner...</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} ({p.price.toLocaleString()} Ar)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-28">
                                <label className="block text-xs text-foreground/50 mb-1">Quantité</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    value={line.quantity}
                                    onChange={(e) => handleLineChange(index, "quantity", parseInt(e.target.value))}
                                    className="w-full p-2 bg-foreground/5 border border-border rounded-lg outline-none text-sm text-center"
                                />
                            </div>

                            <div className="w-32 hidden md:block">
                                <label className="block text-xs text-foreground/50 mb-1">Sous-total</label>
                                <div className="p-2 bg-foreground/5 rounded-lg text-sm font-semibold text-right text-foreground/70 border border-transparent">
                                    {currentProduct ? `${(currentProduct.price * (line.quantity || 0)).toLocaleString()} Ar` : "0 Ar"}
                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={lines.length === 1}
                                onClick={() => removeLine(index)}
                                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg disabled:opacity-30 transition-all self-end mb-0.5"
                                title="Supprimer la ligne"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* validation */}
            <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
                Générer le brouillon de commande
            </button>
        </form>
    )
}