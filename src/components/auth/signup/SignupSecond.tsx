'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from '../signin/AuthInput';
import Button from '@/components/common/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { signupEssentialState, signupState } from '@/recoil/states';
import { redirect, useRouter } from 'next/navigation';
import {
  hometownData,
  hometownDosData,
  residenceData,
  residenceGusData,
} from '@/utils/residence';
import useGetDate from '@/hooks/useGetDate';
import { useEffect, useState } from 'react';

interface FormPorps {
  hometown: string;
  movedDate: string;
  gu: string;
  dong: string;
}
const SignupSecond = () => {
  const [signupData, setSignupData] = useRecoilState(signupState);
  const [gu, setGu] = useState('선택해주세요');
  const [dong, setDong] = useState('');
  const isBack = useRecoilValue(signupEssentialState);
  const nowDate = useGetDate();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { isSubmitted, errors },
  } = useForm<FormPorps>({
    mode: 'onSubmit',
    defaultValues: {
      hometown: '',
      movedDate: '',
      gu: '',
      dong: '',
    },
  });

  isBack && router.back();
  const hometownProps = register('hometown', {
    required: '고향을 알려주세요',
    pattern: {
      value: /^[가-힣\s]*$/,
      message: '띄어쓰기에 포함해서 한글로 적어주세요',
    },
    validate: {
      check: (val) => {
        const splitedVal = val.split(' ').filter(Boolean);
        const [province, city] = splitedVal;
        if (splitedVal.length !== 2) {
          return '띄어쓰기를 확인해주세요';
        }
        if (!hometownDosData.includes(province)) {
          return '올바른지명이 아닙니다';
        }
        if (!hometownData[province].includes(city)) {
          return '올바른 도시명이 아닙니다';
        }
      },
    },
  });

  const { ...movedDateProps } = register('movedDate', {
    required: '언제 서울로 올라오셨나요?',
    pattern: {
      value: /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      message: '숫자와 하이픈을 적어주세요',
    },
    validate: {
      check: (val) => {
        if (val > nowDate) {
          return '예정날짜를 묻는게 아니랍니다 ㅎㅎ';
        }
      },
    },
  });
  const onSubmitHandler: SubmitHandler<FormPorps> = (data) => {
    const newData = { ...signupData, ...data };
    setSignupData((prev) => ({ ...prev, ...data }));
    console.log(newData);
    reset();
  };

  const onChangeGuHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('gu', e.target.value);
    setGu(e.target.value);
  };
  const onChangeDongHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('dong', e.target.value);
    setDong(e.target.value);
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-5"
      >
        <div className="">
          <AuthInput
            id="hometown"
            placeholder="ex) 경상북도 안동시"
            label="아이디(이메일)"
            mainProps={hometownProps}
            isSubmitted={isSubmitted}
            isErrors={errors.hometown}
            errorsMessage={errors.hometown?.message}
          />
          <AuthInput
            id="movedDate"
            placeholder="yyyy-mm-dd"
            label="상경 날짜"
            mainProps={movedDateProps}
            isSubmitted={isSubmitted}
            isErrors={errors.movedDate}
            errorsMessage={errors.movedDate?.message}
          />
        </div>
        <select onChange={(e) => onChangeGuHandler(e)}>
          <option key="default">선택해주세요</option>
          {residenceGusData.map((gu, index) => (
            <option key={index} value={gu}>
              {gu}
            </option>
          ))}
        </select>
        <select onChange={(e) => onChangeDongHandler(e)} name="" id="">
          {gu !== '선택해주세요' ? (
            gu &&
            residenceData[gu].map((dong, index) => (
              <option key={index} value={dong}>
                {dong}
              </option>
            ))
          ) : (
            <option key="default">선택해주세요</option>
          )}
        </select>
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
