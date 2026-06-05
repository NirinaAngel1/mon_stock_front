"use client";

import { useState } from "react";
import BaseModal from "../UI/BaseModal";
import { adjustStock } from "@/app/services/productService";
import { toast } from "react-hot-toast";

interface StockAdjustmentModalProps {
    isOpen: boolean;
    onClose: () => void;//pour fermer la modale
    product : { id: number; name: string; currentStock: number } | null;//le produit à ajuster
    onSuccess: () => void;//pour rafraîchir la liste des produits après ajustement
}

export default function StockAdjustmentModal({isOpen, onClose, product, onSuccess}:StockAdjustmentModalProps){
    const [quantity, setQuantity] = useState<number>(1);
    const [type, setType] = useState<'IN' | 'OUT' | 'ADJUSTMENT'>('ADJUSTMENT');
    const [reason, setReason] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!product) return;

        const adjustmentData = {
            productId: product.id,
            quantity,
            type,
            reason : reason || "Ajustement de stock"
        };

        console.log(adjustmentData);

        setLoading(true);
        try{
            await adjustStock(adjustmentData);
            toast.success("Stock ajusté avec succès");
            onSuccess();
            onClose();
        }catch(error:any){
            toast.error(error.message || "Erreur lors de l'ajustement du stock");
        }finally{
            setLoading(false);
        }
    };

    return(
        <BaseModal isOpen={isOpen} onClose={onClose} title={`Ajuster le stock de ${product?.name || ''}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium  text-foreground mb-1">Type d'ajustement</label>
                    <select
                        value={type}
                        // onChange={(e) => setType(e.target.value as 'IN' | 'OUT' | 'ADJUSTMENT')}
                        onChange={(e) => setType(e.target.value as any)}
                        className="border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                        <option value="ADJUSTMENT">Correction</option>
                        <option value="IN">Entrée (+)</option>
                        <option value="OUT">Sortie (-)</option>
                    </select>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground mb-1">Quantité</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        min="1"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground mb-1">Raison / Commentaire</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="p-2 border rounded-md bg-background min-h-[100px]"
                        placeholder="Ex: Correction d'inventaire, retour fournisseur, Casse..."
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                        disabled={loading}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
                        disabled={loading}
                    >
                        {loading ? "Ajustement..." : "Ajuster le stock"}
                    </button>
                </div>
            </form>
        </BaseModal>
    );
}