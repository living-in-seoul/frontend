import Icons from '@/components/common/Icons';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import { profileOpenModalState } from '@/recoil/authStates';
import { detailColThreeDotIcon } from '@/utils/Icon';
import { useRecoilState } from 'recoil';
import EditFirstModal, { ModalArrayProps } from './EditFirstModal';
import { useEffect, useState } from 'react';

interface EditProfileThreeDot {
  modalArray: ModalArrayProps[];
}

const EditProfileThreeDot = ({ modalArray }: EditProfileThreeDot) => {
  const [OpenModal, setOpenModal] = useState(false);
  useEffect(() => {
    return setOpenModal(false);
  }, []);
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
              modalArray={modalArray}
              setOpenModal={setOpenModal}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  );
};

export default EditProfileThreeDot;
