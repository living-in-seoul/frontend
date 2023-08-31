'use client';

import { AleatSectionState } from '@/recoil/authStates';
import { FC, Suspense, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import AlertActiveItem from './AlertActiveItem';
import AlertHashTagItem from './AlertHashTagItem';
import Icons from '../common/Icons';
import { Alert } from '@/utils/Icon';
import Select from '../common/Select';
import useSWR from 'swr';
const AlertSection = () => {
  const currentAlertSection = useRecoilValue(AleatSectionState);

  const ActiveSection: FC = () => {
    const { data: ActiveData, error } = useSWR<ResponseAlarm>(
      `/api/alert/activity`,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onError: (error) => {},
        onSuccess: (data) => {
          console.log(data);
        },
      },
    );
    return (
      <article key={uuidv4()} className="flex flex-col w-full h-full">
        {ActiveData?.alarmList.map((item, i) => (
          <AlertActiveItem key={uuidv4()} {...item} />
        ))}
      </article>
    );
  };
  const HashTagSection: FC = () => {
    const { data: HashtagData } = useSWR<ResponseAlarm>(`/api/alert/hashtag`);
    return (
      <article key={uuidv4()}>
        <div className="w-full px-3.5 py-5 flex justify-between gap-2.5">
          <Icons
            path={Alert}
            fill="none"
            option={{
              stroke: 'black',
              strokeWidth: '1.5',
              strokeLinecap: 'round',
            }}
          />
          <div className="grow">
            <span className="text-black text-sm font-normal leading-none">
              알림 받는 해시태그{' '}
            </span>
            <span className="text-black text-sm font-medium leading-none">
              3개
            </span>
          </div>
          <Select title="설정" selectTag size="alert" className="rounded-md" />
        </div>
        {HashtagData?.alarmList.map((_, i) => (
          <AlertHashTagItem key={uuidv4()} />
        ))}
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
