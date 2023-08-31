'use client';

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const modalElement = ref.current;
    if (modalElement) {
      // 애니메이션 시작 전 초기 상태를 설정합니다.
      modalElement.classList.add('modal-entering');

      // 애니메이션 시작을 트리거 합니다.
      setTimeout(() => {
        modalElement.classList.remove('modal-entering');
        modalElement.classList.add('modal-opened');
      }, 50); // 약간의 딜레이가 필요합니다.
    }
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);
  return (
    <section
      ref={ref}
      className="fixed top-0 flex flex-col justify-center items-center max-w-md w-screen h-full z-50 bg-neutral-900/70 transition-transform scale-0"
    >
      {/* <div className="">모달적용</div> */}
      <div className="overflow-y-auto bg-white max-w-7xl w-full ">
        {children}
      </div>
    </section>
  );
};

export default Modal;
