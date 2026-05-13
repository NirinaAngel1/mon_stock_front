"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getAllProducts, getAllCategories, createProduct, deleteProduct } from "@/app/services/productService";
import Loader from "@/components/Loader";
import ProductTable from "../../../components/product/ProductTable";
import { Plus, ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import BaseModal from "@/components/UI/BaseModal";
import ProductForm from "@/components/product/ProductForm";
import { toast } from "react-hot-toast";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  const SearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = parseInt(SearchParams.get("page") || "1");
  const searchQuery = SearchParams.get("q") || "";

  useEffect(()=>{
    const fetchCategories = async ()=>{
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Erreur de chargement categorie : ', error);
        }
    }
    fetchCategories();
  },[]);

  const fetchAll = async () => {
      setLoading(true);
      try {
        // L'API filtre déjà pour nous grâce à searchQuery
        const json = await getAllProducts(currentPage, searchQuery);
        setProducts(json.data ?? []);
        setMetadata(json.metadata ?? null);
      } catch (error) {
        console.error("Erreur de chargement : ", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAll();
  }, [currentPage, searchQuery]);

  const handleChangePage = (newPage: number) => {
    const params = new URLSearchParams(SearchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearSearch = ()=>{
    const params = new URLSearchParams(SearchParams);
    params.delete('q');
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleCreateProduct = async (formData : any)=>{
    try {
        await createProduct(formData);
        setIsModalOpen(false);
        fetchAll();
    } catch (error) {
        console.error('Problème lors de la création : ', error);
        toast.error('Impossible de créer le produit. Veuillez réessayer.');
    }
  };

  const confirmDeleteProduct = (product:any)=>{
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  }

  const handleDeleteProduct = async ()=>{
    if(!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      fetchAll();
    } catch (error) {
      console.error('Problème lors de la suppression : ', error);
      toast.error("Impossible de supprimer ce produit. Vérifiez s'il n'est pas lié à des commandes.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventaire</h1>
          <p className="text-foreground/50 text-sm">Gérez vos stocks en toute sécurité.</p>
        </div>
        <button
        onClick={ () => setIsModalOpen(true) }
        className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <Plus size={20} /> Nouveau Produit
        </button>
      </div>

      {/* Indicateur de recherche */}
        {searchQuery && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="text-sm text-foreground/60">
                    Résultats pour : <span className="font-semibold text-primary">"{searchQuery}"</span> 
                    {metadata && ` (${metadata.totalItems} ${metadata.totalItems > 1 ? "produits trouvés":"produit trouvé"})`}
                    </div>
                <div>
                    <button onClick={() => clearSearch()} className="text-primary text-sm font-semibold hover:underline">Effacer la recherche</button>
                </div>
            </div>
        )}

      {/* Conteneur du Tableau */}
      <div className="bg-background border border-border rounded-2xl shadow-custom overflow-hidden">
        {products.length > 0 ? (
          <>
            <ProductTable products={products} onDeleteClick={confirmDeleteProduct} />

            {/* Pagination - Utilisation des clés snake_case de ton API */}
            {metadata && metadata.totalPages > 1 && (
              <div className="p-4 border-t border-border flex items-center justify-between bg-foreground/[0.01]">
                <span className="text-xs text-foreground/50">
                  Page {metadata.currentPage} sur {metadata.totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleChangePage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="p-2 border border-border rounded-lg disabled:opacity-30 hover:bg-foreground/5 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => handleChangePage(currentPage + 1)}
                    disabled={currentPage >= metadata.totalPages}
                    className="p-2 border border-border rounded-lg disabled:opacity-30 hover:bg-foreground/5 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* ÉTAT VIDE : Si aucun produit n'est trouvé */
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="p-4 bg-foreground/5 rounded-full">
              <SearchX size={48} className="text-foreground/20" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">Aucun produit trouvé</p>
              <p className="text-sm text-foreground/40">
                {searchQuery 
                  ? `Nous n'avons rien trouvé pour "${searchQuery}".`
                  : "Votre inventaire est actuellement vide."}
              </p>
            </div>
          </div>
        )}
        </div>

        {/* modale creation */}
        <BaseModal
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        title = "Ajouter un produit"
        >
            <ProductForm 
            categories={categories}
            onSubmit={handleCreateProduct}
            />
        </BaseModal>

        {/* modale suppression */}
        <BaseModal
        isOpen={isDeleteModalOpen}
        onClose={()=>setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        >
            <p>Êtes-vous sûr de vouloir supprimer le produit <span className="font-bold">{productToDelete?.name}</span> ? Cette action est irréversible.</p>
            <div className="flex justify-end gap-4 mt-6">
                <button onClick={()=>setIsDeleteModalOpen(false)} className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-foreground/5 transition-colors">Annuler</button>
                <button onClick={handleDeleteProduct} className="px-4 py-2 bg-destructive text-white rounded-lg hover:opacity-90 transition-opacity">Supprimer</button>
                </div>
        </BaseModal>
  </div>
  );
}