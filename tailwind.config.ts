import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"SF Pro Display"', 'Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                primaryStart: '#00C6FB',
                primaryEnd: '#3A47D5',
                darkBg: '#0B0B0E',
                cardBg: '#FCFCFC',
                accent: '#1E9CFF',
                pinkA: '#FF9A9E',
                // Additional utility colors
                'glass-white': 'rgba(255, 255, 255, 0.7)',
                'glass-border': 'rgba(255, 255, 255, 0.2)',
            },
            boxShadow: {
                soft: '0 8px 20px rgba(0,0,0,0.07)',
                deep: '0 12px 30px rgba(0,0,0,0.12)',
                neumorph: 'inset 2px 2px 5px rgba(255,255,255,0.6), inset -2px -2px 5px rgba(0,0,0,0.08)',
            },
            borderRadius: {
                lg: '20px',
                xl: '24px',
            },
            blur: {
                xs: '10px',
            },
            animation: {
                'fade-up': 'fadeUp 0.35s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
