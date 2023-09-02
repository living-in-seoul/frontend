import Icons from '@/components/common/Icons';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import { detailColThreeDotIcon } from '@/utils/Icon';
import EditFirstModal from './EditFirstModal';
import { useEffect, useState } from 'react';
import {
  commentModalArray,
  detailModalArray,
  profileModalArray,
  reportModalArray,
} from '@/utils/constants/modal';

interface EditProfileThreeDotProps {
  nickname: string;
  type: 'detail' | 'comment' | 'editProfile';
}

const EditProfileThreeDot = ({ nickname, type }: EditProfileThreeDotProps) => {
  const [OpenModal, setOpenModal] = useState(false);
  const userNickname = localStorage.getItem('nickname');
  useEffect(() => {
    return setOpenModal(false);
  }, []);
  const modalArray = () => {
    switch (type) {
      case 'editProfile':
        return profileModalArray;
      case 'comment':
        if (nickname === userNickname) {
          return commentModalArray;
        }
        return reportModalArray;
      case 'detail':
        if (nickname === userNickname) {
          return detailModalArray;
        }
        return reportModalArray;
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <div>
        <Icons
          path={detailColThreeDotIcon}
          fill="#404040"
          onClick={() => setOpenModal(true)}
        />
      </div>
      {OpenModal && (
        <ModalPortal nodeName="portalSignin">
          <ModalOutside
            className=" bg-white shadow-sm bottom-0 w-full"
            onClose={() => {
              setOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <EditFirstModal
              modalArray={modalArray()}
              setOpenModal={setOpenModal}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  );
};

export default EditProfileThreeDot;
