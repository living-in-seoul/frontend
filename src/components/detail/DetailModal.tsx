'use client';

import { useRouter } from 'next/navigation';

export interface modalArrayProps {
  text: string;
  color: string;
  first?: boolean;
  type?: string;
}
interface DetailModalProps {
  modalArray: modalArrayProps[];
  onFirstHandler: () => void;
  onSecondHandler: () => void;
}
const DetailModal = ({
  modalArray,
  onFirstHandler,
  onSecondHandler,
}: DetailModalProps) => {
  const route = useRouter();

  return (
    <article>
      {modalArray.map((modal, index) => (
        <div key={index}>
          <div
            className={`border-t-2 py-3 flex justify-center border-collapse ${modal.color}`}
            onClick={modal.first ? onFirstHandler : onSecondHandler}
          >
            <span>{modal.text}</span>
          </div>
        </div>
      ))}
    </article>
  );
};
export default DetailModal;
