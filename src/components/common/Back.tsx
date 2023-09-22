'use client';

import { back } from '@/utils/Icon';
import Icons from './Icons';
import { useRouter } from 'next-nprogress-bar';

const Back = () => {
  const router = useRouter();
  return (
    <Icons
      path={back}
      fill="#404040"
      onClick={() => router.back()}
      className="cursor-pointer"
    />
  );
};
export default Back;
