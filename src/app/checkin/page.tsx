'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Flame, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { DateCell } from '@/components/ui/DateCell';
import { Modal } from '@/components/ui/Modal';
import { GradientButton } from '@/components/ui/GradientButton';
import { fadeUp, staggerContainer } from '@/lib/motionPresets';
import { getCheckIns, performCheckIn, hasCheckedInToday, CheckInRecord } from '@/lib/checkin';
import { useWallet } from '@/hooks/useWallet';

export default function CheckInPage() {
  const { address, isConnected } = useWallet();
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const today = new Date().getDate();

  useEffect(() => {
    if (address) {
      getCheckIns(address).then(data => setCheckIns(data));
    }
  }, [address]);

  const handleCheckIn = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsChecking(true);
    try {
      await performCheckIn(address);
      const updated = await getCheckIns(address);
      setCheckIns(updated);
      setShowModal(false);
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const isCheckedIn = hasCheckedInToday(checkIns);
  const streak = checkIns.length;

  // Convert checkIns to day numbers for calendar display
  const checkedDays = checkIns.map(record => new Date(record.date).getDate());

  return (
    <div className="responsive-container">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={fadeUp} className="pt-4">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Daily Check-In</h2>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">Build Your Streak</h1>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="ag-card bg-orange-50/50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={20} className="text-orange-500" />
              <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Current Streak</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{streak} days</p>
          </Card>
          <Card className="ag-card bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} className="text-purple-500" />
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Total Points</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{streak * 10}</p>
          </Card>
        </div>

        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Calendar</h3>
          <Card className="ag-card">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <DateCell
                  key={day}
                  date={day}
                  isToday={day === today}
                  isChecked={checkedDays.includes(day)}
                  onClick={() => day === today && !isCheckedIn && setShowModal(true)}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {!isCheckedIn && (
          <motion.div variants={fadeUp}>
            <GradientButton onClick={() => setShowModal(true)} className="ag-button" icon={<CalendarIcon size={18} />}>
              Check In Today
            </GradientButton>
          </motion.div>
        )}
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Daily Check-In">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primaryStart to-primaryEnd flex items-center justify-center">
            <CalendarIcon size={32} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Check in on Base</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Confirm your daily check-in and earn 10 points</p>
          <GradientButton onClick={handleCheckIn} isLoading={isChecking} className="ag-button">
            {isChecking ? 'Checking In...' : 'Confirm Check-In'}
          </GradientButton>
        </div>
      </Modal>
    </div>
  );
}
