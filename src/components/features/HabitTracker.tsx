'use client';

import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function HabitTracker() {
    const [streak, setStreak] = useState(0);
    const [completedToday, setCompletedToday] = useState(false);

    useEffect(() => {
        const savedStreak = localStorage.getItem('habitStreak');
        const lastCompleted = localStorage.getItem('habitLastCompleted');
        const today = new Date().toDateString();

        if (savedStreak) setStreak(parseInt(savedStreak));
        if (lastCompleted === today) setCompletedToday(true);
    }, []);

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: NodeJS.Timeout = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    const handleCheckIn = () => {
        if (completedToday) return;

        const newStreak = streak + 1;
        setStreak(newStreak);
        setCompletedToday(true);

        localStorage.setItem('habitStreak', newStreak.toString());
        localStorage.setItem('habitLastCompleted', new Date().toDateString());

        // Trigger confetti celebration
        triggerConfetti();
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-6 relative">
            {/* Animated streak display */}
            <div className="text-center relative">
                {streak > 0 && !completedToday && (
                    <Sparkles className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 animate-bounce" size={24} />
                )}
                <div className="relative">
                    <div className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 mb-2 transition-all duration-500 ${completedToday ? 'scale-110' : 'scale-100'}`}>
                        {streak}
                    </div>
                    {completedToday && (
                        <div className="absolute inset-0 animate-ping bg-gradient-to-br from-green-400/30 to-emerald-600/30 rounded-full blur-xl"></div>
                    )}
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">Day Streak 🔥</div>
            </div>

            <button
                onClick={handleCheckIn}
                disabled={completedToday}
                className={`
          relative overflow-hidden
          flex items-center gap-2 px-8 py-4 rounded-2xl font-bold 
          transition-all duration-300 transform
          click-scale
          ${completedToday
                        ? 'bg-gradient-to-r from-green-500/30 to-emerald-600/30 text-green-300 cursor-default border-2 border-green-500/50'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 border-2 border-green-400/20'
                    }
        `}
            >
                {/* Button ripple effect */}
                {!completedToday && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                )}

                <div className="relative z-10 flex items-center gap-2">
                    {completedToday ? (
                        <>
                            <CheckCircle2 size={24} className="animate-bounce" />
                            <span className="text-lg">Done for Today!</span>
                        </>
                    ) : (
                        <>
                            <Activity size={24} />
                            <span className="text-lg">I Did It Today!</span>
                        </>
                    )}
                </div>
            </button>

            {completedToday && (
                <div className="text-sm text-green-400 animate-pulse font-medium">
                    ✨ Keep the streak going tomorrow!
                </div>
            )}
        </div>
    );
}
