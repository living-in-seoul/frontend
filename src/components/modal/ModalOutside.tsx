import React from 'react';

interface ModalOutsideProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalOutside = ({ children, onClose }: ModalOutsideProps) => {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/40"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="overflow-hidden p-2 bg-white w-4/5 h-1/4 rounded-2xl max-w-7xl">
        {children}
      </div>
    </section>
  );
};

export default ModalOutside;
