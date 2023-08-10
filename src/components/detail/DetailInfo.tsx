import Icons from '../common/Icons';
const path = {
  path: 'M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z',
  width: 12,
  height: 12,
};

const DetailInfo = ({ text }: { text: string }) => {
  return (
    <div className="border-b-4 border-zinc-300">
      <div className="flex flex-col  py-5 gap-2 ">
        <div className="flex items-center ">
          <Icons path={path} />
          <span>{text}</span>
        </div>
        <div className="flex items-center ">
          <Icons path={path} />
          <span>{text}</span>
        </div>
        <div className="flex items-center ">
          <Icons path={path} />
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;

{
  /* <div className="border-b-4 border-zinc-300">
          <div className="flex flex-col  py-5 gap-2 ">
            <DetailInfo text="서울특별시 서초구 서초동" />
            <DetailInfo text="매일 11:00 - 23:00" />
            <DetailInfo text="www.hanghae.com" />
          </div>
        </div>
        <div className="border-b-4 border-zinc-300">
          <div className="flex flex-col  py-5 gap-2 ">
            <DetailInfo text="서울특별시 서초구 서초동" />
            <DetailInfo text="매일 11:00 - 23:00" />
            <DetailInfo text="www.hanghae.com" />
          </div>
        </div> */
}
