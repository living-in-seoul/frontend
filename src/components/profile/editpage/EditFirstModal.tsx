'use client';

import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
const DynamicWarning = dynamic(
  () => import('@/components/write/modal/Warning'),
  {
    ssr: false,
  },
);

export interface ModalArrayProps {
  text: string;
  color: string;
}

const EditFirstModal = ({
  modalArray,
  setOpenModal,
}: {
  modalArray: ModalArrayProps[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [onModal, setOnModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <article>
      {modalArray.map((profile, index) => (
        <div key={index}>
          <div
            className={`border-t-2 py-3 flex justify-center border-collapse ${profile.color}`}
            onClick={() => {
              startTransition(() => {
                setOnModal(true);
              });
            }}
          >
            <span>{profile.text}</span>
          </div>
          {onModal && (
            <ModalPortal nodeName="portalSignin2">
              <ModalOutside
                className="max-w-md scroll overflow-hidden bg-white w-4/5 px-10 rounded-lg shadow-sm py-10"
                onClose={() => {
                  setOnModal(false);
                  document.body.style.overflow = 'auto';
                }}
              >
                <DynamicWarning
                  mainText="ggg"
                  onCancel={() => console.log('hi')}
                  onConfirm={() => console.log('bye')}
                  subText="zzzz"
                />
              </ModalOutside>
            </ModalPortal>
          )}
        </div>
      ))}
    </article>
  );
};
export default EditFirstModal;
