'use client';
import { imageIcon, paperAirplaneIcon, smallMarkerIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  formRefState,
  commentKeyState,
  inputTextRefState,
  totalCommentState,
  inoutTextFocusState,
} from '@/recoil/commentState';
import { useSWRConfig } from 'swr';
import { toast } from 'react-hot-toast';
import BeatLoader from 'react-spinners/BeatLoader';

const DetailNavbar = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const setInputRef = useSetRecoilState(inputTextRefState);
  const setButtonRef = useSetRecoilState(formRefState);
  const commentInputFocus = useRecoilValue(inoutTextFocusState);
  const commentState = useRecoilValue(totalCommentState);
  const commentUrlKey = useRecoilValue(commentKeyState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (commentInputFocus) {
      textareaRef.current?.focus();
    }
  }, []);

  // useEffect(() => {
  //   setInputRef(textareaRef);
  //   setButtonRef(formRef);
  //   return () => {
  //     setInputRef(null);
  //     setButtonRef(null);
  //   };
  // }, [setInputRef, commentState, setButtonRef]);

  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };
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
    if (tokenValidResponse.status === 200) {
      if (commentState.isComment) {
        commentState.isCommentChange
          ? await fetch(`/api/comment/${commentState.commentId}`, {
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
      if (commentState.isReComment) {
        commentState.reCommentChange
          ? await fetch(`/api/comment/re/${commentState.reCommentId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ reComment: comment }),
            }).then(() => mutate(commentUrlKey))
          : await fetch(`/api/comment/re/${commentState.commentId}`, {
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
  };
  return (
    <div className="fixed bottom-0">
      <nav className="fixed bottom-0 right-auto max-w-md w-full border bg-white">
        <form
          ref={formRef}
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
          />
          <Icons
            path={smallMarkerIcon}
            fill="none"
            option={{ stroke: '#00C092', strokeWidth: '1.3' }}
          />
          <textarea
            id="inputText"
            ref={textareaRef}
            value={comment}
            onChange={handleResizeHeight}
            name="comment"
            className="border rounded-3xl w-64 min-h-[20px] pl-3 bg-neutral-300 overflow-auto resize-none max-h-28"
            placeholder="댓글을 입력해주세요"
            rows={1}
            wrap="hard"
          />

          {isLoading ? (
            <div className="w-[24px] h-[24px]">
              <BeatLoader size={3} color="#2DDAB0" />
            </div>
          ) : (
            <button type="submit">
              <Icons path={paperAirplaneIcon} fill="none" />
            </button>
          )}
        </form>
      </nav>
    </div>
  );
};

export default DetailNavbar;

// 핸드폰에서 확인 할 내용 로그인페이지에서 인풋에 포커스가 되면 줌이 된다
// 디테일에서 댓글달기 위로 올라오는 느낌으로 하기
