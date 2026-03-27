"use client";

import React, { useState } from "react";

export default function ProductForm({ onSubmit, categories }: any){
    const [formData, setFormData] = useState({
        name:"",
        price:"",
        category:"",
        lowStockThreshold:5,
        initial_stock:0
    });

    const handleSubmit = ( e: React.FormEvent ) => {
        e.preventDefault();

        // convertir les prix et stock avant l'envoi
        onSubmit({
            ...formData,
            price: parseFloat(formData.price),
            category: parseInt(formData.category),
        });
    };

    return(
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nom du produit</label>
                <input 
                required
                type="text"
                value={formData.name}
                onChange={(e)=> setFormData({... formData, name: e.target.value})}
                className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Prix en ariary</label>
                    <input 
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e)=>setFormData({... formData, price: e.target.value})}
                    className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Catégorie</label>
                    <select
                    required
                    value={formData.category}
                    onChange={(e)=>setFormData({...formData, category:e.target.value})}
                    className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl outline-none"
                    >
                        <option value="">
                            Sélectionner...
                        </option>
                        {categories.map((cat:any)=>(
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Stock initial</label>
                    <input 
                    type="number"
                    value={formData.initial_stock}
                    onChange={(e)=>setFormData({...formData, initial_stock:parseInt(e.target.value)})}
                    className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Seuil</label>
                    <input
                    type="number"
                    className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl outline-none"
                    value={formData.lowStockThreshold}
                    onChange={(e)=>setFormData({... formData, lowStockThreshold: parseInt(e.target.value)})}
                    />
                </div>
            </div>

            <button 
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
                Enregistrer le produit</button>
        </form>
    );
}