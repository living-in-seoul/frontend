import { getHomeDatas } from '@/service/home';
import { NextResponse } from 'next/server';

export const GET = async () => {
  return (
    getHomeDatas()
      // .then((e) => console.log(e));
      .then((data) => NextResponse.json(data))
  );
};
