'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from '../signin/AuthInput';
import Button from '@/components/common/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { signupEssentialState, signupState } from '@/recoil/states';
import { useRouter } from 'next/navigation';
import { hometownData, hometownDosData } from '@/utils/residence';
import useGetDate from '@/hooks/useGetDate';
import { useEffect, useState } from 'react';
import RadioInput from './RadioInput';

interface FormPorps {
  hometown: string;
  birthDate: string;
}
const SignupSecond = () => {
  const [gender, setGender] = useState('여성');
  const [signupData, setSignupData] = useRecoilState(signupState);
  const essential = useRecoilValue(signupEssentialState);
  const router = useRouter();
  const nowDate = useGetDate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<FormPorps>({
    mode: 'onSubmit',
    defaultValues: {
      hometown: '안동시',
      birthDate: '2017-12-12',
    },
  });

  const hometownProps = register('hometown', {
    required: '고향을 알려주세요',
    // pattern: {
    //   value: /^[가힣\s]*$/,
    //   message: '한글로 적어주세요',
    // },
    // validate: {
    //   check: (val) => {
    //     const splitedVal = val.split(' ').filter(Boolean);
    //     const [province, city] = splitedVal;
    //     if (splitedVal.length !== 2) {
    //       return '띄어쓰기를 확인해주세요';
    //     }
    //     if (!hometownDosData.includes(province)) {
    //       return '올바른지명이 아닙니다';
    //     }
    //     if (!hometownData[province].includes(city)) {
    //       return '올바른 도시명이 아닙니다';
    //     }
    //   },
    // },
  });

  const { ...birthDateProps } = register('birthDate', {
    required: '생일이 언제예요?',
    pattern: {
      value: /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      message: '숫자와 하이픈을 적어주세요',
    },
    validate: {
      check: (val) => {
        if (val > nowDate) {
          return '미래에서 오셨나요?';
        }
      },
    },
  });
  const onSubmitHandler: SubmitHandler<FormPorps> = async (data) => {
    const newData = { ...signupData, ...data, gender };
    setSignupData((prev) => ({ ...prev, ...data, gender }));
    console.log(newData);
    reset();
    await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
  };

  useEffect(() => {
    essential && router.back();
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-5"
      >
        <div className="">
          <AuthInput
            id="birthDate"
            placeholder="yyyy-mm-dd"
            label="생년월일"
            mainProps={birthDateProps}
            isSubmitted={isSubmitted}
            isErrors={errors.birthDate}
            errorsMessage={errors.birthDate?.message}
          />
          <div className="pb-6 h-24">
            <label className="text-neutral-500 ">성별</label>
            <div className="flex flex-row gap-5 ">
              <RadioInput
                id="female"
                label="여성"
                checked={gender}
                bgColor="bg-teal-400"
                borderColor="border-teal-400"
                onClick={() => setGender('여성')}
              />
              <RadioInput
                id="male"
                label="남성"
                checked={gender}
                bgColor="bg-teal-400"
                borderColor="border-teal-400"
                onClick={() => setGender('남성')}
              />
            </div>
          </div>
          <AuthInput
            id="hometown"
            placeholder="ex) 안동시, 부산광역시 ..."
            label="출신지역"
            mainProps={hometownProps}
            isSubmitted={isSubmitted}
            isErrors={errors.hometown}
            errorsMessage={errors.hometown?.message}
          />
        </div>

        <Button
          type="submit"
          size="large"
          title="다음"
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
