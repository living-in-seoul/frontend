'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import AuthInput from '../signin/AuthInput';
import Button from '@/components/common/Button';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import useGetDate from '@/hooks/useGetDate';
import { useEffect, useRef, useState } from 'react';
import RadioInput from './RadioInput';
import { birthDateForm, hometownForm } from '@/utils/formregister';
import { callbackUrlState } from '@/recoil/authStates';
import Table from '@/components/item/Table';
import { genderArray } from '@/utils/constants/auth';
import BeatLoader from '@/components/common/Spinner';
import { toast } from 'react-hot-toast';
import { hometownData } from '@/utils/constants/residence';

interface SignupSecondFormPorps {
  hometown: string;
  birthDate: string;
}

const SignupSecond = () => {
  const [gender, setGeder] = useState<string>('');
  const [movedDate, setmovedDate] = useState<string>('');
  const [openHomeTown, setOpenHomeTown] = useState<boolean>(false);
  const [hometown, setHometown] = useState<string>('');
  const hometownRef = useRef<HTMLInputElement | null>(null);
  const callbackUrl = useRecoilState(callbackUrlState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const nowDate = useGetDate();
  const {
    register,
    handleSubmit,

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
      await fetch('/api/signup', {
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
  const onChangeHometonwnHandler = (e: any) => {
    if (e.target.value && hometownRef.current) {
      setOpenHomeTown(true);
    }
    setHometown(e.target.value);
  };
  useEffect(() => {
    const getPredictions = (keyword: string, dataArray: string[]): string[] => {
      const filtered = dataArray.filter((item) => item.includes(keyword));
      const sorted = filtered.sort(
        (a, b) => a.indexOf(keyword) - b.indexOf(keyword),
      );
      return sorted;
    };
    getPredictions(hometown, hometownData);
  }, [hometown]);
  return (
    <section className="h-full">
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
          <div className="relative">
            {/* <AuthInput
              id="hometown"
              placeholder="ex) 경상북도 안동시"
              label="출신지역"
              mainProps={register('hometown', hometownForm)}
              isSubmitted={isSubmitted}
              isErrors={errors.hometown}
              errorsMessage={errors.hometown?.message}
            /> */}
            <div className="flex flex-col gap-3">
              <label className="text-neutral-500 text-sm ">출신지역</label>
              <div>
                <input
                  value={hometown}
                  onChange={(e) => onChangeHometonwnHandler(e)}
                  className="w-full h-12 text-base border border-zinc-400 rounded-xl px-4 outline-teal-400"
                  type={'text'}
                  placeholder="ex) 경상북도 안동시"
                  ref={hometownRef}
                />
              </div>
            </div>
            {openHomeTown && (
              <ul className="absolute top-20 flex flex-col rounded-xl h-52 w-full bg-white overflow-auto scrollbar-hide border border-neutral-400 shadow-md">
                {hometownData.map((item) => (
                  <li
                    key={item}
                    className="border border-slate-400 py-2"
                    onClick={() => alert(item)}
                  >
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
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
