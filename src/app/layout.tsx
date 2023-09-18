import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NavigationEvents } from '@/components/map/bottomsheet/BottomSheetRouterEvent';
import { Suspense } from 'react';

import {
  RecoilProvider,
  SWRConfigContext,
  SSEProvider,
  ProgressBarProviders,
  BottomSheetManager,
} from '@/context';
import ToastManager from '@/context/ToastManager';

export const metadata: Metadata = {
  title: '서울에서 살아남기',
  description: '서울에서 살아남자 다모여~',
  keywords: '서울, 살아남자, 살아남기, 커뮤니티',
  viewport: { width: 'device-width', initialScale: 1.0 },
  appleWebApp: { statusBarStyle: 'black-translucent', capable: true },
  themeColor: { color: '#2DDAB0' },
};
const myFont = localFont({
  src: './fonts/Pretendard-Medium.woff2',
  display: 'swap',
});
export const runtime = 'nodejs';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={myFont.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=yes"
        />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>

      <body className="flex flex-col min-h-screen items-center">
        <RecoilProvider>
          <SWRConfigContext>
            <SSEProvider>
              <ProgressBarProviders>
                <main className="w-full max-w-md bg-[#fdfdfd]">{children}</main>
                <BottomSheetManager />
                <ToastManager />
                <Suspense fallback={null}>
                  <NavigationEvents />
                </Suspense>
              </ProgressBarProviders>
            </SSEProvider>
          </SWRConfigContext>
        </RecoilProvider>
        <div id="portalSignin" />
      </body>
    </html>
  );
}
