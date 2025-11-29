'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Sparkline } from '@/components/ui/Sparkline';
import { GradientButton } from '@/components/ui/GradientButton';
import { MarketItem } from '@/components/ui/MarketItem';
import { fadeUp, staggerContainer } from '@/lib/motionPresets';
import { getMarketData } from '@/lib/market';

export default function DashboardPage() {
    const [marketData, setMarketData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const sparklineData = [65, 59, 80, 81, 56, 55, 40, 60, 75, 85, 90, 85, 95];

    useEffect(() => {
        getMarketData().then(data => {
            setMarketData(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="responsive-container">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <motion.div variants={fadeUp} className="pt-4">
                    <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Total Balance</h2>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-1">$12,450.32</h1>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="ag-card bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400">
                                <TrendingUp size={16} />
                            </div>
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">Income</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">+$5,940.42</p>
                    </Card>
                    <Card className="ag-card bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-500/20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
                                <TrendingDown size={16} />
                            </div>
                            <span className="text-xs font-medium text-red-600 dark:text-red-400">Expense</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">-$2,468.00</p>
                    </Card>
                </div>

                <Card gradientHeader className="ag-card pt-8">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio Growth</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">+12.5%</h3>
                        </div>
                        <div className="flex gap-2">
                            {['1D', '1W', '1M'].map((period) => (
                                <button key={period} className={`text-xs px-2 py-1 rounded-lg ${period === '1M' ? 'bg-primaryStart/10 text-primaryEnd' : 'text-gray-400'}`}>
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Sparkline data={sparklineData} height={100} />
                </Card>

                <motion.div variants={fadeUp}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Live Market</h3>
                        <button className="text-xs text-primaryEnd font-medium">View All</button>
                    </div>
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-20 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {marketData.map((coin) => (
                                <MarketItem key={coin.symbol} {...coin} />
                            ))}
                        </div>
                    )}
                </motion.div>

                <motion.div variants={fadeUp}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Convert</h3>
                    <Card className="ag-card space-y-4">
                        <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">₿</div>
                                <span className="font-semibold dark:text-white">BTC</span>
                            </div>
                            <input type="number" defaultValue="0.045" className="bg-transparent text-right font-mono font-bold outline-none w-24 dark:text-white" />
                        </div>
                        <div className="flex justify-center -my-2 relative z-10">
                            <button className="p-2 rounded-full bg-white dark:bg-[#1E1E24] shadow-md border border-gray-100 dark:border-white/10">
                                <ArrowRightLeft size={16} className="text-primaryEnd rotate-90" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">Ξ</div>
                                <span className="font-semibold dark:text-white">ETH</span>
                            </div>
                            <input type="number" defaultValue="0.85" className="bg-transparent text-right font-mono font-bold outline-none w-24 dark:text-white" />
                        </div>
                        <GradientButton className="ag-button">Convert Now</GradientButton>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
