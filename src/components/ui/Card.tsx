'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cardSpring } from '@/lib/motionPresets';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    gradientHeader?: boolean;
    onClick?: () => void;
}

export function Card({ children, className, gradientHeader, onClick }: CardProps) {
    return (
        <motion.div
            variants={cardSpring}
            initial="initial"
            animate="animate"
            whileTap={onClick ? "whileTap" : undefined}
            onClick={onClick}
            className={cn(
                "ag-card relative overflow-hidden rounded-xl bg-cardBg shadow-soft backdrop-blur-xs border border-white/10",
                "dark:bg-[#151518] dark:border-white/5 dark:shadow-deep",
                className
            )}
        >
            {gradientHeader && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primaryStart to-primaryEnd" />
            )}
            <div className="p-5">
                {children}
            </div>
        </motion.div>
    );
}
