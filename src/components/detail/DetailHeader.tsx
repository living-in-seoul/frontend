'use client';

import Icons from '@/components/common/Icons';
import { back, detailColThreeDotIcon, detailLinkIcon } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import DetailModal from './DetailModal';
import { useEffect, useState } from 'react';
import { detailModalArray, reportModalArray } from '@/utils/constants/modal';

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
        <div>
          <Icons path={back} fill="#404040" onClick={() => route.back()} />
        </div>
        <span className="font-bold">{data.result.post.category}</span>
      </div>
      <div className="flex flex-row gap-4">
        <div>
          <Icons path={detailLinkIcon} fill="#404040" />
        </div>
        <div>
          <Icons
            path={detailColThreeDotIcon}
            fill="#404040"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>
      {openModal && (
        <DetailModal
          modalArray={modalArray}
          onClickUpperHandler={() => {}}
          onClickLowerHandler={() => {}}
          setOpenModal={setOpenModal}
        />
      )}
    </section>
  );
};

export default DetailHeader;

// stroke="#B8B8B8"
