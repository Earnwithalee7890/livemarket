'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { Wallet, CheckCircle2, Calendar, Sparkles, Zap, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export function DailyCheckIn() {
    const { address, isConnected, chain } = useAccount();
    const { open } = useAppKit();
    const { sendTransaction, isPending, isSuccess, data: hash } = useSendTransaction();
    const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
    const [checkedInToday, setCheckedInToday] = useState(false);
    const [totalCheckIns, setTotalCheckIns] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (address) {
            const saved = localStorage.getItem(`checkIn-${address}`);
            const total = localStorage.getItem(`totalCheckIns-${address}`);
            if (saved) setLastCheckIn(saved);
            if (total) setTotalCheckIns(parseInt(total));

            const today = new Date().toDateString();
            if (saved === today) {
                setCheckedInToday(true);
            }
        }
    }, [address]);

    // Transaction success effect
    useEffect(() => {
        if (isSuccess && hash && !checkedInToday) {
            setShowSuccess(true);
            triggerCelebration();

            const today = new Date().toDateString();
            setLastCheckIn(today);
            setCheckedInToday(true);
            const newTotal = totalCheckIns + 1;
            setTotalCheckIns(newTotal);

            localStorage.setItem(`checkIn-${address}`, today);
            localStorage.setItem(`totalCheckIns-${address}`, newTotal.toString());

            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    }, [isSuccess, hash, checkedInToday, totalCheckIns, address]);

    const triggerCelebration = () => {
        // Multiple confetti bursts
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 9999
        };

        function fire(particleRatio: number, opts: any) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const handleCheckIn = async () => {
        if (!address || checkedInToday) return;

        try {
            // Send 0 ETH self-transfer on Base
            sendTransaction({
                to: address,
                value: 0n,
                chainId: 8453 // Base Mainnet
            });
        } catch (error) {
            console.error('Check-in failed:', error);
        }
    };

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="text-center text-gray-300 mb-2">
                    <div className="relative inline-block">
                        <Wallet size={40} className="mx-auto mb-3 opacity-80 animate-pulse" />
                        <Zap size={16} className="absolute -top-1 -right-1 text-yellow-400 animate-bounce" />
                    </div>
                    <p className="text-sm font-medium">Connect to start checking in</p>
                </div>
                <button
                    onClick={() => open()}
                    className="
            relative overflow-hidden
            bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 
            hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 
            text-white font-bold py-3 px-8 rounded-2xl 
            transition-all transform hover:scale-105 
            hover:shadow-2xl hover:shadow-purple-500/50
            click-scale
            border-2 border-white/20
          "
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <span className="relative z-10 flex items-center gap-2">
                        <Wallet size={20} />
                        Connect Wallet
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-5 relative">
            {/* Success Animation Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/50 rounded-3xl p-12 text-center animate-in zoom-in duration-500 shadow-2xl shadow-green-500/50">
                        <PartyPopper size={64} className="mx-auto mb-4 text-green-400 animate-bounce" />
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                            Success!
                        </h2>
                        <p className="text-green-200 text-lg font-medium">
                            Check-in completed! 🎉
                        </p>
                    </div>
                </div>
            )}

            <div className="text-center space-y-3 w-full">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    <span className="font-medium">{chain?.name || 'Connected'}</span>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-5 w-full border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Check-ins</span>
                        <Calendar size={16} className="text-gray-400" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                            {totalCheckIns}
                        </div>
                        {totalCheckIns > 0 && (
                            <Sparkles size={20} className="text-yellow-400 animate-pulse" />
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={handleCheckIn}
                disabled={checkedInToday || isPending}
                className={`
          relative overflow-hidden w-full
          flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold 
          transition-all duration-300 transform
          click-scale
          border-2
          ${checkedInToday
                        ? 'bg-gradient-to-r from-green-500/30 to-emerald-600/30 text-green-300 cursor-default border-green-500/50'
                        : isPending
                            ? 'bg-gradient-to-r from-purple-500/50 to-blue-500/50 text-white/70 cursor-wait border-purple-500/30'
                            : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 border-purple-400/30'
                    }
        `}
            >
                {!checkedInToday && !isPending && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                )}

                <div className="relative z-10 flex items-center gap-3">
                    {checkedInToday ? (
                        <>
                            <CheckCircle2 size={24} className="animate-bounce" />
                            <span className="text-lg">Checked In!</span>
                        </>
                    ) : isPending ? (
                        <>
                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-lg">Signing...</span>
                        </>
                    ) : (
                        <>
                            <Wallet size={24} />
                            <span className="text-lg">Check In Today</span>
                            <Zap size={18} className="text-yellow-300 animate-pulse" />
                        </>
                    )}
                </div>
            </button>

            {lastCheckIn && (
                <div className="text-xs text-gray-400 mt-2 font-medium">
                    Last: <span className="text-purple-400">{lastCheckIn}</span>
                </div>
            )}
        </div>
    );
}
