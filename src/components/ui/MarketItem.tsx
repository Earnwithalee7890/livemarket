'use client';

import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketItemProps {
    symbol: string;
    name: string;
    price: string;
    change: number;
    icon: string;
}

export function MarketItem({ symbol, name, price, change, icon }: MarketItemProps) {
    const isPositive = change >= 0;

    return (
        <Card className="ag-card">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primaryStart/20 to-primaryEnd/20 flex items-center justify-center text-xl">
                        {icon}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white">{symbol}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{name}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{price}</p>
                    <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
