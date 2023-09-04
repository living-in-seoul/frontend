import { getProfile, putProfileImage, putSignup } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest) => {
  const data = await getProfile();
  const response = data?.nickname;
  return NextResponse.json(response);
};

interface Context {
  params: { slug: string };
}

export const PUT = async (request: NextRequest, context: Context) => {
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
  } catch (err) {
    return new Response('전송 실패입니다', {
      status: 403,
    });
  }
};
