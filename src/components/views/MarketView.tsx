'use client';

import React from 'react';
import { FeatureCard } from '@/components/FeatureCard';
import { CryptoPrice } from '@/components/features/CryptoPrice';
import { Bitcoin } from 'lucide-react';

export function MarketView() {
    return (
        <div className="max-w-7xl mx-auto pb-32">
            <header className="mb-12 text-center pt-8">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-xs font-medium text-green-600 tracking-widest uppercase animate-float">
                    Live Market Data
                </div>
                <h1 className="font-outfit text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                    Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">Market</span>
                </h1>
                <p className="font-inter text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    Real-time prices for top cryptocurrencies.
                </p>
            </header>

            <div className="max-w-5xl mx-auto">
                {/* Crypto Prices */}
                <FeatureCard
                    title="Live Crypto Prices"
                    description="Real-time BTC, ETH, SOL prices"
                    icon={Bitcoin}
                    className="min-h-[500px]"
                >
                    <CryptoPrice />
                </FeatureCard>
            </div>
        </div>
    );
}
