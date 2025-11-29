'use client';

import { Flame, Activity, Trophy } from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { RoastMe } from '@/components/features/RoastMe';
import { HabitTracker } from '@/components/features/HabitTracker';
import { DailyChallenge } from '@/components/features/DailyChallenge';

export function HomeView() {
    return (
        <div className="fade-in">
            <header className="mb-16 text-center pt-12">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-medium text-indigo-600 tracking-widest uppercase animate-float">
                    Super Easy Mini App
                </div>
                <h1 className="font-outfit text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                    Mini <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Features</span>
                </h1>
                <p className="font-inter text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    A collection of premium micro-tools designed for the future.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto pb-32">
                {/* Feature 2: Roast Me Lightly */}
                <FeatureCard
                    title="Roast Me Lightly"
                    description="Get a funny, light-hearted roast."
                    icon={Flame}
                >
                    <RoastMe />
                </FeatureCard>

                {/* Feature 6: Habit Tracker */}
                <FeatureCard
                    title="Mini Habit Tracker"
                    description="Track your daily streaks."
                    icon={Activity}
                >
                    <HabitTracker />
                </FeatureCard>

                {/* Feature 10: Daily Challenge */}
                <FeatureCard
                    title="Daily Challenge"
                    description="Complete a new task every day."
                    icon={Trophy}
                >
                    <DailyChallenge />
                </FeatureCard>
            </div>
        </div>
    );
}
