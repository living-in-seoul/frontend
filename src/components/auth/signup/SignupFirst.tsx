'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from '../signin/AuthInput';
import Button from '@/components/common/Button';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import {
  checkPasswordForm,
  emailForm,
  nicknameForm,
  passwordForm,
} from '@/utils/formregister';
import { signupEssentialState, signupState } from '@/recoil/authStates';
interface SignupFirstFormProps {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

const SignupFirst = () => {
  const [essential, setEssential] = useRecoilState(signupEssentialState);
  const setFirstData = useSetRecoilState(signupState);
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
    const newData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };
    setFirstData((prev) => ({ ...prev, ...newData }));
    setEssential((prev) => !prev);
    reset();
    router.push('/signup/second');

    console.log('essental의 false 여부 in signup/SignupFirst', essential);
    console.log(
      '회원가입 필수사항 기입 시 데이터 in signup/SignupFirst',
      newData,
    );
    // try {
    //   const response = await fetch('/api/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newData),
    //   }).then((response) => response.json());
    //   console.log('asdfasdf', response);
    // } catch (error) {
    //   return console.error('asdfasdfasdfasdf', error);
    // }
    // 다른 API가 필요함 조회를 해야되는데 여기서 가입을 해버려서 2번째 페이지에서 에러가 뜬다
    // 가입을 시키는 것 말고 조회를 하는 API가 필요함
  };
  return (
    <section className="h-full relative">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-5"
      >
        <div className="">
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
