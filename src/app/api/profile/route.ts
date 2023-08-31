import { getProfile, putProfile, putProfileImage } from '@/service/user';
import { formDataToObject } from '@/utils/utilFunc';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const data = await getProfile();
  const response = data?.nickname;
  return NextResponse.json(response);
};
export const PUT = async (request: NextRequest) => {
  try {
    const body = await request.formData();
    const user = body.get('user');
    console.log(user);
    const reader = new FileReader();
    const image = body.get('photo');
    const userData = await putProfile(body);
    const imageData = await putProfileImage(image);
    console.log('zzzzzzzzzz', imageData);
    return NextResponse.json(imageData);
  } catch (err) {
    return new Response('전송 실패입니다', {
      status: 403,
    });
  }
};
