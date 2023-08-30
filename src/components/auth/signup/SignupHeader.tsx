'use client';
import Icons from '@/components/common/Icons';
import { callbackUrlState } from '@/recoil/authStates';
import { back } from '@/utils/Icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

const SignupHeader = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const callbackUrl = useRecoilValue(callbackUrlState);
  const href = callbackUrl[0] ?? 'home';
  console.log(callbackUrl[0]);
  return (
    <div className="flex flex-row justify-between">
      <div className="pt-5 " onClick={() => router.back()}>
        <Icons path={back} fill="#404040" />
      </div>
      {!(slug === 'first') && (
        <Link
          className="pt-8 text-xs text-neutral-500 cursor-pointer border-b-neutral-400 border-b-2"
          href={`/${href}`}
        >
          건너뛰기
        </Link>
      )}
    </div>
  );
};

export default SignupHeader;
