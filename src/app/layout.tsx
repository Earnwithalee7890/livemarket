import { headers } from 'next/headers';
import ContextProvider from '@/context';
import { ThemeProvider } from '@/context/ThemeContext';
import { BottomNav } from '@/components/ui/BottomNav';
import './globals.css';

export const metadata = {
  title: 'Live Market Mini App',
  description: 'Farcaster Mini App',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased pb-20">
        <ContextProvider cookies={cookies}>
          <ThemeProvider>
            <main className="min-h-screen max-w-md mx-auto relative overflow-hidden">
              {children}
              <BottomNav />
            </main>
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
