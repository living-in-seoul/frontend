import { cookies } from 'next/dist/client/components/headers';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const accessToken = req.cookies.get('accessToken');
  if (!accessToken) {
    //   if (req.nextUrl.pathname.startsWith('/api')) {
    //     return new NextResponse('Authentication Error', { status: 401 });
    //   }
    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`,
    );
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ['/home', '/map'],
};
