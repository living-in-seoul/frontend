'use client';
import UserProfile from '../../item/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  commentKeyState,
  textareaRefState,
  totalCommentState,
} from '@/recoil/commentState';
import { commentModalArray, reportModalArray } from '@/utils/constants/modal';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import DetailModal from '../DetailModal';
import { clientCommentDelete } from '@/service/clientCommet';
import { profile } from '../../../../public';
import { userClientVerify } from '@/service/user';

const DetailReCommentItem = ({
  reCommentData,
}: {
  reCommentData: ReComment;
}) => {
  const commentKey = useRecoilValue(commentKeyState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const setTotalComment = useSetRecoilState(totalCommentState);
  const textareaRef = useRecoilValue(textareaRefState);
  const { mutate } = useSWRConfig();
  const {
    createdAt,
    user: { nickname, userImg },
    reComment,
    reCommentId,
  } = reCommentData;
  const modalArray =
    username === nickname ? commentModalArray : reportModalArray;
  useEffect(() => {
    const username = localStorage.getItem('nickname');
    username && setUsername(username);
  }, []);

  const onClickDeleteHandler = useCallback(async () => {
    const response = await userClientVerify();
    if (response && response.status === 200) {
      try {
        await clientCommentDelete(reCommentId, true).then(() => {
          toast.success('삭제하기 완료');
          mutate(commentKey);
        });
      } catch (error) {
        toast.error('삭제하기 실패');
      } finally {
        setOpenModal(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reCommentId]);

  const onClickChagneHandler = () => {
    setTotalComment((prev) => ({
      ...prev,
      reCommentChange: !prev.reCommentChange,
      reCommentId,
      isComment: false,
      isReComment: true,
    }));
    textareaRef.current?.focus();
    setOpenModal(false);
  };
  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <UserProfile
          createdAt={createdAt}
          nickname={nickname}
          userImg={userImg ? userImg : profile}
          ondetail={false}
        />
        <DetailModal
          openModal={openModal}
          modalArray={modalArray}
          onClickUpperHandler={onClickChagneHandler}
          onClickLowerHandler={onClickDeleteHandler}
          setOpenModal={setOpenModal}
        />
      </div>
      <div className="flex flex-col gap-2 w-5/6 ml-auto">
        <span className="bg-neutral-100 p-2 rounded-lg text-xs break-words whitespace-pre-wrap">
          {reComment}
        </span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center"></div>
          <div className="flex flex-row gap-1 items-center"></div>
        </div>
      </div>
    </section>
  );
};

export default DetailReCommentItem;
