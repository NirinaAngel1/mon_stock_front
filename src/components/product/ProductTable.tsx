import { Edit2, Trash2, Eye, Package } from "lucide-react";

interface ProductTableProps {
    products: any[];
    onDeleteClick: (product: any) => void;
}

export default function ProductTable({ products, onDeleteClick }: ProductTableProps) {
    return (
        <div className="overflow-x-auto">
            <>{console.log(products)}</>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border bg-foreground/[0.20] text-xs uppercase text-foreground/50">
                        <th className="px-6 py-4 font-semibold">Produit</th>
                        <th className="px-6 py-4 font-semibold">Catégorie</th>
                        <th className="px-6 py-4 font-semibold">Stock</th>
                        <th className="px-6 py-4 font-semibold">Prix</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {products.map((product)=>{
                        const isLowStock = product.currentStock > 0 && product.currentStock <= product.lowStockThreshold
                        const isOutOfStock = product.currentStock === 0;

                        return (
                            <tr key={product.id} className="hover:bg-foreground/[0.20] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                                            <Package size={18}/>
                                        </div>
                                            <span className="font-medium text-sm text-foreground truncate max-w-[200px]">{product.name}</span>
                                        </div>                    
                                </td>
                                <td className="px-6 py-4 text-sm text-foreground/60">
                                    {product.category?.name || "Non classé"}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                        isOutOfStock ? 'bg-destructive/10 text-destructive' :
                                        isLowStock ? 'bg-orange-500/10 text-orange-500' :
                                        'bg-green-500/10 text-green-500'
                                    }`}>
                                        {isOutOfStock ? 'Rupture de stock' : `${product.currentStock} en stock`}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">{product.price} Ar</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-primary/10 text-primary rounded-md" title="Voir">
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-md" title="Modifier">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => onDeleteClick(product)} className="p-2 hover:bg-destructive/10 text-destructive rounded-md" title="Supprimer">
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