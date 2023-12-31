'use client';
import { detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import ModalOutside from '../modal/ModalOutside';
import ModalPortal from '../modal/ModalPortal';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { userClientVerify } from '@/service/clientCommet';

interface ModalArray {
  text: string;
  color: string;
  first: boolean;
  type: string;
}

interface DetailModalProps {
  modalArray: ModalArray[];
  onClickUpperHandler: () => void;
  onClickLowerHandler: () => void;
  openModal: boolean;
  setOpenModal: (boolean: boolean) => void;
}

const DetailModal = ({
  modalArray,
  onClickUpperHandler,
  onClickLowerHandler,
  openModal,
  setOpenModal,
}: DetailModalProps) => {
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const openLoginBottomSheet = () => {
    setBottomSheetState({
      isActive: true,
      type: 'login',
      link: null,
    });
  };

  const openModalHandler = useCallback(async () => {
    const userVerify = await userClientVerify();
    if (userVerify && userVerify.status === 200) {
      return setOpenModal(true);
    }
    openLoginBottomSheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  return (
    <>
      <div className="hover:bg-[#DEFFF7] active:bg-[#ACECDC] rounded-full w-[24px] h-[24px]">
        <Icons
          path={detailColThreeDotIcon}
          fill="#404040"
          onClick={openModalHandler}
        />
      </div>
      {openModal && (
        <ModalPortal nodeName="detailPortal">
          <ModalOutside
            className=" bg-white shadow-sm bottom-0 w-full"
            onClose={() => {
              setOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <article>
              {modalArray.map((modal, index) => (
                <div key={index}>
                  <div
                    className={`hover:text-[#2DDAB0] active:text-[#2DDAB0] border-t-2 py-3 flex justify-center border-collapse ${modal.color}`}
                    onClick={
                      modal.type === 'report'
                        ? modal.first
                          ? () => console.log('hello')
                          : () => console.log('bye')
                        : modal.first
                        ? onClickUpperHandler
                        : onClickLowerHandler
                    }
                  >
                    <span>{modal.text}</span>
                  </div>
                </div>
              ))}
            </article>
          </ModalOutside>
        </ModalPortal>
      )}
    </>
  );
};

export default DetailModal;
