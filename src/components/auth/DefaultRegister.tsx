'use client';
import { signinDataHandler } from '@/service/user';
import { useForm } from 'react-hook-form';
const DefaultRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  return (
    <form
      action={signinDataHandler}
      onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
      className="flex flex-col h-52 w-52 border border-neutral-700 p-5 gap-3"
    >
      <input
        id="email"
        type="text"
        className="w-full"
        placeholder="email"
        {...register('email', {
          required: '이메일은 필수 입력입니다',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '이메일의 형식에 맞지 않아요',
          },
        })}
        aria-invalid={
          isSubmitted ? (errors.email ? 'true' : 'false') : undefined
        }
      />
      {errors.email && <small>{errors.email.message}</small>}
      <input
        id="pw"
        type="password"
        className="w-full"
        placeholder="pw"
        {...register('pw', {
          required: '비밀번호는 필수 입력입니다',
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: '비밀번호의 형식에 맞지 않아요',
          },
        })}
        aria-invalid={isSubmitted ? (errors.pw ? 'true' : 'false') : undefined}
      />
      {errors.pw && <small>{errors.pw.message}</small>}
      <button type="submit" disabled={isSubmitting}>
        submit
      </button>
    </form>
  );
};

export default DefaultRegister;
