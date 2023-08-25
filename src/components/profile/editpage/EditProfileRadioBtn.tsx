'use client';
import RadioInput from '@/components/auth/signup/RadioInput';
import { signupGenderState } from '@/recoil/authStates';
import { genderArray } from '@/utils/constants/auth';

import { useRecoilState } from 'recoil';

const EditProfileRadioBtn = () => {
  const [gender, setGeder] = useRecoilState(signupGenderState);
  return (
    <div className="flex flex-col gap-3 ">
      <label className="text-neutral-500 text-sm ">성별</label>
      <div className="flex flex-row gap-5 items-center ">
        {genderArray.map((checkGender, index) => (
          <RadioInput
            key={index}
            id="female"
            label={checkGender}
            checked={gender}
            bgColor="bg-teal-400"
            borderColor="border-teal-400"
            onClick={() => setGeder(checkGender)}
          />
        ))}
      </div>
    </div>
  );
};

export default EditProfileRadioBtn;
