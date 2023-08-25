import Button from '@/components/common/Button';
import Image from 'next/image';
import { profile } from '../../../../public';
import Link from 'next/link';

const MypageProfile = () => {
  return (
    <div>
      <Image alt="example" src={profile} />
      <div>
        <span>닉네임</span>
        <p>Lv.1</p>
        <Link href={'/editprofile'}>
          <Button size="w-full" title="내 정보 수정" border="border" />
        </Link>
      </div>
    </div>
  );
};

export default MypageProfile;
