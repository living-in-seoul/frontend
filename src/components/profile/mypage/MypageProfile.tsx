'use client';
import Image from 'next/image';
import { profile } from '../../../../public';
import Link from 'next/link';
import Icons from '@/components/common/Icons';
import { rightIcon } from '@/utils/Icon';
import { useEffect, useState } from 'react';

const MypageProfile = () => {
  const [nickname, setNickname] = useState<string>('');
  useEffect(() => {
    const username = localStorage.getItem('nickname');
    if (username) {
      setNickname(username);
    }
  }, []);
  return (
    <section className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-3">
        <Image alt="example" src={profile} priority />
        <div className="flex flex-col">
          <span className="font-semibold">{nickname}</span>
          <p>Lv.1</p>
        </div>
      </div>
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
