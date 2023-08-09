import Icons from '../common/Icons';

const demo =
  'M7.5 0C3.35742 0 0 3.35742 0 7.5C0 11.6426 3.35742 15 7.5 15C11.6426 15 15 11.6426 15 7.5C15 3.35742 11.6426 0 7.5 0ZM7.5 13.749C4.04883 13.749 1.25098 10.9512 1.25098 7.5C1.25098 4.04883 4.04883 1.25098 7.5 1.25098C10.9512 1.25098 13.749 4.04883 13.749 7.5C13.749 10.9512 10.9512 13.749 7.5 13.749ZM8.12402 2.49902H6.87305V8.12402H11.25V6.87305H8.12402V2.49902Z';

const DetailInfo = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center ">
      <Icons size={32} path={demo} />
      <span>{text}</span>
    </div>
  );
};

export default DetailInfo;
