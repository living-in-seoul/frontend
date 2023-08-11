'use client';
import { registerDataHandler } from '@/service/user';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
  const {} = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <form action={registerDataHandler}>
        <div>
          <label className="border border-neutral-300">email</label>
          <input
            type="text"
            name="email"
            className="border border-neutral-300"
          />
        </div>
        <div>
          <label className="border border-neutral-300">nickname</label>
          <input
            type="text"
            name="nickname"
            className="border border-neutral-300"
          />
        </div>
        <div>
          <label className="border border-neutral-300">password</label>
          <input
            type="text"
            name="password"
            className="border border-neutral-300"
          />
        </div>
        <div>
          <label className="border border-neutral-300">gu</label>
          <input type="text" name="gu" className="border border-neutral-300" />
        </div>
        <div>
          <label className="border border-neutral-300">dong</label>
          <input
            type="text"
            name="dong"
            className="border border-neutral-300"
          />
        </div>
        <div>
          <label className="border border-neutral-300">hometown</label>
          <input
            type="text"
            name="hometown"
            className="border border-neutral-300"
          />
        </div>
        <div>
          <label className="border border-neutral-300">MovedDate</label>
          <input
            type="text"
            name="movedDate"
            className="border border-neutral-300"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUpPage;
