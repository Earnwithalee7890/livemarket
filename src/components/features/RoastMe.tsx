'use client';

import React, { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';

const ROASTS = [
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "I'd agree with you but then we'd both be wrong.",
    "You have something on your chin... no, the 3rd one down.",
    "I'm not saying you're dumb, but you have bad luck when thinking.",
    "You bring everyone so much joy... when you leave the room.",
    "Your secrets are safe with me. I never even listen to them.",
    "I would explain it to you, but I left my crayons at home.",
    "You're the reason they put instructions on shampoo bottles.",
    "Keep rolling your eyes, maybe you'll find a brain back there.",
    "You're proof that even god makes mistakes sometimes."
];

export function RoastMe() {
    const [roast, setRoast] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleRoast = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const randomRoast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
            setRoast(randomRoast);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            {roast ? (
                <div className={`
          bg-gradient-to-br from-red-500/20 via-orange-500/15 to-red-500/20 
          border-2 border-red-500/30 
          p-5 rounded-2xl text-center 
          w-full
          shadow-lg shadow-red-500/20
          backdrop-blur-sm
          transition-all duration-500
          ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        `}>
                    <div className="flex items-start justify-center gap-2 mb-2">
                        <Flame size={20} className="text-orange-400 animate-pulse flex-shrink-0 mt-0.5" />
                        <p className="text-red-200 font-medium text-base leading-relaxed flex-1">
                            "{roast}"
                        </p>
                        <Flame size={20} className="text-orange-400 animate-pulse flex-shrink-0 mt-0.5" />
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-300 py-6 space-y-2">
                    <Sparkles className="mx-auto text-orange-400 animate-pulse" size={32} />
                    <p className="font-medium">Feeling brave today?</p>
                </div>
            )}

            <button
                onClick={handleRoast}
                className="
          relative overflow-hidden
          flex items-center gap-2 
          bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 
          hover:from-orange-600 hover:via-red-700 hover:to-orange-600 
          text-white font-bold py-3 px-8 rounded-2xl 
          transition-all transform hover:scale-105 
          hover:shadow-2xl hover:shadow-orange-500/50
          click-scale
          border-2 border-orange-400/30
          bg-size-200 animate-gradient
        "
            >
                <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center gap-2">
                    <Flame size={20} />
                    <span>Roast Me!</span>
                </div>
            </button>
        </div>
    );
}
