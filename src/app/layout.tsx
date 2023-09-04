import SWRConfigContext from '@/context/SWRConfigContext';
import './globals.css';
import type { Metadata } from 'next';
import RecoilProvider from '@/context/RecoilProvider';
import ProgressBarProviders from '@/context/ProgressbarProvider';
import SSEProvider from '@/context/SSEProvider';
import localFont from 'next/font/local';
import { UserProvider } from '@/context/UserProvider';
import BottomSheetManager from '@/components/bottomsheet/BottomSheetManager';
import { NavigationEvents } from '@/components/map/bottomsheet/BottomSheetRouterEvent';
import { Suspense } from 'react';

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
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>

      <body className="flex flex-col min-h-screen items-center">
        <SSEProvider
          eventTypes={['LIKE', 'COMMENT', 'HASHTAG']}
          url={'/api/sse'}
        >
          <UserProvider>
            <RecoilProvider>
              <SWRConfigContext>
                <ProgressBarProviders>
                  <div className="w-full max-w-md bg-[#fdfdfd]">{children}</div>
                  <BottomSheetManager />
                  <Suspense fallback={null}>
                    <NavigationEvents />
                  </Suspense>
                </ProgressBarProviders>
              </SWRConfigContext>
            </RecoilProvider>
          </UserProvider>
        </SSEProvider>
        <div id="portalSignin" />
      </body>
    </html>
  );
}
