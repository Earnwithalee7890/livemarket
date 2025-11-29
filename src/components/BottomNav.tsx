'use client';

import React from 'react';
import { Home, User, TrendingUp } from 'lucide-react';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'market', icon: TrendingUp, label: 'Market' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    return (
        <div className="fixed bottom-10 inset-x-0 mx-auto w-max z-[99999]">
            <nav className="
        flex items-center gap-2 p-2 md:p-3
        bg-white shadow-[0_0_0_2px_rgba(79,70,229,0.1)]
        border border-indigo-100
        rounded-full 
        shadow-2xl
        transition-all duration-300
        hover:scale-105
      ">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`
                relative flex items-center justify-center 
                w-14 h-14 md:w-auto md:h-12 md:px-6
                rounded-full
                transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                group
                ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                    : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                                }
              `}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                {/* Icon */}
                                <Icon
                                    size={24}
                                    className={`
                    transition-all duration-300
                    ${isActive ? 'text-white scale-110' : 'group-hover:scale-110'}
                  `}
                                />

                                {/* Desktop Label */}
                                <span className={`
                  hidden md:block font-medium text-sm tracking-wide
                  transition-all duration-300
                  ${isActive ? 'text-white font-semibold' : ''}
                `}>
                                    {item.label}
                                </span>
                            </div>

                            {/* Mobile Tooltip Label (Hidden on Desktop) */}
                            <div className={`
                md:hidden
                absolute -top-10 left-1/2 -translate-x-1/2
                px-3 py-1 rounded-lg
                bg-slate-900 text-white
                text-[10px] font-medium tracking-wider uppercase
                opacity-0 translate-y-2 scale-90
                transition-all duration-300
                pointer-events-none
                ${isActive ? 'opacity-0' : 'group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}
              `}>
                                {item.label}
                            </div>

                            {/* Active Dot (Mobile Only) */}
                            {isActive && (
                                <div className="md:hidden absolute bottom-2 w-1 h-1 bg-white rounded-full shadow-sm"></div>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
