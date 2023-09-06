'use client';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  useOutsideClick(ref, () => {
    onClose();
  });
  useEffect(() => {
    const modalElement = ref.current;
    if (modalElement) {
      modalElement.classList.add('modal-entering');
      scrollY.current = window.scrollY;
      setTimeout(() => {
        modalElement.classList.remove('modal-entering');
        modalElement.classList.add('modal-opened');
      }, 50);
    }
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
      window.scrollTo(0, scrollY.current);
    };
  }, []);
  return (
    <section className="fixed top-0 flex flex-col justify-center items-center max-w-md w-screen h-full z-50 bg-neutral-900/70 transition-transform">
      {/* <div className="">모달적용</div> */}

      <div className="overflow-y-auto max-w-7xl" ref={ref}>
        {children}
      </div>
    </section>
  );
};

export default Modal;
