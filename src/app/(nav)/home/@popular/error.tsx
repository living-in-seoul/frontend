'use client';

import { useEffect } from 'react';
import Loading from './loading';
import NoneItem from '@/components/NoneItem';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log('error 이름 :', error.message);
  }, [error]);

  const content = `일시적인 오류입니다
  다시시도해주세요`;
  return (
    <div className="relative w-full items-center h-full justify-center">
      <div className="blur">
        <Loading />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center absolute top-0">
        <NoneItem title={`${error.message}`} description={content} />
        <div className="w-full flex items-center justify-center">
          <button onClick={() => reset()}>다시시도</button>
        </div>
      </div>
    </div>
  );
}
