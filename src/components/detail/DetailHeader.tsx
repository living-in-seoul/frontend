'use client';

import Icons from '@/components/common/Icons';
import { back, detailLinkIcon } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import DetailModal from './DetailModal';
import { useEffect, useState } from 'react';
import { detailModalArray, reportModalArray } from '@/utils/constants/modal';
import { Toaster, toast } from 'react-hot-toast';

const DetailHeader = ({ data }: { data: ResponseDetailData }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const route = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('nickname');
    username && setUsername(username);
  }, []);

  const modalArray =
    username === data.result.user.nickname
      ? detailModalArray
      : reportModalArray;
  return (
    <section className="flex flex-row justify-between  px-4 py-4">
      <div className="flex flex-row gap-4">
        <Icons path={back} fill="#404040" onClick={() => route.back()} />
        <span className="font-bold">{data.result.post.category}</span>
      </div>
      <div className="flex flex-row gap-4">
        <div>
          <Icons
            path={detailLinkIcon}
            fill="#404040"
            onClick={() => toast.error('서비스 준비중입니다')}
          />
        </div>
        <DetailModal
          openModal={openModal}
          modalArray={modalArray}
          onClickUpperHandler={() => {}}
          onClickLowerHandler={() => {}}
          setOpenModal={setOpenModal}
        />
      </div>
    </section>
  );
};

export default DetailHeader;

// stroke="#B8B8B8"
