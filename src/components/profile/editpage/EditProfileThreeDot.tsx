import Icons from '@/components/common/Icons';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import { profileOpenModalState } from '@/recoil/authStates';
import { detailColThreeDotIcon } from '@/utils/Icon';
import { useRecoilState } from 'recoil';
import EditFirstModal from './EditFirstModal';

const EditProfileThreeDot = () => {
  const [profileOpenModal, setProfileOpenModal] = useRecoilState(
    profileOpenModalState,
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
            className=" bg-white shadow-sm"
            onClose={() => {
              setProfileOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <EditFirstModal />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  );
};

export default EditProfileThreeDot;
