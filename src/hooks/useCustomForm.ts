import { useForm } from 'react-hook-form';

const useCustomForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return { register, handleSubmit, reset, isSubmitted, errors };
};

export default useCustomForm;
