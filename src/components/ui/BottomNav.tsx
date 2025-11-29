'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home', href: '/dashboard' },
    { id: 'wallet', icon: Wallet, label: 'Wallet', href: '/wallet' },
    { id: 'checkin', icon: Calendar, label: 'Check-In', href: '/checkin' },
    { id: 'profile', icon: User, label: 'Profile', href: '/profile' },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe pt-2 bg-white/80 dark:bg-[#0B0B0E]/90 backdrop-blur-lg border-t border-gray-200/50 dark:border-white/5">
            <nav className="flex items-center justify-around max-w-md mx-auto px-2 pb-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
                    const Icon = item.icon;

                    return (
                        <Link key={item.id} href={item.href} className="ag-nav-button relative flex flex-col items-center justify-center w-16 h-14">
                            {isActive && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute -top-2 w-1 h-1 rounded-full bg-primaryStart"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon size={24} className={cn("ag-icon transition-colors duration-300", isActive ? "text-primaryEnd dark:text-primaryStart" : "text-gray-400 dark:text-gray-600")} />
                            <span className={cn("text-[10px] font-medium mt-1 transition-colors duration-300", isActive ? "text-primaryEnd dark:text-primaryStart" : "text-gray-400 dark:text-gray-600")}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
