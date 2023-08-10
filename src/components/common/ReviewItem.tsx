import Image from 'next/image';

interface ReviewItemPorps {
  nickname: string;
  hometown: string;
  title: string;
  desc: string;
  img: string;
}

const ReviewItem = ({
  desc,
  hometown,
  img,
  nickname,
  title,
}: ReviewItemPorps) => {
  return (
    <section className="w-full flex flex-row pb-2 ">
      <div className="w-full flex flex-col py-4 pr-4 overflow-hidden ">
        <div className="flex flex-row gap-2">
          <span className="text-black text-[12px] font-semibold ">
            {nickname}
          </span>
          <p className=" text-zinc-400 text-[10px] font-normal">{hometown}</p>
        </div>
        <span className="text-black text-sm font-semibold truncate ">
          {title}
        </span>
        <span className=" text-zinc-400 text-[10px] font-normal truncate ">
          {desc}
        </span>
      </div>
      <Image
        className="w-20 h-20 bg-white rounded-2xl shadow-md shadow-slate-700"
        alt="good bog"
        src={img}
        width={30000}
        height={30000}
      />
    </section>
  );
};

export default ReviewItem;
