import { RegisterOptions } from 'react-hook-form';

export const emailForm:
  | RegisterOptions<{ email: string; password: string }, 'email'>
  | undefined = {
  required: '이메일은 필수 입력입니다',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '이메일의 형식에 맞지 않아요',
  },
};

export const passwordForm:
  | RegisterOptions<{ email: string; password: string }, 'password'>
  | undefined = {
  required: '비밀번호는 필수 입력입니다',
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{10,}$/,
    message: '비밀번호의 형식에 맞지 않아요',
  },
};
export const checkPasswordForm = {
  required: '2차 비밀번호를 필수 입력입니다',
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{10,}$/,
    message: '비밀번호의 형식에 맞지 않아요',
  },
};

export const nicknameForm = {
  required: '닉네임은 필수 입력입니다',
  pattern: {
    value: /^[^\d\s]{1,10}$/,
    message: '닉네임은 10자 이내 숫자와 공백을 허용하지 않습니다',
  },
};
