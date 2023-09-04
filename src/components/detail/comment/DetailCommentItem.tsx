'use client';
import { Comment, detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import UserProfile from '../../item/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import LikeCommentCase from './LikeCommentCase';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  commentKeyState,
  totalCommentState,
  inoutTextFocusState,
  buttonRefState,
  textareaRefState,
} from '@/recoil/commentState';
import { useSWRConfig } from 'swr';
import ModalPortal from '@/components/modal/ModalPortal';
import ModalOutside from '@/components/modal/ModalOutside';
import { commentModalArray, reportModalArray } from '@/utils/constants/modal';
import { Toaster, toast } from 'react-hot-toast';
import DetailModal from '../DetailModal';
interface DetailCommentItemProps {
  data: Comment;
  children: React.ReactNode;
}

const DetailCommentItem = ({ data, children }: DetailCommentItemProps) => {
  const {
    commentLikeSize,
    commentHasLiked,
    createdAt,
    nickname,
    comment,
    commentId,
    reComments,
  } = data;
  const commentKey = useRecoilValue(commentKeyState);
  const [username, setUsername] = useState<string>('');
  const [totalComment, setTotalComment] = useRecoilState(totalCommentState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const textareaRef = useRecoilValue(textareaRefState);
  const [commentInputFocus, setCommentInputFocus] =
    useRecoilState(inoutTextFocusState);
  const { mutate } = useSWRConfig();
  const modalArray =
    username === nickname ? commentModalArray : reportModalArray;
  useEffect(() => {
    const username = localStorage.getItem('nickname');
    username && setUsername(username);
  }, []);
  useEffect(() => {
    return () => setOpenModal(false);
  }, []);
  const onClickChagneHandler = () => {
    setTotalComment((prev) => ({
      ...prev,
      isCommentChange: true,
      commentId,
    }));
    textareaRef.current?.focus();
    setOpenModal(false);
  };
  const onClickDeleteHandler = async () => {
    try {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        const response = await fetch(`/api/comment/${commentId}`, {
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

  const likeHandler = async () => {
    setIsLoading(true);
    try {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        await fetch('/api/comment/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentId),
        }).then((respnse) => respnse.json());
        mutate(commentKey);
      }
    } catch (error) {
      console.log('사망 5초전');
    } finally {
      setIsLoading(false);
    }
  };
  const onReCommentHandler = () => {
    if (commentInputFocus) {
      setCommentInputFocus(null);
      setTotalComment((prev) => ({
        ...prev,
        commentId,
        isReComment: false,
        isComment: true,
      }));
    } else {
      setCommentInputFocus(commentId);
      setTotalComment((prev) => ({
        ...prev,
        commentId,
        isReComment: true,
        isComment: false,
      }));
    }
  };
  return (
    <section className="flex flex-col gap-2">
      <Toaster />
      <div className="flex flex-row justify-between relative">
        <UserProfile
          createdAt={createdAt}
          nickname={nickname}
          ondetail={false}
        />
        <div className="cursor-pointer">
          <Icons
            path={detailColThreeDotIcon}
            fill="#404040"
            onClick={() => {
              setOpenModal(true);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-5/6 ml-auto">
        <span className="bg-neutral-100 p-2 rounded-lg text-xs">{comment}</span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center">
            <LikeCommentCase
              hasLiked={commentHasLiked}
              likeSize={commentLikeSize}
              likeHandler={likeHandler}
              isLoading={isLoading}
            />
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Icons
              className="cursor-pointer"
              onClick={onReCommentHandler}
              path={Comment}
              option={{
                fill: 'none',
                stroke: commentInputFocus === commentId ? '#2DDAB0' : '#404040',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
            />
            <span className="text-xs text-neutral-600">
              답글쓰기 {reComments?.length}
            </span>
          </div>
        </div>
        <div>{children}</div>
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

export default DetailCommentItem;
