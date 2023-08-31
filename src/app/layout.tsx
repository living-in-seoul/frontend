import SWRConfigContext from '@/context/SWRConfigContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RecoilProvider from '@/context/RecoilProvider';
import BottomSheet from '@/components/BottomSheet';
import ProgressBarProviders from '@/context/ProgressbarProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '서울에서 살아남기',
  description: '서울에서 살아남자 다모여~',
  keywords: '서울, 살아남자, 살아남기, 커뮤니티',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className="flex flex-col min-h-screen items-center">
        <RecoilProvider>
          <SWRConfigContext>
            <ProgressBarProviders>
              <div className="w-full max-w-md">{children}</div>
            </ProgressBarProviders>
          </SWRConfigContext>
        </RecoilProvider>
        <div id="portalSignin" />
      </body>
    </html>
  );
}
