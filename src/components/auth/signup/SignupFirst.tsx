'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  checkPasswordForm,
  emailForm,
  nicknameForm,
  passwordForm,
} from '@/utils/formregister';
import AuthInput from '../signin/AuthInput';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import BeatLoader from '@/components/common/Spinner';

interface SignupFirstFormProps {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

const SignupFirst = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitted, errors },
  } = useForm<SignupFirstFormProps>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      checkPassword: '',
      nickname: '',
    },
  });

  const newcheckPasswordForm = {
    ...checkPasswordForm,
    validate: {
      check: (val: string) => {
        if (getValues('password') !== val) {
          return '1차 비밀번호와 2차 비밀번호가 일치하지 않습니다';
        }
      },
    },
  };

  const onSubmitHandler: SubmitHandler<SignupFirstFormProps> = async (data) => {
    setIsLoading(true);
    const newData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };
    console.log(
      '회원가입 필수사항 기입 시 데이터 in signup/SignupFirst',
      newData,
    );
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 500) {
          return toast.error('중복된 아이디나 닉네임입니다');
        }
        reset();
        router.push('/signup/second');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <section className="h-full relative">
      <Toaster />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col gap-5">
          <AuthInput
            id="signupEmail"
            placeholder="ex) seuol123@vival.com"
            label="아이디(이메일)"
            mainProps={register('email', emailForm)}
            isSubmitted={isSubmitted}
            isErrors={errors.email}
            errorsMessage={errors.email?.message}
          />
          <AuthInput
            id="signupPassword"
            isText={false}
            placeholder="영문, 숫자, 특수문자 조합 10자리 이상"
            label="비밀번호"
            mainProps={register('password', passwordForm)}
            isSubmitted={isSubmitted}
            isErrors={errors.password}
            errorsMessage={errors.password?.message}
          />
          <AuthInput
            id="checkPassword"
            isText={false}
            placeholder="ex)비밀번호를 재입력해주세요"
            label="비밀번호 확인"
            mainProps={register('checkPassword', newcheckPasswordForm)}
            isSubmitted={isSubmitted}
            isErrors={errors.checkPassword}
            errorsMessage={errors.checkPassword?.message}
          />
          <AuthInput
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            label="닉네임"
            mainProps={register('nickname', nicknameForm)}
            isSubmitted={isSubmitted}
            isErrors={errors.nickname}
            errorsMessage={errors.nickname?.message}
          />
        </div>
        <div className="absolute w-full bottom-0">
          <Button
            type="submit"
            size="w-full"
            title={
              isLoading ? <BeatLoader size={10} color="#2DDAB0" /> : '수정하기'
            }
            disabled={isLoading}
            bgColor="bg-zinc-300"
            border="none"
            color="text-white"
            hoverColor="bg-teal-400"
          />
        </div>
      </form>
    </section>
  );
};
export default SignupFirst;
