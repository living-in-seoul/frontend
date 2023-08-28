'use client';
import { Comment, detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import UserProfile from '../../item/UserProfile';
import { useEffect, useRef, useState } from 'react';
import LikeCommentCase from './LikeCommentCase';
import { useRecoilValue } from 'recoil';
interface DetialCommentItemProps {
  commentData: Comment;
  children: React.ReactNode;
}

export const modalArray = [
  { text: '수정하기', color: 'text-blue-500' },
  { text: '삭제하기', color: 'text-red-500' },
];
const DetialCommentItem = ({
  commentData,
  children,
}: DetialCommentItemProps) => {
  const { createdAt, nickname, comment, commentId, commentHasLiked } =
    commentData;
  const [onModal, setOnModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOnModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const onClickModalHandler = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    try {
      if (spanRef.current?.id === '삭제하기') {
        const response = await fetch(`/api/comment/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json());
      }
      console.log('hi');
    } catch (error) {
    } finally {
      setOnModal(false);
    }
  };
  return (
    <div
      // className="flex flex-col gap-2 relative h-[85px]"
      className="flex flex-col gap-2"
    >
      <div className="flex flex-row justify-between relative">
        <UserProfile createdAt={createdAt} nickname={nickname} />
        <Icons path={detailColThreeDotIcon} onClick={() => setOnModal(true)} />
        {onModal && (
          <div
            className="flex flex-col absolute right-0 bg-white rounded-2xl"
            ref={modalRef}
          >
            {modalArray.map((modal) => (
              <span
                ref={spanRef}
                key={modal.text}
                id={modal.text}
                className={`${modal.color}`}
                onClick={(e) => onClickModalHandler(e)}
              >
                {modal.text}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-5/6 ml-auto">
        <span className="bg-neutral-100 p-2 rounded-lg text-xs">{comment}</span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center">
            <LikeCommentCase
              hasLiked={commentHasLiked}
              likeHandler={() => console.log('hi')}
              likeSize={2}
            />
            <span className="text-xs text-neutral-600">좋아요</span>
          </div>
          <div
            onClick={() => console.log('ldasd')}
            className="flex flex-row gap-1 items-center"
          >
            <Icons
              path={Comment}
              option={{
                fill: 'none',
                stroke: '#404040',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
            />
            <span className="text-xs text-neutral-600">답글쓰기</span>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DetialCommentItem;
