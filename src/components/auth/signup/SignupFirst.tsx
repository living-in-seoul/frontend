'use client';

import { useForm } from 'react-hook-form';
import AuthInput from '../signin/AuthInput';
import Button from '@/components/common/Button';
import { useRecoilState } from 'recoil';
import { signupEssentialState, signupFistState } from '@/recoil/states';
import { useRouter } from 'next/navigation';

const SignupFirst = () => {
  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      checkPassword: '',
      nickname: '',
    },
  });
  const router = useRouter();
  const [signupData, setSignupData] = useRecoilState(signupFistState);
  const [Esseontial, setEssential] = useRecoilState(signupEssentialState);
  const { ...emailProps } = register('email', {
    required: '이메일은 필수 입력입니다',
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: '이메일 형식이 올바르지 않습니다',
    },
  });

  const { ...passwordProps } = register('password', {
    required: '비밀번호는 필수 입력입니다',
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{10,}$/,
      message: '비밀번호의 형식에 맞지 않아요',
    },
  });

  const { ...checkPasswordProps } = register('checkPassword', {
    required: '2차 비밀번호를 필수 입력입니다',
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{10,}$/,
      message: '비밀번호의 형식에 맞지 않아요',
    },
    validate: {
      check: (val) => {
        if (getValues('password') !== val) {
          return '1차 비밀번호와 2차 비밀번호가 일치하지 않습니다';
        }
      },
    },
  });
  const { ...nicknameProps } = register('nickname', {
    required: '닉네임은 필수 입력입니다',
    pattern: {
      value: /^[^\d\s]{1,10}$/,
      message: '닉네임은 10자 이내 숫자와 공백을 허용하지 않습니다',
    },
  });

  const onSubmitHandler = (data: any) => {
    setSignupData(data);
    resetField('email');
    resetField('password');
    resetField('checkPassword');
    resetField('nickname');
    setEssential((prev) => !prev);
    router.replace('/signup/second');
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-5"
      >
        <div className="">
          <AuthInput
            id="email"
            isText={true}
            placeholder="ex) seuol123@vival.com"
            label="아이디(이메일)"
            mainProps={emailProps}
            isSubmitted={isSubmitted}
            isErrors={errors.email}
            errorsMessage={errors.email?.message}
          />
          <AuthInput
            id="password"
            isText={true}
            placeholder="영문, 숫자 조합 10자리 이상"
            label="비밀번호"
            mainProps={passwordProps}
            isSubmitted={isSubmitted}
            isErrors={errors.password}
            errorsMessage={errors.password?.message}
          />
          <AuthInput
            id="checkPassword"
            isText={true}
            placeholder="ex)비밀번호를 재입력해주세요"
            label="비밀번호 확인"
            mainProps={checkPasswordProps}
            isSubmitted={isSubmitted}
            isErrors={errors.checkPassword}
            errorsMessage={errors.checkPassword?.message}
          />
          <AuthInput
            id="nickname"
            isText={true}
            placeholder="닉네임을 입력해주세요"
            label="닉네임"
            mainProps={nicknameProps}
            isSubmitted={isSubmitted}
            isErrors={errors.nickname}
            errorsMessage={errors.nickname?.message}
          />
        </div>
        <Button
          type="submit"
          size="large"
          title="다음"
          bgColor="bg-zinc-300"
          border="noem"
          color="text-white"
          hoverColor="bg-teal-400"
        />
      </form>
    </section>
  );
};
export default SignupFirst;
