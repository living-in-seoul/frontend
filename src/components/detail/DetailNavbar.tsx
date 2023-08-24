'use client';
import { imageIcon, paperAirplaneIcon, smallMarkerIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { commentForm } from '@/utils/formregister';

interface SubmitProps {
  comment: string;
}
const DetailNavbar = ({ postId }: { postId: string }) => {
  const { register, handleSubmit, resetField } = useForm({
    mode: 'onSubmit',
    defaultValues: { comment: '' },
  });

  const onSubmitHandler: SubmitHandler<SubmitProps> = async (data) => {
    const response = await fetch(`/api/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };
  resetField('comment');
  return (
    <div className="fixed bottom-0">
      <nav className="fixed bottom-0 right-auto max-w-md w-full border bg-white">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
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
            id="comment"
            {...register('comment', commentForm)}
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
