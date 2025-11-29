'use client';

import React, { useState, useEffect } from 'react';
import { Timer, Play, RotateCcw } from 'lucide-react';

export function CountdownTimer() {
    const [targetDate, setTargetDate] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    useEffect(() => {
        if (!targetDate) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const difference = target - now;

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex flex-col h-full space-y-4">
            {!timeLeft ? (
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400">Set Event Date & Time</label>
                    <input
                        type="datetime-local"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full"
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="grid grid-cols-4 gap-2 w-full text-center">
                        <div className="bg-white/5 p-2 rounded-lg">
                            <div className="text-xl font-bold text-blue-400">{timeLeft.days}</div>
                            <div className="text-[10px] text-gray-500 uppercase">Days</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded-lg">
                            <div className="text-xl font-bold text-blue-400">{timeLeft.hours}</div>
                            <div className="text-[10px] text-gray-500 uppercase">Hrs</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded-lg">
                            <div className="text-xl font-bold text-blue-400">{timeLeft.minutes}</div>
                            <div className="text-[10px] text-gray-500 uppercase">Mins</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded-lg">
                            <div className="text-xl font-bold text-blue-400">{timeLeft.seconds}</div>
                            <div className="text-[10px] text-gray-500 uppercase">Secs</div>
                        </div>
                    </div>

                    <button
                        onClick={() => { setTargetDate(''); setTimeLeft(null); }}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
                    >
                        <RotateCcw size={12} />
                        Reset Timer
                    </button>
                </div>
            )}

            {!timeLeft && targetDate && (
                <div className="text-center text-xs text-gray-500 mt-2">
                    Timer will start automatically
                </div>
            )}
        </div>
    );
}
