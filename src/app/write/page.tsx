'use client';

import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import ChooseLocation from '@/components/write/ChooseLocation';
import UploadImageModal from '@/components/write/UploadImageModal';
import WriteContent from '@/components/write/WriteContent';
import WriteHeader from '@/components/write/WriteHeader';
import { ImagePortalState, MapPortalState } from '@/recoil/BoardStates';
import { useRecoilState } from 'recoil';

const WritePage = () => {
  const [openImagePortal, setOpenImagePortal] =
    useRecoilState(ImagePortalState);
  const [openMapPortal, setOpenMapPortal] = useRecoilState(MapPortalState);

  return (
    <section className="relative">
      <WriteHeader />
      <WriteContent />
      {openImagePortal && (
        <ModalPortal nodeName="imagePortal">
          <ModalOutside
            className="overflow-hidden p-2 bg-white w-4/5 h-1/4 rounded-2xl max-w-7xl"
            onClose={() => setOpenImagePortal(false)}
          >
            <UploadImageModal onClose={() => setOpenImagePortal(false)} />
          </ModalOutside>
        </ModalPortal>
      )}
      {openMapPortal && (
        <ModalPortal nodeName="mapPortal">
          <ChooseLocation onClose={() => setOpenMapPortal(false)} />
        </ModalPortal>
      )}
    </section>
  );
};

export default WritePage;
