"use client";

import React, { useState, useEffect } from "react";

export default function CategoryForm({ onSubmit, initialData }: any) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* CHAMP NOM */}
      <div>
        <label className="block text-sm font-medium mb-1">Nom de la catégorie</label>
        <input
          required
          type="text"
          placeholder="Ex: Électronique"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none"
        />
      </div>

      {/* CHAMP DESCRIPTION - Sur toute la largeur */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl outline-none focus:ring-2 ring-primary/20 transition-all resize-none"
          placeholder="Décrivez brièvement cette catégorie..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
      >
        {initialData ? "Modifier la catégorie" : "Enregistrer la catégorie"}
      </button>
    </form>
  );
}