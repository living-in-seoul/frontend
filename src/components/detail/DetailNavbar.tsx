'use client';

import { imageIcon, paperAirplaneIcon, smallMarkerIcon } from '@/utils/Icon';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';
import {
  commentKeyState,
  totalCommentState,
  inoutTextFocusState,
  buttonRefState,
  textareaRefState,
} from '@/recoil/commentState';
import Icons from '../common/Icons';
import BeatLoader from 'react-spinners/BeatLoader';
import { Toaster, toast } from 'react-hot-toast';

const DetailNavbar = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const commentInputFocus = useRecoilValue(inoutTextFocusState);
  const [totalComment, setTotalComment] = useRecoilState(totalCommentState);
  const commentUrlKey = useRecoilValue(commentKeyState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setButtonRef = useSetRecoilState(buttonRefState);
  const setTextareaRef = useSetRecoilState(textareaRefState);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    setButtonRef({ current: buttonRef.current });
    setTextareaRef({ current: textareaRef.current });
  }, [setButtonRef, setTextareaRef]);
  useEffect(() => {
    if (commentInputFocus) {
      textareaRef.current?.focus();
    }
  }, [commentInputFocus]);
  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };
  // textarea 값이 자주변하니깐 callback이 필요없을 듯
  const onSubmitCommentHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (!comment) {
      setIsLoading(false);
      return toast.error('뭐든 적긴해야지');
    }
    const tokenValidResponse = await fetch('/api/user', {
      method: 'GET',
    });
    try {
      if (tokenValidResponse.status === 200) {
        if (totalComment.isComment) {
          totalComment.isCommentChange
            ? await fetch(`/api/comment/${totalComment.commentId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
              }).then(() => mutate(commentUrlKey))
            : await fetch(`/api/comment/${postId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
              }).then(() => mutate(commentUrlKey));
        }
        if (totalComment.isReComment) {
          totalComment.reCommentChange
            ? await fetch(`/api/comment/re/${totalComment.reCommentId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reComment: comment }),
              }).then(() => mutate(commentUrlKey))
            : await fetch(`/api/comment/re/${totalComment.commentId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reComment: comment }),
              }).then(() => mutate(commentUrlKey));
        }
      } else {
      }
      setComment('');
      setIsLoading(false);
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
      }
    } catch (err) {
      toast.error('뭔가 잘못됨');
    } finally {
      setTotalComment((prev) => ({
        ...prev,
        isReComment: false,
        isComment: true,
        commentId: null,
        isCommentChange: false,
        reCommentChange: false,
        reCommentId: null,
      }));
    }
  };
  return (
    <div className="fixed bottom-0">
      <Toaster />
      <nav className="fixed bottom-0 right-auto max-w-md w-full border bg-white">
        <form
          id="detailForm"
          onSubmit={(e) => onSubmitCommentHandler(e)}
          className="flex-row h-fit flex w-full items-end justify-around px-4 py-4 "
        >
          <Icons
            path={imageIcon}
            fill="none"
            option={{
              stroke: '#00C092',
              strokeWidth: '1.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            onClick={() => toast.error('서비스준비중입니다')}
          />
          <Icons
            path={smallMarkerIcon}
            fill="none"
            option={{ stroke: '#00C092', strokeWidth: '1.3' }}
            onClick={() => toast.error('서비스준비중입니다')}
          />
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={handleResizeHeight}
            name="comment"
            className="placeholder-zinc-300 focus:outline-none border rounded-2xl w-64 min-h-[20px] pl-3 bg-neutral-100 resize-none overflow-hidden"
            placeholder="댓글을 입력해주세요"
            rows={1}
            wrap="hard"
          />

          {isLoading ? (
            <div className="w-[24px] h-[24px]">
              <BeatLoader size={3} color="#2DDAB0" />
            </div>
          ) : (
            <button ref={buttonRef} type="submit">
              <Icons path={paperAirplaneIcon} fill="none" />
            </button>
          )}
        </form>
      </nav>
    </div>
  );
};

export default DetailNavbar;
