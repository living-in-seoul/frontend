import { getRefreshToken } from '@/service/token';
import { getProfile, putProfileImage, putSignup } from '@/service/user';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest): Promise<Response | NextResponse> => {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;
  if (accessToken) {
    const data = await getProfile();
    return NextResponse.json(data);
  } else {
    if (refreshToken) {
      try {
        const res = await getRefreshToken();
        const newAT = res.accessToken;
        cookies().set({
          name: 'accessToken',
          value: newAT,
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 2,
        });
        const data = await getProfile();
        return NextResponse.json(data);
      } catch (error) {
        return new Response('rt 만료, 다시 로그인해주세요', {
          status: 403,
        });
      }
    } else {
      return new Response('rt 만료, 다시 로그인해주세요 ', {
        status: 403,
      });
    }
  }
};

interface Context {
  params: { slug: string };
}

export const PUT = async (
  request: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const slug = context.params.slug;
  try {
    if (slug[0] === 'image') {
      const body = await request.formData();
      const imageData = await putProfileImage(body);
      return NextResponse.json(imageData);
    } else if (slug[0] === 'profile') {
      const body = await request.json();
      const userData = await putSignup(body);
      return NextResponse.json(userData);
    }
    return NextResponse.json('empty');
  } catch (err) {
    return new Response('전송 실패입니다', {
      status: 403,
    });
  }
};
