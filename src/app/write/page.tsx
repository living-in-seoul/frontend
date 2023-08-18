'use client';

import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import UploadImageModal from '@/components/write/UploadImageModal';
import WriteContent from '@/components/write/WriteContent';
import WriteHeader from '@/components/write/WriteHeader';
import { ImagePortalState } from '@/recoil/BoardStates';
import { useRecoilState } from 'recoil';

const WritePage = () => {
  const [openImagePortal, setOpenImagePortal] =
    useRecoilState(ImagePortalState);

  return (
    <section className="relative">
      <WriteHeader />
      <WriteContent />
      {openImagePortal && (
        <ModalPortal nodeName="imagePortal">
          <ModalOutside onClose={() => setOpenImagePortal(false)}>
            <UploadImageModal onClose={() => setOpenImagePortal(false)} />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  );
};

export default WritePage;
