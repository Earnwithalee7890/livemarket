'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export function GradientButton({ children, className, isLoading, icon, ...props }: GradientButtonProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={cn(
                "ag-button relative flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full",
                "bg-gradient-to-r from-primaryStart to-primaryEnd text-white font-semibold shadow-lg shadow-blue-500/20",
                "disabled:opacity-70 disabled:cursor-not-allowed",
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    {icon && <span className="ag-icon text-white/90">{icon}</span>}
                    {children}
                </>
            )}
        </motion.button>
    );
}
