'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DateRowProps {
    dates: number[];
    currentDate: number;
    selectedDate: number;
    onSelectDate: (date: number) => void;
}

export function DateRow({ dates, currentDate, selectedDate, onSelectDate }: DateRowProps) {
    return (
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x">
            {dates.map((date) => {
                const isSelected = date === selectedDate;
                const isToday = date === currentDate;

                return (
                    <motion.button
                        key={date}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSelectDate(date)}
                        className={cn(
                            "flex flex-col items-center justify-center min-w-[50px] h-[70px] rounded-2xl snap-center",
                            "border transition-all duration-300",
                            isSelected
                                ? "bg-primaryEnd text-white border-primaryEnd shadow-lg shadow-primaryEnd/30"
                                : "bg-white dark:bg-[#151518] text-gray-500 dark:text-gray-400 border-gray-100 dark:border-white/5"
                        )}
                    >
                        <span className="text-xs font-medium mb-1">
                            {isToday ? 'TODAY' : 'DAY'}
                        </span>
                        <span className={cn(
                            "text-xl font-bold",
                            isSelected ? "text-white" : "text-gray-900 dark:text-white"
                        )}>
                            {date}
                        </span>
                        {isToday && !isSelected && (
                            <div className="w-1 h-1 rounded-full bg-primaryEnd mt-1" />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
