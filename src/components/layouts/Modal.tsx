'use client';

import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);
  return (
    <section className="fixed top-0 -translate-x-1/2 left-1/2 flex flex-col justify-center items-center max-w-md w-screen h-full z-50 bg-neutral-900/70">
      <div className="overflow-y-auto bg-white max-w-7xl w-full ">
        {children}
      </div>
    </section>
  );
};

export default Modal;
