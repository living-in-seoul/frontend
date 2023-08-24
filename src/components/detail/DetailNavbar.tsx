'use client';
import { imageIcon, paperAirplaneIcon, smallMarkerIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import { commentForm } from '@/utils/formregister';
import { FormEvent } from 'react';
import useInput from '@/hooks/useInput';

interface SubmitProps {
  comment: string;
}

const DetailNavbar = ({ postId }: { postId: string }) => {
  const [form, onChangeHandler, setComment] = useInput({ comment: '' });
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('aaaaaaaaaaaa', form.comment);
    console.log('aaaaaaaaaaaa', typeof form.comment);
    const response = await fetch(`/api/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: form.comment }),
    }).then((response) => response.json());
  };
  return (
    <div className="fixed bottom-0">
      <nav className="fixed bottom-0 right-auto max-w-md w-full border bg-white">
        <form
          onSubmit={onSubmitHandler}
          className="flex-row h-[60px] flex w-full items-center justify-around px-4 "
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
          <input
            name="comment"
            value={form.comment}
            onChange={onChangeHandler}
            className="border rounded-3xl w-64 h-8 pl-3 bg-neutral-300"
            placeholder="댓글을 입력해주세요"
            type="text"
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
