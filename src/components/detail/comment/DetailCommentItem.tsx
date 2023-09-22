'use client';
import { Comment } from '@/utils/Icon';
import Icons from '../../common/Icons';
import UserProfile from '../../item/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import LikeCommentCase from './LikeCommentCase';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  commentKeyState,
  totalCommentState,
  inoutTextFocusState,
  textareaRefState,
} from '@/recoil/commentState';
import { useSWRConfig } from 'swr';
import { commentModalArray, reportModalArray } from '@/utils/constants/modal';
import { Toaster, toast } from 'react-hot-toast';
import DetailModal from '../DetailModal';
import {
  clientCommentDelete,
  clientCommentLike,
  userClientVerify,
} from '@/service/clientCommet';
interface DetailCommentItemProps {
  data: CommentData;
  children: React.ReactNode;
}

const DetailCommentItem = ({ data, children }: DetailCommentItemProps) => {
  const {
    comment: { comment, commentLikeSize, commentId, reComments, createdAt },
    commentHasLiked,
    hasReported,
    user: { nickname, userImg },
  } = data;
  const commentKey = useRecoilValue(commentKeyState);
  const [username, setUsername] = useState<string>('');
  const setTotalComment = useSetRecoilState(totalCommentState);
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
    return () => {
      setOpenModal(false);
      setCommentInputFocus(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickChagneHandler = useCallback(() => {
    setTotalComment((prev) => ({
      ...prev,
      isCommentChange: true,
      commentId,
    }));
    textareaRef.current?.focus();
    setOpenModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId, setTotalComment]);

  const onClickDeleteHandler = useCallback(async () => {
    const response = await userClientVerify();
    if (response && response.status === 200) {
      try {
        await clientCommentDelete(commentId).then(() => {
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
  }, [commentId]);

  const onClicklikeHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await userClientVerify();
    if (response && response.status === 200) {
      try {
        await clientCommentLike(commentId, 'comment');
      } catch (error) {
        toast.error('좋아요 실패인데요');
      } finally {
        setIsLoading(false);
        mutate(commentKey);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId]);

  const onReCommentHandler = useCallback(() => {
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
  }, [commentId, commentInputFocus, setCommentInputFocus, setTotalComment]);
  return (
    <section className="flex flex-col gap-2">
      <Toaster />
      <div className="flex flex-row justify-between relative">
        <UserProfile
          createdAt={createdAt}
          nickname={nickname}
          ondetail={false}
          userImg={userImg}
        />
        <div className="cursor-pointer">
          <DetailModal
            openModal={openModal}
            modalArray={modalArray}
            onClickUpperHandler={onClickChagneHandler}
            onClickLowerHandler={onClickDeleteHandler}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-5/6 ml-auto ">
        <span className="bg-neutral-100 p-2 rounded-lg text-xs break-words whitespace-pre-wrap">
          {comment}
        </span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center">
            <LikeCommentCase
              hasLiked={commentHasLiked}
              likeSize={commentLikeSize}
              likeHandler={onClicklikeHandler}
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
    </section>
  );
};

export default DetailCommentItem;
