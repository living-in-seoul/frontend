import ModalOutside from '../modal/ModalOutside';
import ModalPortal from '../modal/ModalPortal';

interface ModalArray {
  text: string;
  color: string;
  first: boolean;
  type: string;
}

interface DetailModalProps {
  modalArray: ModalArray[];
  onClickUpperHandler: () => void;
  onClickLowerHandler: () => void;
  setOpenModal: (boolean: boolean) => void;
}

const DetailModal = ({
  modalArray,
  onClickUpperHandler,
  onClickLowerHandler,
  setOpenModal,
}: DetailModalProps) => {
  return (
    <ModalPortal nodeName="detailPortal">
      <ModalOutside
        className=" bg-white shadow-sm bottom-0 w-full"
        onClose={() => {
          setOpenModal(false);
          document.body.style.overflow = 'auto';
        }}
      >
        <article>
          {modalArray.map((modal, index) => (
            <div key={index}>
              <div
                className={`border-t-2 py-3 flex justify-center border-collapse ${modal.color}`}
                onClick={
                  modal.type === 'report'
                    ? modal.first
                      ? () => console.log('hello')
                      : () => console.log('bye')
                    : modal.first
                    ? onClickUpperHandler
                    : onClickLowerHandler
                }
              >
                <span>{modal.text}</span>
              </div>
            </div>
          ))}
        </article>
      </ModalOutside>
    </ModalPortal>
  );
};

export default DetailModal;
