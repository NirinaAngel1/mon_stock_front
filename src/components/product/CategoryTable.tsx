import { Edit2, Trash2, Eye, Package, RefreshCw } from "lucide-react";

interface ProductTableProps {
    categories: any[];
    onDeleteClick: (category: any) => void;
    onEditClick: (category: any) => void;
    onViewClick: (category: any) => void;
}

export default function CategoryTable({ categories, onDeleteClick, onEditClick, onViewClick }: ProductTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border bg-foreground/[0.20] text-xs uppercase text-foreground/50">
                        <th className="px-6 py-4 font-semibold">Nom</th>
                        <th className="px-6 py-4 font-semibold">Description</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {categories.map((category)=>{
                        return (
                            <tr key={category.id} className="hover:bg-foreground/[0.20] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                                            <Package size={18}/>
                                        </div>
                                            <span className="font-medium text-sm text-foreground truncate max-w-[200px]">{category.name}</span>
                                        </div>                    
                                </td>

                                <td className="px-6 py-4 text-sm font-medium">{category.description}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => onViewClick(category)} className="p-2 hover:bg-primary/10 text-primary rounded-md" title="Voir">
                                            <Eye size={16} />
                                        </button>
                                        <button onClick={() => onEditClick(category)} className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-md" title="Modifier">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => onDeleteClick(category)} className="p-2 hover:bg-destructive/10 text-destructive rounded-md" title="Supprimer">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}