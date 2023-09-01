import { getProfile, putProfileImage, putSignup } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
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
      console.log(body.get('image'));
      const imageData = await putProfileImage(body);
      return NextResponse.json(imageData);
    } else if (slug[0] === 'profile') {
      const body = await request.json();
      console.log(body, 'zzzz');
      const userData = await putSignup(body);
      return NextResponse.json(userData);
    }
  } catch (err) {
    return new Response('전송 실패입니다', {
      status: 403,
    });
  }
};
