'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { TokenRow } from '@/components/ui/TokenRow';
import { GradientButton } from '@/components/ui/GradientButton';
import { fadeUp, staggerContainer } from '@/lib/motionPresets';
import { useWallet } from '@/hooks/useWallet';
import { getWalletAssets } from '@/lib/wallet';

export default function WalletPage() {
    const { address, isConnected, openModal } = useWallet();
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isConnected && address) {
            setLoading(true);
            getWalletAssets(address).then(data => {
                setAssets(data);
                setLoading(false);
            });
        }
    }, [isConnected, address]);

    if (!isConnected) {
        return (
            <div className="responsive-container flex items-center justify-center min-h-[60vh]">
                <Card className="ag-card text-center max-w-sm">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primaryStart to-primaryEnd flex items-center justify-center">
                        <WalletIcon size={32} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Connect your wallet to view your assets and balances</p>
                    <GradientButton onClick={openModal} className="ag-button">Connect Wallet</GradientButton>
                </Card>
            </div>
        );
    }

    return (
        <div className="responsive-container">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <motion.div variants={fadeUp} className="pt-4">
                    <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">My Wallet</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</h1>
                        <a href={`https://basescan.org/address/${address}`} target="_blank" rel="noopener noreferrer" className="text-primaryEnd">
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </motion.div>

                <Card className="ag-card bg-gradient-to-br from-primaryStart to-primaryEnd text-white">
                    <p className="text-sm text-white/80 mb-1">Total Balance</p>
                    <h2 className="text-3xl font-bold">$8,432.50</h2>
                    <p className="text-xs text-white/60 mt-2">Across 5 tokens</p>
                </Card>

                <motion.div variants={fadeUp}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Assets</h3>
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-20 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : assets.length === 0 ? (
                        <Card className="ag-card text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No assets found</p>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {assets.map((asset) => (
                                <TokenRow key={asset.symbol} {...asset} />
                            ))}
                        </div>
                    )}
                </motion.div>

                <motion.div variants={fadeUp}>
                    <GradientButton className="ag-button" icon={<ExternalLink size={18} />}>
                        View on BaseScan
                    </GradientButton>
                </motion.div>
            </motion.div>
        </div>
    );
}
