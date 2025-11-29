/** @type {import('next').NextConfig} */
const nextConfig = {
    // Mark packages as external to prevent bundling issues
    serverComponentsExternalPackages: [
        'pino',
        'thread-stream',
        '@walletconnect/ethereum-provider'
    ],

    webpack: (config, { isServer }) => {
        // Exclude test files from being processed
        config.module.rules.push({
            test: /\/(test|tests|__tests__|bench)\//,
            loader: 'ignore-loader'
        });

        // Ignore specific problematic files
        config.resolve.alias = {
            ...config.resolve.alias,
            'thread-stream/test': false,
            'pino/test': false,
        };

        return config;
    },
};

module.exports = nextConfig;
