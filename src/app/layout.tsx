import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Rebind Hourglass - Timer App',
  description:
    'A beautiful countdown timer app with dark/light themes, sound alerts, and modern UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${orbitron.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
