'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TokenRowProps {
    icon: string; // URL or emoji
    symbol: string;
    name: string;
    amount: string;
    value: string;
    onClick?: () => void;
}

export function TokenRow({ icon, symbol, name, amount, value, onClick }: TokenRowProps) {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "flex items-center justify-between p-4 rounded-xl mb-3",
                "bg-white dark:bg-[#151518] shadow-sm border border-gray-100 dark:border-white/5",
                "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            )}
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xl overflow-hidden">
                    {icon.startsWith('http') ? (
                        <img src={icon} alt={symbol} className="w-full h-full object-cover" />
                    ) : (
                        <span>{icon}</span>
                    )}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{amount} {symbol}</p>
                </div>
            </div>
            <div className="text-right">
                <h4 className="font-semibold text-gray-900 dark:text-white">{value}</h4>
            </div>
        </motion.div>
    );
}
