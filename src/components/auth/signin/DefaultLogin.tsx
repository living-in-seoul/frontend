'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import Button from '@/components/common/Button';
import { redirect, useRouter } from 'next/navigation';
import { emailForm, passwordForm } from '@/utils/formregister';
import { useRecoilState } from 'recoil';
import { callbackUrlState } from '@/recoil/authStates';

const DefaultLogin = () => {
  const callbackUrl = useRecoilState(callbackUrlState);
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
  const url = callbackUrl[0] ?? 'home';
  const onSubmitHandler: SubmitHandler<RequestLogin> = async (data) => {
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    alert(response.msg);
    reset();
    router.push(`/${url}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col flex-grow justify-between "
    >
      <div className="flex flex-col justify-between">
        <AuthInput
          errorsMessage={errors.email?.message}
          id="signinEmail"
          isErrors={errors.email}
          isSubmitted={isSubmitted}
          label="아이디(이메일)"
          mainProps={register('email', emailForm)}
          placeholder="ex) seuol123@vival.com"
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
          <Link
            className="border-b text-[10px] text-zinc-400"
            href={'/signup/first'}
          >
            비밀번호 찾기
          </Link>
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
          title="로그인하기"
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
