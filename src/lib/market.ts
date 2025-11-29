// Mock market data API
export async function getMarketData() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        { symbol: 'BTC', name: 'Bitcoin', price: '$43,250.00', change: 2.45, icon: '₿' },
        { symbol: 'ETH', name: 'Ethereum', price: '$2,280.50', change: 1.82, icon: 'Ξ' },
        { symbol: 'SOL', name: 'Solana', price: '$98.75', change: -0.54, icon: '◎' },
        { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: 0.01, icon: '$' },
        { symbol: 'DEGEN', name: 'Degen', price: '$0.0085', change: 5.23, icon: '🎩' },
    ];
}
