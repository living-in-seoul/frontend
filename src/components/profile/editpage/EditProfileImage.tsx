'use client';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { profile as baseProfile } from '../../../../public/';
import { EditImageIcon } from './EditImageIcon';
const EditProfileImage = ({ profileImageUrl }: { profileImageUrl: string }) => {
  const [profile, setProfile] = useState<null | File>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const newData = new FormData();
      profile && newData.append('image', profile);
      await fetch('/api/profile/image', {
        method: 'PUT',
        body: newData,
      });
    };
    fetchImage();
  }, [profile]);

  const onsetProfileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfile(e.target.files[0]);
    }
  };
  return (
    <section className="flex justify-center items-center">
      <div className="flex relative h-[72px] w-[72px]">
        {profileImageUrl && profile ? (
          <Image
            className="rounded-full"
            alt="profile"
            src={profileImageUrl ?? URL.createObjectURL(profile)}
            // 이부분 어떻게 해결할 지 한번 물어보기
            onLoad={() => URL.revokeObjectURL(String(profile))}
            width={72}
            height={72}
            priority={false}
          />
        ) : (
          <Image
            alt="nonProfile"
            src={baseProfile}
            priority={false}
            width={72}
            height={72}
          />
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
