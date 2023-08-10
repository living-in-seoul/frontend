import Icons from '../common/Icons';
const demo =
  'M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z';

const DetailInfoItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center ">
      <Icons size={12} path={demo} />
      <span>{text}</span>
    </div>
  );
};

export default DetailInfoItem;
