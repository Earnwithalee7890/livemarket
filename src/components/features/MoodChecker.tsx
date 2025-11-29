'use client';

import React, { useState } from 'react';

const MOODS = [
    { emoji: '😊', label: 'Happy', message: "Keep shining! Your positivity is contagious." },
    { emoji: '😐', label: 'Okay', message: "It's okay to just be okay. Take it easy." },
    { emoji: '😔', label: 'Sad', message: "This too shall pass. Be kind to yourself." },
    { emoji: '😤', label: 'Angry', message: "Deep breaths. Don't let it consume you." },
    { emoji: '😴', label: 'Tired', message: "Rest is productive. Go recharge!" },
    { emoji: '🤩', label: 'Excited', message: "Ride that wave! Make amazing things happen." },
];

export function MoodChecker() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const currentMood = MOODS.find(m => m.label === selectedMood);

    return (
        <div className="flex flex-col h-full">
            {!selectedMood ? (
                <div className="grid grid-cols-3 gap-2 h-full">
                    {MOODS.map((mood) => (
                        <button
                            key={mood.label}
                            onClick={() => setSelectedMood(mood.label)}
                            className="flex flex-col items-center justify-center p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:scale-105"
                        >
                            <span className="text-2xl mb-1">{mood.emoji}</span>
                            <span className="text-xs text-gray-400">{mood.label}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-300">
                    <div className="text-6xl mb-4">{currentMood?.emoji}</div>
                    <h4 className="text-xl font-bold text-white mb-2">{currentMood?.label}</h4>
                    <p className="text-gray-300 text-sm mb-6">{currentMood?.message}</p>
                    <button
                        onClick={() => setSelectedMood(null)}
                        className="text-sm text-blue-400 hover:text-blue-300 underline"
                    >
                        Check another mood
                    </button>
                </div>
            )}
        </div>
    );
}
