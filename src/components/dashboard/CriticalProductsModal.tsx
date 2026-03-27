"use client";

import { X, AlertTriangle, PackageSearch} from 'lucide-react';

export default function CriticalProductsModal({
    products, 
    isOpen, 
    onClose}:{
        products:any[],
        isOpen:boolean,
        onClose:()=>void})
{
    if(!isOpen) return null;

    return(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
            <div className='bg-background border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]'>

                {/* En tête */}
                <div className='p-6 border-b border-border flex items-center justify-between bg-destructive/5'>
                    <div className='flex items-center gap-3 text-destructive'>
                        <AlertTriangle size={24}/>
                        <div>
                            <h2 className='text-xl font-bold'>Stocks critiques</h2>
                                <p className='text-xs opacity-70'>{products.length} produits en alertes actuellement!!</p>
                        </div>
                    </div>
                    <button onClick={onClose} className='p-2 hover:bg-foreground/10 rounded-full transition-colors'>
                    <X size={24}/>
                    </button>
                </div>

                {/* Liste des articles & scroll en interne */}
                <div className='flex-1 overflow-y-auto p-6 space-y-4'>
                    <table className='w-full text-left'>
                        <thead>
                            <tr className='text-xs uppercase text-foreground/40 border-b border-border'>
                                <th className='pb-3 font-semibold'>Produits</th>
                                <th className='pb-3 font-semibold text-center'>Seuil</th>
                                <th className='pb-3 font-semibold text-center'>Etat actuel</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-border'>
                            {products.map((product)=>(
                                <tr key={product.id} className='group hover:bg-background/[0.20]'>
                                    <td className='py-4'>
                                        <span className='font-medium text-sm'>{product.name}</span></td>
                                    <td className='py-4 text-center text-sm text-foreground/60'>{product.lowStockThreshold}</td>
                                    <td className='py-4 text-right'>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock === 0 ? 'bg-destructive/10 text-destructive' : 'bg-orange-500/10 text-orange-500'}`}>{product.stock} en stock</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* footer */}
                <div className='p-4 border-t border-border bg-foreground/[0.20] flex justify-end'>
                    <button onClick={onClose} className='px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity'>Fermer</button>
                </div>
            </div>
        </div>
    );
}