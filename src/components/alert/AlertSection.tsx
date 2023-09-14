'use client';

import { AleatSectionState } from '@/recoil/authStates';
import { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import AlertActiveItem from './AlertActiveItem';
import AlertHashTagItem from './AlertHashTagItem';
import Icons from '../common/Icons';
import { Alert } from '@/utils/Icon';
import useSWR from 'swr';
import Button from '../common/Button';
import NoneItem from '../NoneItem';
import { useRouter } from 'next/navigation';
const AlertSection = () => {
  const currentAlertSection = useRecoilValue(AleatSectionState);
  const router = useRouter();
  const ActiveSection: FC = () => {
    const { data: ActiveData } = useSWR<ResponseAlarm>(`/api/alert/activity`, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
    return (
      <article key={uuidv4()} className="flex flex-col w-full h-full">
        {ActiveData?.alarmList.map((item) => (
          <AlertActiveItem key={uuidv4()} {...item} />
        ))}
      </article>
    );
  };
  const HashTagSection: FC = () => {
    const { data: HashtagData } = useSWR<ResponseAlarm>(`/api/alert/hashtag`);
    return (
      <article key={uuidv4()}>
        <div className="w-full px-3.5 py-5 flex justify-between gap-2.5 items-center">
          <Icons
            path={Alert}
            fill="none"
            option={{
              stroke: '#404040',
              strokeWidth: '1.5',
              strokeLinecap: 'round',
            }}
          />
          <div className="grow">
            <span className="text-gray4 text-sm font-normal leading-none">
              알림 받는 해시태그{' '}
            </span>
            <span className="text-gray4 text-sm font-medium leading-none">
              {HashtagData && HashtagData.alarmList.length}개
            </span>
          </div>
          <Button
            title="설정"
            size="xsmall"
            bgColor="bg-primary"
            textColor="white"
            select
            onClick={() => router.push('/alert/hashtag')}
          />
        </div>
        {HashtagData?.alarmList.length !== 0 ? (
          HashtagData?.alarmList.map((item) => (
            <AlertHashTagItem key={uuidv4()} item={item} />
          ))
        ) : (
          <NoneItem
            title="새로운 알림이 없습니다"
            description="서울바이벌에서의 모든 활동내역을 알려드립니다"
          />
        )}
      </article>
    );
  };

  switch (currentAlertSection) {
    case 'active':
      return (
        <>
          <Suspense fallback={<div>loading...</div>}>
            <ActiveSection />
          </Suspense>
        </>
      );
    case 'hastag':
      return <HashTagSection />;

    default:
      return;
  }
};
export default AlertSection;
