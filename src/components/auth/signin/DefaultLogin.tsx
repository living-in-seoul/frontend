'use client';
import { postSingin } from '@/service/user';
import { useForm } from 'react-hook-form';
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
        <label>아이디(이메일)</label>
        <input
          id="email"
          type="text"
          className="w-full h-14 text-sm border border-zinc-400 rounded-xl"
          placeholder="ex) seuol123@vival.com"
          {...emailProps}
          aria-invalid={isSubmitted ? (errors.email ? true : false) : undefined}
        />
        {errors.email && <small>{errors.email.message}</small>}
        <label>비밀번호</label>
        <input
          id="password"
          type="password"
          className="w-full h-14 text-sm border border-zinc-400 rounded-xl"
          placeholder="password"
          {...passwordProps}
          aria-invalid={
            isSubmitted ? (errors.password ? true : false) : undefined
          }
        />
        {errors.password && <small>{errors.password.message}</small>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-teal-400 rounded-3xl text-white py-4"
      >
        로그인 하기
      </button>
    </form>
  );
};

export default DefaultLogin;
