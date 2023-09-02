'use client';

import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import EditProfileThreeDot from './EditProfileThreeDot';

const EditProfileHeader = () => {
  const route = useRouter();
  return (
    <div className="flex flex-row justify-between  py-4">
      <div className="flex flex-row gap-4">
        <div>
          <Icons path={back} fill="#404040" onClick={() => route.back()} />
        </div>
        <span className="font-bold">내 정보 수정</span>
      </div>
      <EditProfileThreeDot nickname="aa" type="editProfile" />
    </div>
  );
};

export default EditProfileHeader;

// stroke="#B8B8B8"
