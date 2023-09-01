'use client';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { profile as baseProfile } from '../../../../public/';
import { useSetRecoilState } from 'recoil';
import { profileImageState } from '@/recoil/authStates';
import { EditImageIcon } from './EditImageIcon';
const EditProfileImage = ({ profileImageUrl }: { profileImageUrl: any }) => {
  const setProfileImage = useSetRecoilState(profileImageState);
  const [profile, setProfile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setProfileImage(profile);
  }, [profile, setProfileImage]);

  const onsetProfileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfile(e.target.files[0]);
    }
  };
  return (
    <section className="flex justify-center items-center">
      <div className="flex relative h-[72px] w-[72px]">
        {profile ? (
          <Image
            className="rounded-full"
            alt="profile"
            src={profileImageUrl ?? URL.createObjectURL(profile)}
            onLoad={() => URL.revokeObjectURL(String(profile))}
            width={72}
            height={72}
            priority
          />
        ) : (
          <Image alt="nonProfile" src={baseProfile} priority={false} />
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
