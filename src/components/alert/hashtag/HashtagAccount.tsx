'use client';
import Button from '@/components/common/Button';
import BeatLoader from '@/components/common/Spinner';
import useInput from '@/hooks/useInput';
import { FormEvent, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';

const HashtagAccount = () => {
  const [value, onChange, setValue] = useInput({ hashtagName: '' });
  const [loading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (value.hashtagName[0] !== '#') {
      toast.error('#을 붙여주세요');
      setIsLoading(false);
      return;
    }

    const res = await fetch('/api/alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then(() => {
        mutate('/api/alert');
        setValue({ hashtagName: '' });
        toast.success('등록완료');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full justify-between py-[17px] border-b border-gray5"
    >
      <input
        type="text"
        placeholder="등록할 #해시태그를 입력해 주세요"
        name="hashtagName"
        autoFocus
        onChange={onChange}
        value={value.hashtagName}
        className=" placeholder:text-sm placeholder:text-gray5 grow active:border-none focus:outline-none"
      />
      <Button
        title={loading ? <BeatLoader size={7} color="white" /> : '등록'}
        size="xsmall"
        bgColor="bg-primary"
        textColor="white"
        select
        type="submit"
        disabled={loading}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
};
export default HashtagAccount;
