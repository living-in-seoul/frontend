interface YouthItemProps {
  name: string;
  data: YouthInfo;
  bg: string;
  color: string;
}

const YouthItem = ({ name, data, bg, color }: YouthItemProps) => {
  return (
    <article
      className={` flex flex-col ${bg} h-[178px] w-[288px] text-sm rounded-xl p-5 pb-3 gap-2`}
    >
      <div>
        <span
          className={`${color} py-1 px-3 w-full h-full rounded-2xl text-white`}
        >
          {name}
        </span>
      </div>
      <h1 className="font-semibold text-[1rem] text-neutral-800">
        {data.polyBizSjnm}
      </h1>
      <div className="w-full flex justify-between min-h-[36px]">
        <span className="w-full text-neutral-500 text-[0.8rem] font-normal whitespace-pre-wrap leading-[16px]">
          {data.polyItcnCn}
        </span>
      </div>
      <span className="font-semibold mt-3">{data.bizPrdCn}</span>
    </article>
  );
};

export default YouthItem;
