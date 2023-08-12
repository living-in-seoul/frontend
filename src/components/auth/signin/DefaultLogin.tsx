'use client';
import { postSingin } from '@/service/user';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import Button from '@/components/common/Button';
const DefaultLogin = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { ...passwordProps } = register('password', {
    required: '이메일은 필수 입력입니다',
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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

  const onSubmitHandler = (data: any) => {
    postSingin(data);
    resetField('email');
    resetField('password');
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
        <Link
          className="border-b text-[10px] text-zinc-400"
          href={'/signup/first'}
        >
          이메일로 회원가입
        </Link>
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
