'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { emailForm, passwordForm } from '@/utils/formregister';
import { useRecoilState } from 'recoil';
import { callbackUrlState } from '@/recoil/authStates';
import toast from 'react-hot-toast';
import { useState } from 'react';
import BeatLoader from '@/components/common/Spinner';

const DefaultLogin = () => {
  const callbackUrl = useRecoilState(callbackUrlState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const url = callbackUrl[0] === '' ? '/home' : callbackUrl[0];
  const onSubmitHandler: SubmitHandler<RequestLogin> = async (data) => {
    setIsLoading(true);
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error('에러입니다');
        } else {
          toast.success('로그인 성공');
          return response.json();
        }
      })
      .then((response) => {
        localStorage.setItem('nickname', response.nickname);
        router.back();
      })
      .catch((error) => {
        toast.error('잘못된 요청입니다');
      })
      .finally(() => {
        reset();
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col flex-grow justify-between"
    >
      <div className="flex flex-col justify-between gap-6">
        <AuthInput
          errorsMessage={errors.email?.message}
          id="signinEmail"
          isErrors={errors.email}
          isSubmitted={isSubmitted}
          label="아이디(이메일)"
          mainProps={register('email', emailForm)}
          placeholder="ex) seoul123@vival.com"
        />
        <AuthInput
          errorsMessage={errors.password?.message}
          id="signinPassword"
          isErrors={errors.password}
          isSubmitted={isSubmitted}
          label="비밀번호"
          mainProps={register('password', passwordForm)}
          placeholder="영문, 숫자 조합 10자리 이상"
          isText={false}
        />
        <div className="flex flex-row justify-center gap-6 ">
          <div
            className="border-b text-[10px] text-zinc-400"
            onClick={() => toast.error('서비스 준비중입니다')}
          >
            비밀번호 찾기
          </div>
          <div
            className="border-b text-[10px] text-zinc-400"
            onClick={() => router.replace('/signup/first')}
          >
            이메일로 회원가입
          </div>
        </div>
      </div>
      <div className="absolute w-full bottom-0">
        <Button
          size="w-full"
          title={
            isLoading ? <BeatLoader size={10} color="#2DDAB0" /> : '로그인하기'
          }
          disabled={isLoading}
          bgColor="bg-teal-400"
          border="none"
          color="text-white"
          type="submit"
        />
      </div>
    </form>
  );
};

export default DefaultLogin;
