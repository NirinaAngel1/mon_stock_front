"use client";

type Movement = {
    id:number;
    name:string;
    type: "IN" | "OUT";
    quantity:number;
    date:string;
    user?:string;
}

export default function RecentMovements({data}:{data:Movement[]}){
    return(
        <div className="p-4 border border-border rounded-xl bg-background">

            <h2 className="text-sm font-semibold mb-4">Derniers mouvements</h2>

            <table className="w-full text-sm">

                <thead className="text-left text-foreground/60 border-b">
                    <tr>
                        <th>Produits</th>
                        <th className="hidden sm:table-cell">Type</th>
                        <th className="hidden sm:table-cell">Quantité</th>
                        <th className="hidden md:table-cell">Date</th>
                        <th className="hidden lg:table-cell">Utilisateur</th>
                    </tr>
                </thead>

                <tbody>
                    {data?.map((item)=>(
                        <tr key={item.id} className="border-b hover:bg-primary/5">
                            <td className="py-2 font-medium">
                                <div className="flex flex-col">
                                <span>
                                {item.name}
                                </span>
                                <span className="text-xs text-foreground/50 sm:hidden">
                                {item.type} | {item.quantity}
                                </span>
                                </div>
                                </td>

                            <td className="hidden sm:table-cell">
                                <span className={`px-2 py-1 text-xs rounded-md ${item.type==="IN"
                                    ?"bg-green-100 text-green-600"
                                    :"bg-red-100 text-red-600"
                                }`}>
                                    {item.type=== "IN" ? "Entrée" : "Sortie" }
                                </span>
                            </td>

                            <td className="hidden sm:table-cell">{item.quantity}</td>
                            <td className="hidden md:table-cell text-foreground/60">{item.date}</td>
                            <td className="hidden lg:table-cell text-foreground/60">{item.user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}