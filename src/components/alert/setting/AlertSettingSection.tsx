'use client';
import {
  commentAlertToggleState,
  hashtagAlertToggleState,
  likeAlertToggleState,
  pushAlertToggleState,
} from '@/recoil/authStates';

import { useRecoilState } from 'recoil';
import AlartElement from './AlertElemet';
const AlertSettingSection = () => {
  const [pushAlertToggle, setPushAlertToggle] =
    useRecoilState(pushAlertToggleState);
  return (
    <section className="w-full flex flex-col">
      <AlartElement alert={pushAlertToggleState} title="푸시 알림 받기" />
      {pushAlertToggle && (
        <>
          <AlartElement alert={commentAlertToggleState} title="댓글 알림" />
          <AlartElement alert={likeAlertToggleState} title="좋아요 알림" />
          <AlartElement alert={hashtagAlertToggleState} title="해시태그 알림" />
        </>
      )}
    </section>
  );
};
export default AlertSettingSection;
