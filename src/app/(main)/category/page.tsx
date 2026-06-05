"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getAllCategories, createCategory, deleteCategory, updateCategory } from "@/app/services/categoryService";
import Loader from "@/components/Loader";
import CategoryTable from "@/components/product/CategoryTable"; // Assure-toi du bon chemin
import BaseModal from "@/components/UI/BaseModal";
import CategoryForm from "@/components/product/CategoryForm";
import { toast } from "react-hot-toast";
import { Plus, Package, SearchX } from "lucide-react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // États des Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Objets sélectionnés
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<any>(null);
  const [categoryToView, setCategoryToView] = useState<any>(null);

  // Fonction de chargement
  const fetchAllCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erreur de chargement categorie : ', error);
      toast.error("Erreur lors de la récupération des catégories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  // --- ACTIONS ---

  const handleCreateCategory = async (formData: any) => {
    try {
      await createCategory(formData);
      toast.success("Catégorie créée !");
      setIsModalOpen(false);
      fetchAllCategories();
    } catch (error) {
      toast.error('Erreur lors de la création');
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete.id);
      toast.success("Catégorie supprimée");
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      fetchAllCategories();
    } catch (error) {
      toast.error("Suppression impossible : des produits utilisent cette catégorie.");
    }
  };

  const handleUpdateCategory = async (formData: any) => {
    try {
      await updateCategory(categoryToEdit.id, formData);
      toast.success("Catégorie mise à jour");
      setIsEditModalOpen(false);
      setCategoryToEdit(null);
      fetchAllCategories();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Catégories</h1>
          <p className="text-foreground/50 text-sm">Organisez vos produits par types.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Nouvelle Catégorie
        </button>
      </div>

      {/* Conteneur du Tableau */}
      <div className="bg-background border border-border rounded-2xl shadow-custom overflow-hidden">
        {categories.length > 0 ? (
          <CategoryTable
            categories={categories}
            onDeleteClick={(cat: any) => { setCategoryToDelete(cat); setIsDeleteModalOpen(true); }}
            onEditClick={(cat: any) => { setCategoryToEdit(cat); setIsEditModalOpen(true); }}
            onViewClick={(cat: any) => { setCategoryToView(cat); setIsViewModalOpen(true); }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="p-4 bg-foreground/5 rounded-full">
              <SearchX size={48} className="text-foreground/20" />
            </div>
            <p className="text-lg font-medium text-foreground">Aucune catégorie trouvée</p>
          </div>
        )}
      </div>

      {/* MODALE CREATION */}
      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajouter une catégorie">
        <CategoryForm onSubmit={handleCreateCategory} />
      </BaseModal>

      {/* MODALE SUPPRESSION */}
      <BaseModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmer la suppression">
        <div className="space-y-4">
          <p>Êtes-vous sûr de vouloir supprimer <span className="font-bold">{categoryToDelete?.name}</span> ?</p>
          <div className="flex justify-end gap-4 mt-6">
            <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border rounded-lg">Annuler</button>
            <button onClick={handleDeleteCategory} className="px-4 py-2 bg-destructive text-white rounded-lg">Supprimer</button>
          </div>
        </div>
      </BaseModal>

      {/* MODALE EDITION */}
      <BaseModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Modifier la catégorie">
        <CategoryForm onSubmit={handleUpdateCategory} initialData={categoryToEdit} />
      </BaseModal>

      {/* MODALE DETAILS */}
      <BaseModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Détails de la catégorie">
        {categoryToView && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                <Package size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{categoryToView.name}</h2>
                <p className="text-sm text-foreground/50">ID: #{categoryToView.id}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-foreground/40 uppercase font-semibold mb-2">Description</p>
              <p className="text-sm text-foreground/80 bg-foreground/[0.02] p-3 rounded-lg border border-border italic">
                {categoryToView.description || "Aucune description fournie."}
              </p>
            </div>
          </div>
        )}
      </BaseModal>
    </div>
  );
}