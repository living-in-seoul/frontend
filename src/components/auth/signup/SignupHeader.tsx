'use client';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';
import { useRouter } from 'next/navigation';

const SignupHeader = () => {
  const router = useRouter();
  return (
    <div className="pt-5 " onClick={() => router.back()}>
      <Icons path={back} fill="#404040" />
    </div>
  );
};

export default SignupHeader;
