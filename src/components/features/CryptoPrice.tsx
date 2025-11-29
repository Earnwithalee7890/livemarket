'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';

const fetchPrices = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin,cardano,polkadot,matic-network&vs_currencies=usd');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
};

export function CryptoPrice() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['cryptoPrices'],
        queryFn: fetchPrices,
        refetchInterval: 60000, // Refresh every minute
    });

    if (isError) return <div className="text-red-400 text-center py-4">Failed to load prices</div>;

    const coins = [
        { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', color: 'text-orange-500', bg: 'bg-orange-500/20' },
        { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', color: 'text-blue-500', bg: 'bg-blue-500/20' },
        { id: 'solana', symbol: 'SOL', name: 'Solana', color: 'text-purple-500', bg: 'bg-purple-500/20' },
        { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
        { id: 'cardano', symbol: 'ADA', name: 'Cardano', color: 'text-blue-400', bg: 'bg-blue-400/20' },
        { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', color: 'text-pink-500', bg: 'bg-pink-500/20' },
        { id: 'matic-network', symbol: 'MATIC', name: 'Polygon', color: 'text-indigo-500', bg: 'bg-indigo-500/20' },
    ];

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {isLoading ? (
                    [1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
                    ))
                ) : (
                    coins.map(coin => (
                        <Link
                            href={`/market/${coin.id}`}
                            key={coin.id}
                            className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full ${coin.bg} flex items-center justify-center ${coin.color} font-bold text-xs group-hover:scale-110 transition-transform`}>
                                    {coin.symbol}
                                </div>
                                <span className="font-medium text-white group-hover:text-indigo-300 transition-colors">{coin.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-green-400">
                                    ${data?.[coin.id]?.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                                </span>
                                <div className="text-gray-500 group-hover:translate-x-1 transition-transform">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            <button
                onClick={() => refetch()}
                className="w-full flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-white transition-colors pt-2"
            >
                <RefreshCw size={12} />
                Refresh Prices
            </button>
        </div>
    );
}
