'use client';

import { useRouter } from 'next/navigation';

export interface DetailModalProps {
  text: string;
  color: string;
  first?: boolean;
  type?: string;
}
const onClickChagneHandler = () => {
  if (inputRef?.current) {
    inputRef.current?.focus();
    setTotalComment((prev) => ({
      ...prev,
      isCommentChange: !prev.isCommentChange,
    }));
  }
};

const firstHandler = async () => {};
const DetailModal = ({ modalArray }: { modalArray: DetailModalProps[] }) => {
  const route = useRouter();
  console.log(modalArray);
  return (
    <article>
      {modalArray.map((modal, index) => (
        <div key={index}>
          <div
            className={`border-t-2 py-3 flex justify-center border-collapse ${modal.color}`}
            onClick={
              modal.first ? () => alert(modal.first) : () => alert(modal.first)
            }
          >
            <span>{modal.text}</span>
          </div>
        </div>
      ))}
    </article>
  );
};
export default DetailModal;
