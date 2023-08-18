import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (request: NextRequest) => {
  const form = await request.formData();

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/posts`, {
    body: form,
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cmdmNDU2QG5hdmVyLmNvbSIsImV4cCI6MTY5MjI4Njg5MywiaWF0IjoxNjkyMjgzMjkzfQ.FLVqW3oHGLH-q9q9UkzV-vQiAgI3o71OjfrpJqmefjM',
    },
  })
    .then((res) => console.log(res.headers))
    .catch((err) => {
      console.log(err);
      throw err;
    });

  const res = NextResponse.json('hi');
  return res;
};
