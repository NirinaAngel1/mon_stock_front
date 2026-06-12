"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as orderService from "@/app/services/orderService";
import * as productService from "@/app/services/productService";
import * as customerService from "@/app/services/customerService";
import * as supplierService from "@/app/services/supplierService";
import OrderForm from "@/components/orders/OrderForm";
import Loader from "@/components/Loader";

export default function NewOrderPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                setLoading(true);
                // Chargement simultané de toutes les listes requises
                const [prodData, custData, suppData] = await Promise.all([
                    productService.getAllProducts(),
                    customerService.getAllCustomers(),
                    supplierService.getAllSuppliers()
                ]);
                
                setProducts(prodData);
                setCustomers(custData);
                setSuppliers(suppData);
            } catch (err) {
                console.error("Erreur d'initialisation du formulaire :", err);
                setError("Échec du chargement des données. Veuillez recharger la page.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, []);

    const handleFormSubmit = async (formData: any) => {
        try {
            setSubmitting(true);
            setError(null);
            
            // Soumission des données au backend Symfony
            await orderService.createOrder(formData);
            
            // Redirection vers l'index commercial après enregistrement
            router.push("/orders");
        } catch (err: any) {
            console.error("Erreur d'enregistrement de commande :", err);
            setError(err.response?.data?.message || "Une erreur est survenue lors de la création de la commande.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || submitting) return <Loader />;

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Édition de Flux</h1>
                <p className="text-sm text-foreground/60">Générez un nouveau bon d'achat ou de vente pour ajuster le stock global.</p>
            </div>

            {error && (
                <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-xl border border-destructive/20">
                    {error}
                </div>
            )}

            <div className="bg-foreground/[0.02] border border-border p-6 rounded-xl">
                <OrderForm 
                    onSubmit={handleFormSubmit} 
                    products={products} 
                    customers={customers} 
                    suppliers={suppliers} 
                />
            </div>
        </div>
    );
}