'use client';
import Image from 'next/image';
import EditImageIcon from './EditImageIcon';
import { useRef, useState } from 'react';
import { profile as baseProfile } from '../../../../public/';
import { useSetRecoilState } from 'recoil';
import { userPorfileState } from '@/recoil/authStates';
const EditProfileImage = () => {
  const setProfileImage = useSetRecoilState(userPorfileState);

  const [profile, setProfile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const onsetProfileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfile(e.target.files[0]);
    }
  };
  // 이미지 미리띄우는거 나영님한테 한번 물어보기
  return (
    <section className="flex justify-center items-center">
      <div className="flex relative h-[72px] w-[72px]">
        {profile ? (
          <Image
            className="rounded-full"
            alt="profile"
            src={URL.createObjectURL(profile)}
            onLoad={() => URL.revokeObjectURL(String(profile))}
            width={72}
            height={72}
          />
        ) : (
          <Image alt="nonProfile" src={baseProfile} />
        )}
        <input
          onChange={(e) => onsetProfileHandler(e)}
          ref={fileInput}
          type="file"
          className="hidden"
        />
        <div
          onClick={() => fileInput.current?.click()}
          className="absolute bg-white rounded-full w-5 h-5 flex justify-center items-center border-neutral-800 border right-0 bottom-0"
        >
          <EditImageIcon />
        </div>
      </div>
    </section>
  );
};

export default EditProfileImage;
