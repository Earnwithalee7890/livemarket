/** @type {import('next').NextConfig} */
const nextConfig = {
    // Turbopack configuration (empty to silence warning)
    turbopack: {},

    experimental: {
        // Mark packages as external to prevent bundling issues
        serverComponentsExternalPackages: [
            'pino',
            'thread-stream',
            '@walletconnect/ethereum-provider',
            '@walletconnect/universal-provider',
        ],
    },
};

module.exports = nextConfig;
