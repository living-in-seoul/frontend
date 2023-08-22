import React from 'react';

interface ModalOutsideProps {
  children: React.ReactNode;
  onClose: () => void;
  className: string;
}

const ModalOutside = ({ children, onClose, className }: ModalOutsideProps) => {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/10"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={className}>{children}</div>
    </section>
  );
};

export default ModalOutside;
