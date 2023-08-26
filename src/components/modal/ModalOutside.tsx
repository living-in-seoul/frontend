interface ModalOutsideProps {
  children: React.ReactNode;
  onClose: () => void;
  className: string;
  profile?: boolean;
}

// const getMdalStyles = (profile: boolean) => {
//   const style = profile ? : "fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-10 bg-black opacity-40"
// }

const ModalOutside = ({
  children,
  onClose,
  className,
  profile = false,
}: ModalOutsideProps) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full ">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-40"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      ></div>
      <div className={`absolute bg-white ${className}`}>{children}</div>
    </div>
  );
};
export default ModalOutside;
