import { writeBoard } from '@/service/board';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

/**글쓰기 페이지 post api */

export const config = {
  api: {
    bodyParser: false,
  },
};

// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const POST = async (request: NextRequest) => {
  const form = await request.formData();
  const text = form.get('post')?.toString();
  const file = form.get('photos') as Blob;

  const formData = new FormData();

  if (!text || !file) {
    return NextResponse.json('byebye');
  }
  formData.append('post', text);
  formData.append('photos', file);

  await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // which is multipart/form-data with boundary included
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjd0BnbWFpbC5jb20iLCJleHAiOjE2OTIyNzA5NjYsImlhdCI6MTY5MjI2NzM2Nn0.YIvcnhW1pRY20agbdR7onHiEaZx59juB6i7KVHpqIM8',
    },
  });

  // return writeBoard(request)
  //   .then((data) => {
  //     console.log(data);
  //     return new NextResponse('Success');
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     return new NextResponse('Error', { status: 500 });
  //   });
  return NextResponse.json('hihi');
};
