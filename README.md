# Farcaster Mini App - Trust Score

A modern Farcaster Mini App built with Next.js 15, Reown AppKit, and TailwindCSS.

## Features

- 🏠 **Dashboard**: View balance, portfolio growth, and quick convert
- 💼 **Wallet**: Connect wallet and view on-chain assets
- ✅ **Daily Check-In**: Build streaks with Base network check-ins
- 👤 **Profile**: View Farcaster profile with Neynar integration

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Charts**: Chart.js / react-chartjs-2
- **Web3**: Reown AppKit, Wagmi, Viem
- **API**: Neynar (Farcaster data)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
NEXT_PUBLIC_NEYNAR_KEY=your_neynar_api_key
```

Get your Reown Project ID from: https://cloud.reown.com/
Get your Neynar API Key from: https://neynar.com/

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── dashboard/      # Dashboard page
│   ├── wallet/         # Wallet page
│   ├── checkin/        # Check-in page
│   ├── profile/        # Profile page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Redirect to dashboard
├── components/
│   └── ui/             # Reusable UI components
├── context/            # React contexts (AppKit, Theme)
├── hooks/              # Custom hooks
├── lib/                # Utilities and API clients
└── config/             # AppKit configuration
```

## Design System

The app uses a modern Neumorphic + Neo-iOS design:

- **Colors**: Gradient blues (#00C6FB → #3A47D5)
- **Cards**: Soft shadows, 20-24px radius, glass effect
- **Fonts**: SF Pro Display / Inter
- **Animations**: Smooth transitions with Framer Motion

## Development Notes

### Mock Data

The app uses mock data by default for:
- Wallet balances (see `src/lib/wallet.ts`)
- Farcaster profiles (see `src/lib/neynar.ts`)
- Check-in storage (localStorage, see `src/lib/checkin.ts`)

### Production Setup

For production:
1. Replace mock wallet data with real API calls (Alchemy, BaseScan)
2. Implement real Neynar API integration
3. Replace localStorage with Supabase or Vercel KV for check-ins
4. Deploy manifest at `/.well-known/farcaster.json`

## Deployment

Deploy to Vercel:

```bash
vercel
```

Make sure to set environment variables in your Vercel project settings.

## License

MIT
