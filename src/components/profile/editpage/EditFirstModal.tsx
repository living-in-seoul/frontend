'use client';

import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  portalId,
}: {
  modalArray: ModalArrayProps[];
  portalId: string;
}) => {
  const [DeleteModal, setDeleteOnModal] = useState<boolean>(false);
  const [SignoutModal, setSignoutOnModal] = useState<boolean>(false);
  const route = useRouter();

  const logOutHandler = async () => {
    await fetch('/api/user', {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('nickname');
        route.push('/home');
      }
    });
  };
  const deleteHandler = async () => {
    await fetch('/api/signup', {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('nickname');
        route.push('/home');
      }
    });
  };

  return (
    <article>
      <div>
        <div
          className={`border-t-2 py-3 flex justify-center border-collapse text-blue-600`}
          onClick={() => setSignoutOnModal(true)}
        >
          <span>{modalArray[0].text}</span>
        </div>
        {SignoutModal && (
          <ModalPortal nodeName={portalId}>
            <ModalOutside
              className="max-w-md scroll overflow-hidden bg-white w-4/5 px-10 rounded-lg shadow-sm py-10"
              onClose={() => {
                setSignoutOnModal(false);
                document.body.style.overflow = 'auto';
              }}
            >
              <DynamicWarning
                mainText="로그아웃하시겠습니까?"
                onCancel={() => setSignoutOnModal(false)}
                onConfirm={logOutHandler}
                subText=""
              />
            </ModalOutside>
          </ModalPortal>
        )}
      </div>
      <div>
        <div
          className={`border-t-2 py-3 flex justify-center border-collapse text-red-600`}
          onClick={() => setDeleteOnModal(true)}
        >
          <span>{modalArray[1].text}</span>
        </div>
        {DeleteModal && (
          <ModalPortal nodeName={portalId}>
            <ModalOutside
              className="max-w-md scroll overflow-hidden bg-white w-4/5 px-10 rounded-lg shadow-sm py-10"
              onClose={() => {
                setDeleteOnModal(false);
                document.body.style.overflow = 'auto';
              }}
            >
              <DynamicWarning
                mainText="정말 탈퇴하시겠습니까??"
                onCancel={() => setDeleteOnModal(false)}
                onConfirm={deleteHandler}
                subText="계정은 삭제되며 복구되지 않습니다"
              />
            </ModalOutside>
          </ModalPortal>
        )}
      </div>
    </article>
  );
};
export default EditFirstModal;
