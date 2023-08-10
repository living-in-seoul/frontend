import Icons from '../common/Icons';
import DetailInfoItem from './DetailInfoItem';

const DetailInfo = () => {
  return (
    <div className="border-b-4 border-zinc-300">
      <div className="flex flex-col  py-5 gap-2 ">
        <DetailInfoItem text="서울특별시 서초구 서초동" />
        <DetailInfoItem text="매일 11:00 - 23:00" />
        <DetailInfoItem text="www.hanghae.com" />
      </div>
    </div>
  );
};

export default DetailInfo;
