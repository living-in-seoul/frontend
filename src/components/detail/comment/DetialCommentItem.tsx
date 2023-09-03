'use client';
import { Comment, detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import UserProfile from '../../item/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import LikeCommentCase from './LikeCommentCase';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  buttonRefState,
  commentKeyState,
  inputTextRefState,
  onReCommentState,
  totalCommentState,
  totalCommentStateProps,
} from '@/recoil/commentState';
import { useSWRConfig } from 'swr';
import ModalPortal from '@/components/modal/ModalPortal';
import ModalOutside from '@/components/modal/ModalOutside';
import { commentModalArray, reportModalArray } from '@/utils/constants/modal';
import { Toaster, toast } from 'react-hot-toast';
interface DetialCommentItemProps {
  data: Comment;
  postId: string;
  children: React.ReactNode;
}

const DetialCommentItem = ({
  data,
  children,
  postId,
}: DetialCommentItemProps) => {
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
  const buttonRef = useRecoilValue(buttonRefState);
  const inputRef = useRecoilValue(inputTextRefState);
  const setOnReComment = useSetRecoilState(onReCommentState);
  const [commentIconColor, setCommentIconColor] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [totalComment, setTotalComment] = useRecoilState(totalCommentState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const modalArray =
    username === nickname ? commentModalArray : reportModalArray;
  const handleClickOutside = useCallback(
    (e: any) => {
      if (
        inputRef?.current &&
        !inputRef.current.contains(e.target) &&
        buttonRef?.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setTotalComment((prev) => ({
          ...prev,
          commentId: null,
        }));
        setCommentIconColor(false);
      }
    },
    [buttonRef, inputRef, setTotalComment],
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const username = localStorage.getItem('nickname');
    username && setUsername(username);
    return setOnReComment(false);
  }, [setOnReComment]);

  const onFocusHandler = () => {
    if (inputRef?.current) {
      inputRef.current?.focus();
      setTotalComment((prev) => ({
        ...prev,
        isReComment: !prev.isReComment,
        isComment: !prev.isComment,
        commentId,
      }));
      setCommentIconColor(true);
    }
  };
  useEffect(() => {
    return setOpenModal(false);
  }, []);
  const onClickChagneHandler = () => {
    if (inputRef?.current) {
      inputRef.current?.focus();
      setTotalComment((prev) => ({
        ...prev,
        isCommentChange: !prev.isCommentChange,
        commentId,
      }));
    }
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
    try {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        const response = await fetch('/api/comment/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentId),
        }).then((respnse) => respnse.json());
        mutate(commentKey);
      }
    } catch (error) {}
  };
  return (
    <section className="flex flex-col gap-2">
      <Toaster />
      <div className="flex flex-row justify-between relative">
        <UserProfile
          createdAt={createdAt}
          nickname={nickname}
          ondetail={true}
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
        <span
          onClick={() => setOnReComment((prev) => !prev)}
          className="bg-neutral-100 p-2 rounded-lg text-xs"
        >
          {comment}
        </span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center">
            <LikeCommentCase
              hasLiked={commentHasLiked}
              likeSize={commentLikeSize}
              likeHandler={likeHandler}
            />
          </div>
          <div
            onClick={onFocusHandler}
            className="flex flex-row gap-1 items-center"
          >
            <Icons
              path={Comment}
              option={{
                fill: 'none',
                stroke: commentIconColor ? '#2DDAB0' : '#404040',
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
        <ModalPortal nodeName="detailPortal">
          <ModalOutside
            className=" bg-white shadow-sm bottom-0 w-full"
            onClose={() => {
              setOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <article>
              {modalArray.map((modal, index) => (
                <div key={index}>
                  <div
                    className={`border-t-2 py-3 flex justify-center border-collapse ${modal.color}`}
                    onClick={
                      modal.first ? onClickChagneHandler : onClickDeleteHandler
                    }
                  >
                    <span>{modal.text}</span>
                  </div>
                </div>
              ))}
            </article>
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  );
};

export default DetialCommentItem;
