'use client';

import { SubmitHandler } from 'react-hook-form';
import AuthInput from './AuthInput';
import { useRouter } from 'next/navigation';
import { emailForm, passwordForm } from '@/utils/formregister';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useCustomForm from '@/hooks/useCustomForm';
import SigninService from './SigninService';
import { signinFetch } from '@/utils/apis/user/signin';
import DefaultLoginBtn from './DefaultLoginBtn';

const DefaultLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { register, handleSubmit, reset, isSubmitted, errors } =
    useCustomForm();
  const onSubmitHandler: SubmitHandler<RequestLogin> = async (data) => {
    setIsLoading(true);
    await signinFetch(data)
      .then((response) => response.json())
      .then((response) => {
        toast.success('로그인 성공');
        localStorage.setItem('nickname', response.nickname);
        router.back();
      })
      .catch(() => {
        toast.error('잘못된 요청입니다');
      })
      .finally(() => {
        reset();
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="flex flex-col flex-grow justify-between">
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
        </div>
        <SigninService />
        <DefaultLoginBtn isLoading={isLoading} />
      </div>
    </form>
  );
};

export default DefaultLogin;
