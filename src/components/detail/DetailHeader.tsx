'use client';

import Icons from '@/components/common/Icons';
import { back, detailLinkIcon } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import DetailModal from './DetailModal';
import { useEffect, useState } from 'react';
import { detailModalArray, reportModalArray } from '@/utils/constants/modal';
import { Toaster, toast } from 'react-hot-toast';
import Header from '../layouts/Header';
import Back from '../common/Back';

const DetailHeader = ({ data }: { data: ResponseDetailData }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const username = localStorage.getItem('nickname');
    username && setUsername(username);
  }, []);

  const modalArray =
    username === data.result.user.nickname
      ? detailModalArray
      : reportModalArray;

  const rightContent = (
    <div className="flex flex-row gap-4">
      <Icons
        path={detailLinkIcon}
        fill="#404040"
        onClick={() => toast.error('서비스 준비중입니다')}
      />
      <DetailModal
        openModal={openModal}
        modalArray={modalArray}
        onClickUpperHandler={() => {}}
        onClickLowerHandler={() => {}}
        setOpenModal={setOpenModal}
      />
    </div>
  );
  return (
    <Header
      className={'px-4 py-4'}
      left={<Back />}
      center={<span className="font-bold">{data.result.post.category}</span>}
      right={rightContent}
    />
  );
};

export default DetailHeader;
