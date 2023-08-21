'use client';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupHeader = ({ slug }: { slug: string }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between">
      <div className="pt-5 " onClick={() => router.back()}>
        <Icons path={back} fill="#404040" />
      </div>
      {!(slug === 'first') && (
        <Link
          className="pt-8 text-xs text-neutral-500 cursor-pointer border-b-neutral-400 border-b-2"
          href={'/signin/user'}
        >
          건너뛰기
        </Link>
      )}
    </div>
  );
};

export default SignupHeader;
