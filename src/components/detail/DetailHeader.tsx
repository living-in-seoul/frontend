'use client';

import Icons from '@/components/common/Icons';
import { back, detailColThreeDotIcon, detailLinkIcon } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
interface DetailHeaderProps {
  data: {
    category: string;
  };
}
const DetailHeader = ({ data }: DetailHeaderProps) => {
  const route = useRouter();
  return (
    <div className="flex flex-row justify-between  px-4 py-4">
      <div className="flex flex-row gap-4">
        <div>
          <Icons
            path={back}
            fill="#404040"
            onClick={() => route.push('/community')}
          />
        </div>
        <span className="font-bold">{data.category}</span>
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
          <Icons
            path={detailColThreeDotIcon}
            fill="#404040"
            onClick={() => console.log('기타등등모달을 띄워야할듯')}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;

// stroke="#B8B8B8"
