"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

type MonthlyData = {
    month:string,
    total:number
}

export default function MonthlyChart({data}:{data: MonthlyData[]}){
    return(
        <div className="p-4 bg-background border border-border rounded-xl shadow-sm">
            <div className="mb-4">
                <h2 className="text-sm font-semibold text-foreground">
                    Activité mensuelle
                </h2>
                <p className="text-xs text-foreground/50">
                    Nombre de mouvements par mois
                </p>
            </div>

            <div className="w-full h-80">
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis
                                dataKey="month"
                                stroke="currentColor"
                                fontSize={12}
                            />

                            <YAxis
                                stroke="currentColor"
                                fontSize={12}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "8px",
                                    border:"1px solid #e5e7eb"
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#6366f1"
                                strokeWidth={2}
                                dot={{ r: 4}}
                                activeDot={{ r: 6 }}
                            />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}