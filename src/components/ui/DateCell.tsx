'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DateCellProps {
    date: number;
    isToday: boolean;
    isChecked: boolean;
    onClick?: () => void;
}

export function DateCell({ date, isToday, isChecked, onClick }: DateCellProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={cn(
                "aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all",
                isChecked
                    ? "bg-gradient-to-br from-primaryStart to-primaryEnd text-white shadow-md"
                    : isToday
                        ? "bg-gray-100 dark:bg-white/10 text-primaryEnd border-2 border-primaryEnd"
                        : "bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/10"
            )}
        >
            {date}
        </motion.button>
    );
}
