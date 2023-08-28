'use client';

import { profileSecondOpenModalState } from '@/recoil/authStates';
import { useSetRecoilState } from 'recoil';

export const profileModalArray = [
  { text: '로그아웃', color: 'text-blue-600' },
  { text: '회원탈퇴', color: 'text-red-600' },
];
const EditFirstModal = () => {
  const setProfileSecondOpenModal = useSetRecoilState(
    profileSecondOpenModalState,
  );

  return (
    <article>
      {profileModalArray.map((profile) => (
        <div
          key={profile.text}
          className={`border-t-2 py-3 flex justify-center border-collapse ${profile.color}`}
          onClick={() => {
            setProfileSecondOpenModal(true);
          }}
        >
          <span>{profile.text}</span>
        </div>
      ))}
    </article>
  );
};
export default EditFirstModal;
