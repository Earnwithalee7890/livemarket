'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { User, Wallet, Mail, Calendar, Award, TrendingUp, LogOut } from 'lucide-react';
import { DailyCheckIn } from '@/components/features/DailyCheckIn';
import { FeatureCard } from '@/components/FeatureCard';
import { FarcasterProfile } from '@/components/features/FarcasterProfile';

export function ProfileView() {
    const { address, isConnected, chain } = useAccount();
    const { open } = useAppKit();

    const stats = [
        { label: 'Check-ins', value: typeof window !== 'undefined' ? localStorage.getItem(`totalCheckIns-${address}`) || '0' : '0', icon: Calendar },
        { label: 'Habit Streak', value: typeof window !== 'undefined' ? localStorage.getItem('habitStreak') || '0' : '0', icon: Award },
        { label: 'Todos', value: '0', icon: TrendingUp },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-32">
            <header className="mb-12 text-center pt-8">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-600 tracking-widest uppercase animate-float">
                    Personal Dashboard
                </div>
                <h1 className="font-outfit text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                    Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500">Profile</span>
                </h1>
            </header>

            <div className="space-y-8">
                {/* Farcaster & Wallet Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Farcaster Profile */}
                    <FarcasterProfile />

                    {/* Wallet Card */}
                    <div className="bg-white border border-slate-200 rounded-[24px] p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="relative z-10 w-full">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                                <Wallet size={24} className="text-blue-500" />
                            </div>

                            {isConnected ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium uppercase tracking-wider">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm"></div>
                                        {chain?.name}
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <span className="font-mono text-slate-700 text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                                    </div>
                                    <button
                                        onClick={() => open()}
                                        className="text-xs text-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-1 mx-auto mt-2"
                                    >
                                        <LogOut size={12} /> Disconnect
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <h3 className="text-slate-900 font-bold">Connect Wallet</h3>
                                    <p className="text-slate-500 text-xs mb-4">Connect to Base network to check in.</p>
                                    <button
                                        onClick={() => open()}
                                        className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-sm"
                                    >
                                        Connect Wallet
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Daily Check-in Section */}
                <FeatureCard
                    title="Daily Check-in"
                    description="Earn rewards by checking in daily on Base."
                    icon={Calendar}
                    className="min-h-[300px]"
                >
                    <DailyCheckIn />
                </FeatureCard>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="
                  bg-white 
                  border border-slate-200 
                  rounded-[24px] p-4 md:p-6 
                  hover:shadow-md
                  hover:border-slate-300
                  transition-all duration-300
                  text-center
                  group
                "
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={20} className="text-purple-500 md:w-6 md:h-6" />
                                </div>
                                <div className="font-outfit text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
