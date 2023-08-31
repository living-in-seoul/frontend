'use client';

import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
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
  const route = useRouter();

  const logOutHandler = async () => {
    const response = await fetch('/api/user', {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
        route.push('/home');
      }
    });
  };
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
                  mainText="로그아웃하시겠습니까?"
                  onCancel={() => setOnModal(false)}
                  onConfirm={() => logOutHandler()}
                  subText=""
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
