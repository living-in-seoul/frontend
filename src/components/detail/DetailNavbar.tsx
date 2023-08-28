'use client';
import { imageIcon, paperAirplaneIcon, smallMarkerIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import { FormEvent, useEffect, useRef, useState } from 'react';

const DetailNavbar = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = (e: any) => {
    setComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  };
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    const response = await fetch(`/api/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    }).then((response) => response.json());
  };
  return (
    <div className="fixed bottom-0">
      <nav className="fixed bottom-0 right-auto max-w-md w-full border bg-white">
        <form
          onSubmit={onSubmitHandler}
          className="flex-row h-fit flex w-full items-end justify-around px-4 py-4 "
        >
          <Icons
            path={imageIcon}
            fill="none"
            option={{
              stroke: '#404040',
              strokeWidth: '1.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
          <Icons
            path={smallMarkerIcon}
            fill="none"
            option={{ stroke: '#404040', strokeWidth: '1.3' }}
          />
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={handleResizeHeight}
            name="comment"
            className="border rounded-3xl w-64 min-h-[20px] pl-3 bg-neutral-300 overflow-auto resize-none max-h-28"
            placeholder="댓글을 입력해주세요"
            rows={1}
            wrap="hard"
          />
          <button type="submit">
            <Icons path={paperAirplaneIcon} fill="none" />
          </button>
        </form>
      </nav>
    </div>
  );
};

export default DetailNavbar;

// 핸드폰에서 확인 할 내용 로그인페이지에서 인풋에 포커스가 되면 줌이 된다
// 디테일에서 댓글달기 위로 올라오는 느낌으로 하기
