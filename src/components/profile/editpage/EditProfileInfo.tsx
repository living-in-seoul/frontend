'use client';

import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import useGetDate from '@/hooks/useGetDate';
import {
  birthDateForm,
  hometownForm,
  nicknameForm,
} from '@/utils/formregister';
import { signupGenderState } from '@/recoil/authStates';
import Table from '@/components/item/Table';
import AuthInput from '@/components/auth/signin/AuthInput';
import EditProfileRadioBtn from './EditProfileRadioBtn';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import BeatLoader from '@/components/common/Spinner';
const EditProfileInfo = ({ profile }: { profile: ResponseUserProfileData }) => {
  const {
    birthDate,
    gender,
    hometown,
    nickname,
    movedDate: defaultMovedDate,
  } = profile;
  const [isLoading, setIsLoading] = useState(false);
  const [movedDate, setmovedDate] = useState(defaultMovedDate);
  const [genderState, setGenderState] = useRecoilState(signupGenderState);
  const nowDate = useGetDate();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      hometown,
      birthDate,
      nickname,
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

  useEffect(() => {
    setGenderState(gender);
  }, [gender, setGenderState]);

  const onSubmitHandler = async (data: {
    hometown: string;
    birthDate: string;
    nickname: string;
  }) => {
    setIsLoading(true);
    const user = {
      nickname: data.nickname,
      birthDate: data.birthDate,
      hometown: data.hometown,
      gender: genderState,
      movedDate: movedDate,
    };
    if (user.nickname === nickname) {
      setIsLoading(false);
      return toast.error('닉네임이 동일합니다');
    } else {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        try {
          await fetch('/api/profile/profile', {
            method: 'PUT',
            body: JSON.stringify(user),
          });
          localStorage.setItem('nickname', data.nickname);
        } catch (err) {
          toast.error('정보를 잘못입력한듯');
        }
      } else {
      }
      setIsLoading(false);
      router.push('/mypage');
    }
  };

  return (
    <section>
      <Toaster />
      <form
        onSubmit={handleSubmit((data) => onSubmitHandler(data))}
        className="flex flex-col gap-10 h-full justify-between"
      >
        <div className="flex flex-col gap-4 pb-20">
          <AuthInput
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            label="닉네임"
            mainProps={register('nickname', nicknameForm)}
            isSubmitted={isSubmitted}
            isErrors={errors.nickname}
            errorsMessage={errors.nickname?.message}
          />
          <AuthInput
            id="birthDate"
            placeholder="yyyy-mm-dd"
            label="생년월일"
            mainProps={newBirthDayFrom}
            isSubmitted={isSubmitted}
            isErrors={errors.birthDate}
            errorsMessage={errors.birthDate?.message}
          />
          <EditProfileRadioBtn />
          <AuthInput
            id="hometown"
            placeholder="ex) 경상북도 안동시"
            label="출신지역"
            mainProps={register('hometown', hometownForm)}
            isSubmitted={isSubmitted}
            isErrors={errors.hometown}
            errorsMessage={errors.hometown?.message}
          />
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
        <div className="bottom-0 mb-2">
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
        </div>
      </form>
    </section>
  );
};
export default EditProfileInfo;
