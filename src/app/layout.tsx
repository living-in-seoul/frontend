import SWRConfigContext from '@/context/SWRConfigContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RecoilProvider from '@/context/RecoilProvider';
import ProgressBarProviders from '@/context/ProgressbarProvider';
import SSEProvider from '@/context/SSEProvider';
import { getProfile } from '@/service/user';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '서울에서 살아남기',
  description: '서울에서 살아남자 다모여~',
  keywords: '서울, 살아남자, 살아남기, 커뮤니티',
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
  const token = cookies().get('accessToken');
  const user = await getProfile();
  console.log('asdfasdfsfsafsadfsadfasfd', token);

  return (
    <html lang="en" className={myFont.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className="flex flex-col min-h-screen items-center">
        {/* <SSEProvider eventTypes={['LIKE']} url={'/example'}> */}
        <RecoilProvider>
          <SWRConfigContext>
            <ProgressBarProviders>
              <div className="w-full max-w-md">{children}</div>
            </ProgressBarProviders>
          </SWRConfigContext>
        </RecoilProvider>
        {/* </SSEProvider> */}
        <div id="portalSignin" />
      </body>
    </html>
  );
}
