'use client';
import Back from '@/components/common/Back';
import Header from '@/components/layouts/Header';
import { callbackUrlState } from '@/recoil/authStates';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const SignupHeader = ({ slug }: { slug: string }) => {
  const callbackUrl = useRecoilValue(callbackUrlState);
  const [url, setUrl] = useState<string>('home');

  useEffect(() => {
    callbackUrl && setUrl(callbackUrl[0]);
  }, [callbackUrl]);

  const NextLevel = () => (
    <Link
      className="text-xs text-neutral-500 cursor-pointer border-b-neutral-400 border-b-2 flex items-center justify-center"
      href={`/${url}`}
    >
      건너뛰기
    </Link>
  );
  return (
    <Header left={<Back />} right={slug === 'first' ? <></> : <NextLevel />} />
  );
};

export default SignupHeader;
