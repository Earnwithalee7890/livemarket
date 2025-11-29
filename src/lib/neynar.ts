// Mock data for development if API keys are missing
const MOCK_PROFILE = {
    fid: 12345,
    username: 'farcaster_fan',
    display_name: 'Farcaster Fan',
    pfp_url: 'https://i.imgur.com/WbQnbas.png',
    follower_count: 1250,
    following_count: 420,
    verifications: ['0x123...abc'],
    active_status: 'active',
    power_badge: true,
    neynar_score: 98.5,
};

export async function getFarcasterProfile(fidOrUsername: string | number) {
    const apiKey = process.env.NEXT_PUBLIC_NEYNAR_KEY;

    if (!apiKey) {
        console.warn('Neynar API key missing, using mock data');
        return MOCK_PROFILE;
    }

    try {
        // Determine endpoint based on input type
        const isUsername = typeof fidOrUsername === 'string';
        const endpoint = isUsername
            ? `https://api.neynar.com/v2/farcaster/user/by_username?username=${fidOrUsername}`
            : `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fidOrUsername}`;

        const response = await fetch(endpoint, {
            headers: {
                'accept': 'application/json',
                'api_key': apiKey,
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        return isUsername ? data.user : data.users[0];

    } catch (error) {
        console.error('Error fetching Farcaster profile:', error);
        return MOCK_PROFILE;
    }
}
