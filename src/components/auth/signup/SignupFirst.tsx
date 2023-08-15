'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from '../signin/AuthInput';
import Button from '@/components/common/Button';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import {
  checkPasswordForm,
  emailForm,
  nicknameForm,
  passwordForm,
} from '@/utils/formregister';
import { signupEssentialState, signupState } from '@/recoil/authStates';
interface FormProps {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

const SignupFirst = () => {
  const setEssential = useSetRecoilState(signupEssentialState);
  const setFirstData = useSetRecoilState(signupState);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitted, errors },
  } = useForm<FormProps>({
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

  const onSubmitHandler: SubmitHandler<FormProps> = (data) => {
    reset();
    setFirstData((prev) => ({ ...prev, ...data }));
    setEssential((prev) => !prev);
    router.push('/signup/second');
  };
  return (
    <section className="h-full relative">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-5"
      >
        <div className="">
          <AuthInput
            key="email"
            id="email"
            placeholder="ex) seuol123@vival.com"
            label="아이디(이메일)"
            mainProps={register('email', emailForm)}
            isSubmitted={isSubmitted}
            isErrors={errors.email}
            errorsMessage={errors.email?.message}
          />
          <AuthInput
            key="password"
            id="password"
            isText={false}
            placeholder="영문, 숫자, 특수문자 조합 10자리 이상"
            label="비밀번호"
            mainProps={register('password', passwordForm)}
            isSubmitted={isSubmitted}
            isErrors={errors.password}
            errorsMessage={errors.password?.message}
          />
          <AuthInput
            key="checkPassword"
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
            key="nickname"
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
            size="large"
            title="다음"
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
