"use client";

import { Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface OrderTableProps {
    orders: any[];
}

export default function OrderTable({ orders }: OrderTableProps) {
    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            draft:"bg-foreground/10 text-foreground/70",
            pending:"bg-blue-500/10 text-blue-500",
            completed:"bg-green-500/10 text-green-500",
            cancelled:"bg-destructive/10 text-destructive"
        };

        const labels: Record<string, string> = {
            draft:"Brouillon",
            pending:"En attente",
            completed:"Validée",
            cancelled:"Annulé"
        };
        return(
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${styles[status] || styles.draft}`}>
                {labels[status] || status}
            </span>
        );
    };

    return(
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border bg-foreground/[0.20] text-xs uppercase text-foreground/50">
                        <th className="px-6 py-4 font-semibold">Référence</th>
                        <th className="px-6 py-4 font-semibold">Type</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Montant Total</th>
                        <th className="px-6 py-4 font-semibold">Statut</th>
                        <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-sm text-foreground/40">
                                Aucune commande enregistrée pour le moment.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id} className="hover:bg-foreground/[0.20] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                                            <ShoppingCart size={18} />
                                        </div>
                                        <span className="font-mono font-medium text-sm text-foreground">{order.reference}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {order.type === 'sales' ? (
                                        <span className="text-green-500 font-medium">⬇️ Vente (Client)</span>
                                    ) : (
                                        <span className="text-orange-500 font-medium">⬆️ Achat (Fournisseur)</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-foreground/60">
                                    {new Date(order.date).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="px-6 py-4 text-sm font-bold">
                                    {parseFloat(order.totalAmount).toLocaleString('fr-FR')} Ar
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(order.status)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/orders/${order.id}`} className="p-2 hover:bg-primary/10 text-primary rounded-md" title="Voir les détails">
                                            <Eye size={16} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}