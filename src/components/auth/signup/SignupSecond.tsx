'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from '../signin/AuthInput';
import Button from '@/components/common/Button';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import useGetDate from '@/hooks/useGetDate';
import { useState } from 'react';
import RadioInput from './RadioInput';
import { birthDateForm, hometownForm } from '@/utils/formregister';
import { callbackUrlState } from '@/recoil/authStates';
import Table from '@/components/item/Table';
import { genderArray } from '@/utils/constants/auth';
import BeatLoader from '@/components/common/Spinner';
import { Toaster, toast } from 'react-hot-toast';

interface SignupSecondFormPorps {
  hometown: string;
  birthDate: string;
}

const SignupSecond = () => {
  const [gender, setGeder] = useState('');
  const [movedDate, setmovedDate] = useState('');
  const callbackUrl = useRecoilState(callbackUrlState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const nowDate = useGetDate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<SignupSecondFormPorps>({
    mode: 'onSubmit',
    defaultValues: {
      hometown: '',
      birthDate: '',
    },
  });
  const newBirthDayFrom = register('birthDate', {
    ...birthDateForm,
    validate: {
      check: (val: string) => {
        if (val > nowDate) {
          return '미래에서 오셨나요?';
        }
      },
    },
  });
  const onSubmitHandler: SubmitHandler<SignupSecondFormPorps> = async (
    data,
  ) => {
    setIsLoading(true);
    try {
      const newData = { ...data, gender, movedDate };
      const response = await fetch('/api/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then(() => {
          router.push(callbackUrl[0] ? callbackUrl[0] : '/home');
        });
    } catch (error) {
      toast.error('선택사항을 다시 확인해주세요');
      toast((t) => (
        <span>
          Custom and <b>bold</b>
          <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </span>
      ));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-full">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-5 h-full justify-between"
      >
        <div className="flex flex-col gap-5">
          <AuthInput
            id="birthDate"
            placeholder="yyyy-mm-dd"
            label="생년월일"
            mainProps={newBirthDayFrom}
            isSubmitted={isSubmitted}
            isErrors={errors.birthDate}
            errorsMessage={errors.birthDate?.message}
          />
          <div className="flex flex-col gap-3 ">
            <label className="text-neutral-500 text-sm ">성별</label>
            <div className="flex flex-row gap-5 items-center ">
              {genderArray.map((checkGender, index) => (
                <RadioInput
                  key={index}
                  id={checkGender}
                  label={checkGender}
                  checked={gender}
                  bgColor="bg-teal-400"
                  borderColor="border-teal-400"
                  onClick={() => setGeder(checkGender)}
                />
              ))}
            </div>
          </div>
          <div className="relative gap-2">
            <AuthInput
              id="hometown"
              placeholder="ex) 경상북도 안동시"
              label="출신지역"
              mainProps={register('hometown', hometownForm)}
              isSubmitted={isSubmitted}
              isErrors={errors.hometown}
              errorsMessage={errors.hometown?.message}
            />
            {/* <div className="absolute flex rounded-2xl h-20 w-full bg-slate-400"></div> */}
          </div>
          <Table
            categories={['~6개월', '1~2년', '3~4년', '5년 이상']}
            onSelectHandler={setmovedDate}
            selectedCategory={movedDate}
            row={2}
            column={2}
            width="w-full"
            height="h-24"
            label="서울 거주 기간"
          />
        </div>
        <Button
          type="submit"
          size="w-full"
          title={
            isLoading ? <BeatLoader size={10} color="#2DDAB0" /> : '수정하기'
          }
          disabled={isLoading}
          bgColor="bg-zinc-300"
          border="none"
          color="text-white"
          hoverColor="bg-teal-400"
        />
      </form>
    </section>
  );
};
export default SignupSecond;
