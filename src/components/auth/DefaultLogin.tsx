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
      className="flex flex-col h-52 w-52 border border-neutral-700 p-5 gap-3"
    >
      <input
        id="email"
        type="text"
        className="w-full"
        placeholder="email"
        {...emailProps}
        aria-invalid={
          isSubmitted ? (errors.email ? 'true' : 'false') : undefined
        }
      />
      {errors.email && <small>{errors.email.message}</small>}
      <input
        id="password"
        type="password"
        className="w-full"
        placeholder="password"
        {...passwordProps}
        aria-invalid={
          isSubmitted ? (errors.password ? 'true' : 'false') : undefined
        }
      />
      {errors.password && <small>{errors.password.message}</small>}
      <button type="submit" disabled={isSubmitting}>
        submit
      </button>
    </form>
  );
};

export default DefaultLogin;
