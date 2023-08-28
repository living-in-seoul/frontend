'use client';

import Icons from '@/components/common/Icons';
import { close } from '@/utils/Icon';
import { useRouter } from 'next/navigation';

const SigninHeader = () => {
  const route = useRouter();
  return (
    <div className="pt-5">
      <Icons path={close} fill="#404040" onClick={() => route.back()} />
    </div>
  );
};

export default SigninHeader;
