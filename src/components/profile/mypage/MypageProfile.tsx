'use client';
import Image from 'next/image';
import { profile as baseProfile } from '../../../../public';
import Link from 'next/link';
import Icons from '@/components/common/Icons';
import { rightIcon } from '@/utils/Icon';
import useSWR from 'swr';
const MypageProfile = () => {
  const { data, isLoading } = useSWR<ResponseUserProfileData>('/api/profile');
  return (
    <section className="flex flex-col gap-7">
      {data && (
        <div className="flex flex-row items-center gap-3">
          <div className="rounded flex h-[72px] w-[72px]">
            <Image
              alt="example"
              src={data?.profileImageUrl ?? baseProfile}
              priority={true}
              width={72}
              height={72}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">{data?.nickname}</span>
            <p>Lv.1</p>
          </div>
        </div>
      )}
      <Link href={'/editprofile'}>
        <div className="border border-neutral-500 w-full flex flex-row items-center justify-center gap-3 py-2 rounded-lg">
          <span>내 정보 수정</span>
          <Icons path={rightIcon} fill="none" />
        </div>
      </Link>
    </section>
  );
};

export default MypageProfile;
