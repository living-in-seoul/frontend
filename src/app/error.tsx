'use client';

import { useEffect } from 'react';
import NoneItem from '@/components/NoneItem';
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex w-full h-screen flex-col items-center justify-center">
      <NoneItem
        title="500 에러"
        description="서비스 이용에 불편을 드려 죄송합니다"
      />
    </section>
  );
}
