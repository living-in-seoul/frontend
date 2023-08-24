import React from 'react';

interface ModalOutsideProps {
  children: React.ReactNode;
  onClose: () => void;
  className: string;
}

const ModalOutside = ({ children, onClose, className }: ModalOutsideProps) => {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-black opacity-40"
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
