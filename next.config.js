/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Exclude test files and dev dependencies from being bundled
        config.module = config.module || {};
        config.module.rules = config.module.rules || [];

        config.module.rules.push({
            test: /node_modules\/(thread-stream|pino)\/test\//,
            use: 'null-loader',
        });

        // Ignore problematic files
        config.resolve = config.resolve || {};
        config.resolve.alias = config.resolve.alias || {};

        return config;
    },
    // Exclude test files from being processed
    experimental: {
        turbo: {
            rules: {
                '*.test.{js,mjs,ts}': {
                    loaders: [],
                    as: '*.js',
                },
            },
        },
    },
};

module.exports = nextConfig;
