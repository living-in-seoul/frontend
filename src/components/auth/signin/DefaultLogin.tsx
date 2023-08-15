'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { emailForm, passwordForm } from '@/utils/formregister';

const DefaultLogin = () => {
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
  const router = useRouter();

  const onSubmitHandler: SubmitHandler<RequestLogin> = async (data) => {
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const accessToken = await response.json().then((data) => data.accessToken);

    localStorage.setItem('accessToken', accessToken);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col flex-grow justify-between "
    >
      <div className="flex flex-col justify-between">
        <AuthInput
          errorsMessage={errors.email?.message}
          id="email"
          isErrors={errors.email}
          isSubmitted={isSubmitted}
          label="아이디(이메일)"
          mainProps={register('email', emailForm)}
          placeholder="ex) seuol123@vival.com"
        />
        <AuthInput
          errorsMessage={errors.password?.message}
          id="password"
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
      {/* h-screen설정을 하니깐 스크롤바가 나오는데 이거 어떻게 해결하냐 */}
      <div className="absolute w-full bottom-0">
        <Button
          size="large"
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
