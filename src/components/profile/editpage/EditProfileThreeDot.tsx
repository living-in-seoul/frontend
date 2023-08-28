import Icons from '@/components/common/Icons';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import {
  profileOpenModalState,
  profileSecondOpenModalState,
} from '@/recoil/authStates';
import { detailColThreeDotIcon } from '@/utils/Icon';
import { useRecoilState } from 'recoil';
import EditFirstModal from './EditFirstModal';
import EditSecondModal from './EditSecondModal';

const EditProfileThreeDot = () => {
  const [profileOpenModal, setProfileOpenModal] = useRecoilState(
    profileOpenModalState,
  );
  const [profileSecondOpenModal, setProfileSecondOpenModal] = useRecoilState(
    profileSecondOpenModalState,
  );
  return (
    <div className="flex flex-row gap-4">
      <div>
        <Icons
          path={detailColThreeDotIcon}
          fill="#404040"
          onClick={() => setProfileOpenModal(true)}
        />
      </div>
      {profileOpenModal && (
        <ModalPortal nodeName="portalSignin">
          <ModalOutside
            className=" bg-white shadow-sm bottom-0 w-full"
            onClose={() => {
              setProfileOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <EditFirstModal />
          </ModalOutside>
        </ModalPortal>
      )}
      {profileSecondOpenModal && (
        <ModalPortal nodeName="portalSignin2">
          <ModalOutside
            className="max-w-md scroll overflow-hidden bg-white w-4/5 px-10 rounded-lg shadow-sm py-10"
            onClose={() => {
              setProfileSecondOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <EditSecondModal />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  );
};

export default EditProfileThreeDot;
