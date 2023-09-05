'use client';

import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';

interface SearchHashTagAlertProps {
  hashTag: string;
}

const SearchHashTagAlert = ({ hashTag }: SearchHashTagAlertProps) => {
  const [loading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const onClickHandler = async () => {
    setIsLoading(true);

    const res = await fetch('/api/alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashtagName: hashTag }),
    })
      .then(() => {
        mutate('/api/alert');
        toast.success('등록완료');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-50 hover:scale-105 scale-100 active:scale-105 transition-all bottom-5 h-10 px-4 py-3 bg-primary rounded-3xl shadow justify-center items-center gap-2 inline-flex"
      onClick={onClickHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
      >
        <path
          d="M7.70972 2.1169C8.42192 1.76518 9.20569 1.58258 10 1.58332C12.9505 1.58332 15.3437 4.06598 15.3437 7.12894V7.68706C15.3428 8.35329 15.5329 9.00582 15.8915 9.56727L16.7687 10.9321C17.5691 12.179 16.9579 13.8739 15.5654 14.2682C11.9268 15.2997 8.07318 15.2997 4.43462 14.2682C3.04209 13.8739 2.43093 12.179 3.2313 10.9329L4.10846 9.56727C4.46711 9.00582 4.65724 8.35329 4.65629 7.68706V7.12894C4.65629 6.27869 4.84074 5.47277 5.17087 4.75236M6.43752 15.0416C6.95606 16.4255 8.35493 17.4166 10 17.4166C10.194 17.4166 10.384 17.4032 10.57 17.3771M13.5625 15.0416C13.3481 15.6068 12.9934 16.1081 12.5317 16.4983"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <span className="text-white text-base font-semibold leading-none">
          {hashTag.substring(1)}
        </span>
        <span className="text-white text-sm font-normal leading-none">
          {' '}
          알림받기
        </span>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SearchHashTagAlert;
