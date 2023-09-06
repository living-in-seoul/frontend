'use client';
import {
  commentAlertToggleState,
  hashtagAlertToggleState,
  likeAlertToggleState,
  pushAlertToggleState,
} from '@/recoil/authStates';
import { useRecoilState } from 'recoil';
import AlartElement from './AlertElemet';
import { useEffect } from 'react';

const AlertSettingSection = () => {
  const [pushAlertToggle, setPushAlertToggle] =
    useRecoilState(pushAlertToggleState);
  const [commentAlertToggle, setCommentAlertToggle] = useRecoilState(
    commentAlertToggleState,
  );
  const [likeAlertToggle, setLikeAlertToggle] =
    useRecoilState(likeAlertToggleState);
  const [hashtagAlertToggle, setHashtagAlertToggle] = useRecoilState(
    hashtagAlertToggleState,
  );

  useEffect(() => {}, [pushAlertToggle]);

  useEffect(() => {}, [
    commentAlertToggle,
    likeAlertToggle,
    hashtagAlertToggle,
  ]);

  return (
    <section className="w-full flex flex-col">
      <AlartElement
        title="푸시 알림 받기"
        toggleState={pushAlertToggle}
        setToggleState={setPushAlertToggle}
      />
      {pushAlertToggle && (
        <>
          <AlartElement
            title="댓글 알림"
            toggleState={commentAlertToggle}
            setToggleState={setCommentAlertToggle}
          />
          <AlartElement
            title="좋아요 알림"
            toggleState={likeAlertToggle}
            setToggleState={setLikeAlertToggle}
          />
          <AlartElement
            title="해시태그 알림"
            toggleState={hashtagAlertToggle}
            setToggleState={setHashtagAlertToggle}
          />
        </>
      )}
    </section>
  );
};
export default AlertSettingSection;
