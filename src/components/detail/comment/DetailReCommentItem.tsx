'use client';
import UserProfile from '../../item/UserProfile';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  commentKeyState,
  textareaRefState,
  totalCommentState,
} from '@/recoil/commentState';
import { commentModalArray, reportModalArray } from '@/utils/constants/modal';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Icons from '@/components/common/Icons';
import { detailColThreeDotIcon } from '@/utils/Icon';
import DetailModal from '../DetailModal';

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
  const { createdAt, nickname, reComment, reCommentId, userImg } =
    reCommentData;
  const modalArray =
    username === nickname ? commentModalArray : reportModalArray;
  useEffect(() => {
    const username = localStorage.getItem('nickname');
    username && setUsername(username);
  }, []);

  const onClickDeleteHandler = async () => {
    try {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        await fetch(`/api/comment/re/${reCommentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then(() => {
            toast.success('삭제하기 완료');
            mutate(commentKey);
          });
      }
    } catch (error) {
      toast.error('삭제하기 실패');
    } finally {
      setOpenModal(false);
    }
  };
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
          userImg={userImg}
          ondetail={false}
        />
        <Icons
          path={detailColThreeDotIcon}
          fill="#404040"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 w-5/6 ml-auto">
        <span className="bg-neutral-100 p-2 rounded-lg text-xs">
          {reComment}
        </span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center"></div>
          <div className="flex flex-row gap-1 items-center"></div>
        </div>
      </div>
      {openModal && (
        <DetailModal
          modalArray={modalArray}
          onClickUpperHandler={onClickChagneHandler}
          onClickLowerHandler={onClickDeleteHandler}
          setOpenModal={setOpenModal}
        />
      )}
    </section>
  );
};

export default DetailReCommentItem;
