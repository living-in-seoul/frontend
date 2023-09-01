'use client';

import Icons from '@/components/common/Icons';
import { back, detailLinkIcon } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import EditProfileThreeDot from '../profile/editpage/EditProfileThreeDot';

const DetailHeader = ({ data }: { data: ResponseDetailData }) => {
  const route = useRouter();
  return (
    <div className="flex flex-row justify-between  px-4 py-4">
      <div className="flex flex-row gap-4">
        <div>
          <Icons path={back} fill="#404040" onClick={() => route.back()} />
        </div>
        <span className="font-bold">{data.result.post.category}</span>
      </div>
      <div className="flex flex-row gap-4">
        <div>
          <Icons
            path={detailLinkIcon}
            fill="#404040"
            onClick={() => console.log('링크인데 이건 뭘 연결하지?')}
          />
        </div>
        <div>
          <EditProfileThreeDot
            nickname={data.result.user.nickname}
            type="detail"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;

// stroke="#B8B8B8"
