'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface CoinChartProps {
    coinId: string;
}

const fetchChartData = async (coinId: string) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`);
    if (!res.ok) throw new Error('Failed to fetch chart data');
    const data = await res.json();
    return data.prices.map((item: [number, number]) => ({
        date: item[0],
        price: item[1],
    }));
};

export function CoinChart({ coinId }: CoinChartProps) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['coinChart', coinId],
        queryFn: () => fetchChartData(coinId),
        refetchInterval: 60000 * 5, // 5 minutes
    });

    if (isLoading) return (
        <div className="w-full h-[300px] flex items-center justify-center bg-white/5 rounded-3xl animate-pulse">
            <div className="text-gray-500 text-sm">Loading Chart...</div>
        </div>
    );

    if (isError) return (
        <div className="w-full h-[300px] flex items-center justify-center bg-white/5 rounded-3xl">
            <div className="text-red-400 text-sm">Failed to load chart data</div>
        </div>
    );

    return (
        <div className="w-full h-[300px] bg-[#0A0A0A] border border-white/5 rounded-3xl p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="date"
                        hide={true}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        orientation="right"
                        tick={{ fill: '#6b7280', fontSize: 10 }}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#e5e7eb' }}
                        labelStyle={{ display: 'none' }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#818cf8"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
