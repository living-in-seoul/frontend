'use client';
import { detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import UserProfile from '../../item/UserProfile';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  buttonRefState,
  inputTextRefState,
  totalCommentState,
} from '@/recoil/commentState';

const DetailReCommentItem = ({
  reCommentData,
}: {
  reCommentData: ReComment;
}) => {
  const [onModal, setOnModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRecoilValue(buttonRefState);
  const inputRef = useRecoilValue(inputTextRefState);
  const [recoilCommentState, setRecoilCommentState] =
    useRecoilState(totalCommentState);
  const [isReCommentChange, setIsReCommentChange] = useState<boolean>(false);
  const {
    createdAt,
    nickname,
    reComment,
    reCommentHasLiked,
    reCommentId,
    userImg,
  } = reCommentData;
  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOnModal(false);
    }
    if (
      inputRef?.current &&
      !inputRef.current.contains(e.target) &&
      buttonRef?.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsReCommentChange(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isReCommentChange !== recoilCommentState.reCommentChange) {
      setRecoilCommentState((prev) => ({
        ...prev,
        reCommentChange: isReCommentChange,
        reCommentId,
        isComment: false,
        isReComment: true,
      }));
    }
  }, [isReCommentChange, reCommentId]);

  const onClickDeleteHandler = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    try {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        const response = await fetch(`/api/comment/re/${reCommentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json());
      }
    } catch (error) {
    } finally {
      setOnModal(false);
    }
  };
  const onClickChagneHandler = () => {
    if (inputRef?.current) {
      inputRef.current?.focus();
      setIsReCommentChange((prev) => !prev);
    }
  };

  return (
    <div
      // className="flex flex-col gap-2 relative h-[85px]"
      className="flex flex-col gap-2"
    >
      <div className="flex flex-row justify-between">
        <UserProfile createdAt={createdAt} nickname={nickname} />
        <Icons path={detailColThreeDotIcon} onClick={() => setOnModal(true)} />
        {onModal && (
          <div
            className="flex flex-col absolute right-0 bg-white rounded-2xl"
            ref={modalRef}
          >
            <span className="text-blue-500" onClick={onClickChagneHandler}>
              {isReCommentChange ? '수정취소' : '수정하기'}
            </span>
            <span className="text-red-500" onClick={onClickDeleteHandler}>
              삭제하기
            </span>
          </div>
        )}
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
    </div>
  );
};

export default DetailReCommentItem;
