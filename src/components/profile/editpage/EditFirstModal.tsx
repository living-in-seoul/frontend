'use client';

import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import { profileSecondOpenModalState } from '@/recoil/authStates';
import { useRecoilState } from 'recoil';
import EditSecondModal from './EditSecondModal';

export const profileModalArray = ['로그아웃', '회원탈퇴'];
const EditFirstModal = () => {
  const [profileSecondOpenModal, setProfileSecondOpenModal] = useRecoilState(
    profileSecondOpenModalState,
  );
  return (
    <article>
      {profileModalArray.map((text) => (
        <div
          key={text}
          className="border-y-2 py-3 flex justify-center"
          onClick={() => setProfileSecondOpenModal(true)}
        >
          <span>{text}</span>
        </div>
      ))}
      {profileSecondOpenModal && (
        <ModalPortal nodeName="portalSignin">
          <ModalOutside
            className=" bg-white shadow-sm"
            onClose={() => {
              setProfileSecondOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <EditSecondModal />
          </ModalOutside>
        </ModalPortal>
      )}
    </article>
  );
};
export default EditFirstModal;
