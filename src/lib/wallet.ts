import { formatEther } from 'viem';

// Mock token data for development
const MOCK_TOKENS = [
    { symbol: 'ETH', name: 'Ethereum', balance: '1.45', price: 3200, icon: 'Ξ' },
    { symbol: 'USDC', name: 'USD Coin', balance: '2450.00', price: 1, icon: '$' },
    { symbol: 'DEGEN', name: 'Degen', balance: '50000', price: 0.025, icon: '🎩' },
    { symbol: 'TN100x', name: 'The Next 100x', balance: '1000000', price: 0.0004, icon: '🚀' },
];

export async function getWalletAssets(address: string) {
    // In a real app, use Alchemy or Covalent API here
    // const response = await fetch(`https://api.alchemy.com/v2/${KEY}/...`);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return MOCK_TOKENS.map(token => ({
        ...token,
        value: (parseFloat(token.balance) * token.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }));
}
