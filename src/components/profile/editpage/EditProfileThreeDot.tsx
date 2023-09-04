'use client';

import Icons from '@/components/common/Icons';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import { detailColThreeDotIcon } from '@/utils/Icon';
import EditFirstModal from './EditFirstModal';
import { useState } from 'react';
import { profileModalArray } from '@/utils/constants/modal';

const EditProfileThreeDot = () => {
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className="flex flex-row gap-4">
      <div>
        <Icons
          path={detailColThreeDotIcon}
          fill="#404040"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      {OpenModal && (
        <ModalPortal nodeName="editPortal">
          <ModalOutside
            className=" bg-white shadow-sm bottom-0 w-full"
            onClose={() => {
              setOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <EditFirstModal
              modalArray={profileModalArray}
              portalId="editPortal"
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  );
};

export default EditProfileThreeDot;
