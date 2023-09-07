'use client';
import Image, { StaticImageData } from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { profile as baseProfile } from '../../../../public/';
import { EditImageIcon } from './EditImageIcon';
import BeatLoader from '@/components/common/Spinner';
import { Toaster, toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import dynamic from 'next/dynamic';
import ModalPortal from '@/components/modal/ModalPortal';
import ModalOutside from '@/components/modal/ModalOutside';
const DynamicWarning = dynamic(
  () => import('@/components/write/modal/Warning'),
  {
    ssr: false,
  },
);

const EditProfileImage = ({ profileImageUrl }: { profileImageUrl: string }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [onModal, setOnModal] = useState<boolean>(false);
  const [profile, setProfile] = useState<string | StaticImageData>(
    profileImageUrl ?? baseProfile,
  );
  const [upLodaedProfile, setUpLodaedProfile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { mutate } = useSWRConfig();

  const onsetProfileHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const uploadedProfile = e.target.files[0];
        setUpLodaedProfile(uploadedProfile);
      }
      setOnModal(true);
    },
    [],
  );

  const fetchImage = useCallback(async () => {
    setLoading(true);
    const newData = new FormData();
    upLodaedProfile && newData.append('image', upLodaedProfile);
    const tokenValidResponse = await fetch('/api/user', {
      method: 'GET',
    });
    if (tokenValidResponse.status === 200) {
      await fetch('/api/profile/image', {
        method: 'PUT',
        body: newData,
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === 400 || response.status === 403) {
            toast.error('이미지 변경 실패');
            return setUpLodaedProfile(null);
          }
          toast.success('이미지 변경 성공');
          mutate('/api/profile');
        })

        .finally(() => {
          setLoading(false);
          setOnModal(false);
        });
    }
  }, [mutate, upLodaedProfile]);

  return (
    <section className="flex justify-center items-center">
      <Toaster />
      {isLoading ? (
        <BeatLoader />
      ) : (
        <div className="flex relative h-[72px] w-[72px]">
          {upLodaedProfile ? (
            <Image
              className="rounded-full"
              alt="profile"
              src={URL.createObjectURL(upLodaedProfile)}
              width={72}
              height={72}
              priority={false}
            />
          ) : (
            <Image
              className="rounded-full"
              alt="nonProfile"
              src={profile}
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
      )}
      {onModal && (
        <ModalPortal nodeName="editPortal">
          <ModalOutside
            className="max-w-md scroll overflow-hidden bg-white w-4/5 px-10 rounded-lg shadow-sm py-10"
            onClose={() => {
              setOnModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <DynamicWarning
              mainText="사진을 등록하시겠습니까?"
              onCancel={() => {
                setOnModal(false);
                setUpLodaedProfile(null);
              }}
              onConfirm={fetchImage}
              subText="이전 이미지는 삭제됩니다"
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  );
};

export default EditProfileImage;
