interface YouthItemProps {
  name: string;
  data: YouthInfo;
  bg: string;
  color: string;
}
export const ArticleSkeleton = () => {
  return (
    <section className="ml-5 overflow-hidden whitespace-nowrap flex gap-2 scrollbar-hide">
      <article className="skeleton flex flex-col bg-gray-200 h-[178px] min-w-[288px] w-[288px] text-sm rounded-xl p-5 pb-3 gap-2 animate-pulse">
        <div>
          <span className="bg-gray-300 py-1 px-3 w-full h-full rounded-2xl text-white"></span>
        </div>
        <h1 className="font-semibold text-[1rem] text-gray-300 overflow-x-hidden"></h1>
        <div className="w-full flex justify-between min-h-[36px]">
          <span className="w-full text-gray-300 text-[0.8rem] font-normal whitespace-pre-wrap leading-[16px]"></span>
        </div>
        <span className="font-semibold mt-3 bg-gray-300 h-4 w-1/2"></span>
      </article>
      <article className="skeleton flex flex-col bg-gray-200 min-w-[288px] h-[178px] w-[288px] text-sm rounded-xl p-5 pb-3 gap-2 animate-pulse">
        <div>
          <span className="bg-gray-300 py-1 px-3 w-full h-full rounded-2xl text-white"></span>
        </div>
        <h1 className="font-semibold text-[1rem] text-gray-300 overflow-x-hidden"></h1>
        <div className="w-full flex justify-between min-h-[36px]">
          <span className="w-full text-gray-300 text-[0.8rem] font-normal whitespace-pre-wrap leading-[16px]"></span>
        </div>
        <span className="font-semibold mt-3 bg-gray-300 h-4 w-1/2"></span>
      </article>
    </section>
  );
};

const YouthItem = ({ name, data, bg, color }: YouthItemProps) => {
  return (
    <article
      className={` flex flex-col ${bg} h-[178px] w-[288px] text-sm rounded-xl p-5 pb-3 gap-2`}
    >
      <div>
        <span
          className={`${color} py-1 px-3 w-full h-full rounded-2xl text-white `}
        >
          {name}
        </span>
      </div>
      <h1 className="font-semibold text-[1rem] text-neutral-800 overflow-x-hidden">
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
