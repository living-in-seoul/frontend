import Icons from '../common/Icons';
const demo =
  'M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z';

const DetailInfoItem = ({ text }: { text: string }) => {
  const path = {
    path: 'M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z',
    width: 12,
    height: 12,
  };

  return (
    <div className="flex items-center ">
      <Icons path={path} />
      <span>{text}</span>
    </div>
  );
};

export default DetailInfoItem;

// as 이놈의 타입을 이걸로 생각해 result as unkown as Place[] 리절트 타입을 언노운이라 생각해 그리고 그 언노운은 플레이스야 다른건 없오
