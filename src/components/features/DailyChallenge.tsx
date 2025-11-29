'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

const CHALLENGES = [
    "Take a 30-minute walk outside",
    "Learn 5 new words in a foreign language",
    "Call a friend you haven't talked to in a while",
    "Write down 3 things you're grateful for",
    "Try a new recipe for dinner",
    "Spend 10 minutes meditating",
    "Read 20 pages of a book",
    "Do 20 push-ups",
    "Organize one drawer or shelf",
    "Compliment 3 people today",
    "Drink 8 glasses of water",
    "No social media for 2 hours",
    "Sketch or doodle for 15 minutes",
    "Listen to a podcast episode",
    "Practice a random act of kindness",
];

function getDailyChallengeIndex() {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return dayOfYear % CHALLENGES.length;
}

export function DailyChallenge() {
    const [challenge, setChallenge] = useState('');

    useEffect(() => {
        const index = getDailyChallengeIndex();
        setChallenge(CHALLENGES[index]);
    }, []);

    const getNewChallenge = () => {
        const currentIndex = CHALLENGES.indexOf(challenge);
        const newIndex = (currentIndex + 1) % CHALLENGES.length;
        setChallenge(CHALLENGES[newIndex]);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                <Trophy size={32} className="text-yellow-500" />
            </div>

            <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Today's Challenge</h4>
                <p className="text-lg font-semibold text-white leading-snug">
                    {challenge || 'Loading...'}
                </p>
            </div>

            <button
                onClick={getNewChallenge}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors mt-2"
            >
                <RefreshCw size={12} />
                Get Another
            </button>
        </div>
    );
}
