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
import {
  callbackUrlState,
  signupGenderState,
  signupState,
} from '@/recoil/authStates';
import Table from '@/components/item/Table';
import AuthInput from '@/components/auth/signin/AuthInput';
import EditProfileRadioBtn from './EditProfileRadioBtn';
import { MouseEvent, useEffect } from 'react';

const EditProfileInfo = ({ profile }: { profile: ResponseUserProfileData }) => {
  const { birthDate, gender, hometown, movedDate, nickname } = profile;
  const [signupData, setSignupData] = useRecoilState(signupState);
  const [genderState, setGenderState] = useRecoilState(signupGenderState);
  const router = useRouter();
  const nowDate = useGetDate();
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
  }, []);
  const onSubmitHandler = async (data: any) => {
    const formData = new FormData();
    const user = {
      nickname: data.nickname,
      birthDate: data.birthDate,
      hometown: data.hometown,
      gender: genderState,
      movedDate: signupData.movedDate,
    };
    console.log('xzcvzxcvzxcvx', user);

    const tokenValidResponse = await fetch('/api/user', {
      method: 'GET',
    });

    if (tokenValidResponse.status === 200) {
      const response = await fetch('/api/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then((response) => response.json());
      console.log(response);
      alert(response.message);
    } else {
      console.log('로그인모달 나와주세요');
    }
    // router.push('/mypage');
  };

  const onSelectHandler = (movedDate: string) => {
    setSignupData((prev) => ({ ...prev, movedDate }));
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit((e) => onSubmitHandler(e))}
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
            onSelectHandler={onSelectHandler}
            selectedCategory={signupData.movedDate}
            row={2}
            column={2}
            width="w-full"
            height="h-24"
            label="서울 거주 기간"
          />
          {/* <div className="flex flex-col gap-3">
            <label className="text-neutral-500 text-sm ">거주 지역</label>
            <div className="w-full h-12 text-base border border-zinc-400 rounded-xl px-4 outline-teal-400 flex items-center ">
              <Icons path={blackMarkerIcon} fill="none" />
              <span>서울시 전체</span>
            </div>
          </div> */}
        </div>
        <div className="bottom-0 mb-2">
          <Button
            type="submit"
            size="w-full"
            title="수정하기"
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
// const response = await fetch('/api/signup', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(newData),
// }).then((response) => response.json());
// console.log('클라이언트에서 나오는 response', response);
// alert(response.message);
// response.message === '회원가입에 성공하셨습니다.' &&
//   router.push('/signup/second');
export default EditProfileInfo;
