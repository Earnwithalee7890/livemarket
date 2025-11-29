import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { useBalance } from 'wagmi';
import { formatEther } from 'viem';

export function useWallet() {
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');

    // Fetch ETH balance on Base
    const { data: balanceData, refetch } = useBalance({
        address: address as `0x${string}`,
        chainId: 8453, // Base Mainnet
    });

    const formattedBalance = balanceData
        ? parseFloat(formatEther(balanceData.value)).toFixed(4)
        : '0.0000';

    return {
        address,
        isConnected,
        connect: () => open(),
        disconnect: () => open(),
        balance: formattedBalance,
        symbol: balanceData?.symbol || 'ETH',
        refetchBalance: refetch,
        provider: walletProvider,
    };
}
