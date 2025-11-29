// Simple local storage fallback for dev/demo
// In production, replace this with Supabase or Vercel KV calls

const STORAGE_KEY = 'trust_score_checkins';

export interface CheckInRecord {
    date: string; // ISO date string YYYY-MM-DD
    timestamp: number;
    txHash?: string;
}

export async function getCheckIns(address: string): Promise<CheckInRecord[]> {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(`${STORAGE_KEY}_${address}`);
    return data ? JSON.parse(data) : [];
}

export async function performCheckIn(address: string): Promise<CheckInRecord> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const today = new Date().toISOString().split('T')[0];
    const record: CheckInRecord = {
        date: today,
        timestamp: Date.now(),
        txHash: '0x' + Math.random().toString(16).slice(2), // Mock hash
    };

    if (typeof window !== 'undefined') {
        const current = await getCheckIns(address);
        // Check if already checked in today
        if (!current.find(c => c.date === today)) {
            const updated = [...current, record];
            localStorage.setItem(`${STORAGE_KEY}_${address}`, JSON.stringify(updated));
        }
    }

    return record;
}

export function hasCheckedInToday(checkIns: CheckInRecord[]): boolean {
    const today = new Date().toISOString().split('T')[0];
    return checkIns.some(c => c.date === today);
}
