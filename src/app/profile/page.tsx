'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ExternalLink, Award, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { GradientButton } from '@/components/ui/GradientButton';
import { fadeUp, staggerContainer } from '@/lib/motionPresets';
import { getFarcasterProfile } from '@/lib/neynar';

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadProfile = async () => {
        setRefreshing(true);
        const data = await getFarcasterProfile();
        setProfile(data);
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="responsive-container flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primaryStart/30 border-t-primaryStart rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="responsive-container">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <motion.div variants={fadeUp} className="pt-4">
                    <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Farcaster Profile</h2>
                </motion.div>

                <Card className="ag-card text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primaryStart to-primaryEnd p-1">
                        <img src={profile?.pfp || '/default-avatar.png'} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{profile?.username || 'Anonymous'}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{profile?.username || 'user'}</p>
                </Card>

                <div className="grid grid-cols-3 gap-3">
                    <Card className="ag-card text-center bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-500/20">
                        <Award size={20} className="mx-auto mb-2 text-blue-500" />
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{profile?.neynarScore || 0}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
                    </Card>
                    <Card className="ag-card text-center bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-500/20">
                        <TrendingUp size={20} className="mx-auto mb-2 text-green-500" />
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{profile?.reputation || 0}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Reputation</p>
                    </Card>
                    <Card className="ag-card text-center bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-500/20">
                        <Users size={20} className="mx-auto mb-2 text-purple-500" />
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{profile?.followers || 0}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                    </Card>
                </div>

                <motion.div variants={fadeUp} className="space-y-3">
                    <GradientButton onClick={loadProfile} isLoading={refreshing} className="ag-button" icon={<RefreshCw size={18} />}>
                        Refresh Profile
                    </GradientButton>
                    <button className="w-full py-3 px-6 rounded-full border-2 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-semibold flex items-center justify-center gap-2">
                        <ExternalLink size={18} />
                        View on Warpcast
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}
