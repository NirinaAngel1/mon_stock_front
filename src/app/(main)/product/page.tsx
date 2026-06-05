"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getAllProducts, getAllCategories, createProduct, deleteProduct, updateProduct } from "@/app/services/productService";
import Loader from "@/components/Loader";
import ProductTable from "../../../components/product/ProductTable";
import { Plus, ChevronLeft, ChevronRight, SearchX, Package } from "lucide-react";
import BaseModal from "@/components/UI/BaseModal";
import ProductForm from "@/components/product/ProductForm";
import { toast } from "react-hot-toast";
import StockAdjustmentModal from "@/components/stock/StockAdjustmentModal";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [productToView, setProductToView] = useState<any>(null);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [productToAdjust, setProductToAdjust] = useState<any>(null);

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

  const handleEditProduct = (product:any)=>{
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (formData:any)=>{
    try{
      await updateProduct(productToEdit.id, formData);
      setIsEditModalOpen(false);
      setProductToEdit(null);
      fetchAll();
    }catch(error){
      console.error('Problème lors de la mise à jour : ', error);
      toast.error("Impossible de mettre à jour ce produit. Veuillez réessayer.");
    }
  }

  const handleViewProduct = (product:any)=>{
    setProductToView(product);
    setIsViewModalOpen(true);
  };

  const handleAdjustStock = (product:any)=>{
    setProductToAdjust(product);
    setIsAdjustModalOpen(true);
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
            <ProductTable 
            products={products}
            onDeleteClick={confirmDeleteProduct}
            onEditClick={handleEditProduct}
            onViewClick={handleViewProduct}
            onAdjustClick={handleAdjustStock} />

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

                {/* modale edition */}
        <BaseModal
        isOpen={isEditModalOpen}
        onClose={()=>setIsEditModalOpen(false)}
        title = "Modifier un produit"
        >
            <ProductForm 
            categories={categories}
            onSubmit={handleUpdateProduct}
            initialData={productToEdit}
            />
        </BaseModal>

              {/* modale details */}
        <BaseModal
        isOpen={isViewModalOpen}
        onClose={()=>setIsViewModalOpen(false)}
        title = "Détails du produit"
        >
            {productToView && (
          <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-border pb-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                      <Package size={24} />
                  </div>
                  <div>
                      <h2 className="text-xl font-bold">{productToView.name}</h2>
                      <p className="text-sm text-foreground/50">{productToView.category?.name || "Sans catégorie"}</p>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-foreground/[0.02] rounded-xl border border-border">
                      <p className="text-xs text-foreground/40 uppercase font-semibold">Prix de vente</p>
                      <p className="text-lg font-bold text-primary">{productToView.price} Ar</p>
                  </div>
                  <div className="p-4 bg-foreground/[0.02] rounded-xl border border-border">
                      <p className="text-xs text-foreground/40 uppercase font-semibold">Stock Actuel</p>
                      <p className={`text-lg font-bold ${productToView.currentStock <= productToView.lowStockThreshold ? 'text-orange-500' : 'text-green-500'}`}>
                          {productToView.currentStock} unités
                      </p>
                  </div>
              </div>

              <div>
                  <p className="text-xs text-foreground/40 uppercase font-semibold mb-2">Description</p>
                  <p className="text-sm text-foreground/80 bg-foreground/[0.02] p-3 rounded-lg border border-border italic">
                      {productToView.description || "Aucune description fournie."}
                  </p>
              </div>

              <div className="text-[10px] text-foreground/30 text-right">
                  ID Produit : #{productToView.id}
              </div>
          </div>
      )}
        </BaseModal>

        {/* modale ajustement stock */}
        <StockAdjustmentModal
        isOpen={isAdjustModalOpen}
        onClose={()=>{setIsAdjustModalOpen(false); setProductToAdjust(null);}}
        product={productToAdjust}
        onSuccess={fetchAll}
        />
  </div>
  );
}