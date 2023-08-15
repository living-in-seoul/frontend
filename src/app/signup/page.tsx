'use client';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
  const {} = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return <div></div>;
};

export default SignUpPage;
