'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
interface FormPorps {
  email: string;
  password: string;
}

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
  const { ...passwordProps } = register('password', {
    required: '이메일은 필수 입력입니다',
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{10,}$/,
      message: '비밀번호의 형식에 맞지 않아요',
    },
  });

  const { ...emailProps } = register('email', {
    required: '이메일은 필수 입력입니다',
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: '이메일의 형식에 맞지 않아요',
    },
  });

  const onSubmitHandler: SubmitHandler<FormPorps> = async (data) => {
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
      className="flex flex-col gap-3"
    >
      <div>
        <AuthInput
          errorsMessage={errors.email?.message}
          id="email"
          isErrors={errors.email}
          isSubmitted={isSubmitted}
          label="아이디(이메일)"
          mainProps={emailProps}
          placeholder="ex) seuol123@vival.com"
        />
        <AuthInput
          errorsMessage={errors.email?.message}
          id="password"
          isErrors={errors.password}
          isSubmitted={isSubmitted}
          label="아이디(이메일)"
          mainProps={passwordProps}
          placeholder="영문, 숫자 조합 10자리 이상"
          isText={false}
        />
      </div>
      <div className="flex flex-row justify-center gap-6 py-6">
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
      <Button
        size="large"
        title="로그인하기"
        bgColor="bg-teal-400"
        border="none"
        color="text-white"
        type="submit"
      />
    </form>
  );
};

export default DefaultLogin;
