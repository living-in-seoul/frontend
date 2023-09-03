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
      modalElement.classList.add('modal-entering');

      setTimeout(() => {
        modalElement.classList.remove('modal-entering');
        modalElement.classList.add('modal-opened');
      }, 50);
    }
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);
  return (
    <section
      ref={ref}
      className="fixed top-0 flex flex-col justify-center items-center max-w-md w-screen h-full z-50 bg-neutral-900/70 transition-transform"
    >
      {/* <div className="">모달적용</div> */}
      <div className="overflow-y-auto bg-white max-w-7xl w-full ">
        {children}
      </div>
    </section>
  );
};

export default Modal;
