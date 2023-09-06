'use client';
import Image from 'next/image';
import { profile } from '../../../public';
import { getTimeAgo } from '@/utils/utilFunc';
import { useRouter } from 'next/navigation';

const AlertActiveItem = (item: AlarmItem) => {
  const { id, isRead, registeredAt, text, postId } = item;
  const router = useRouter();
  const fetchRead = async () => {
    const res = await fetch(`/api/alert/${id}`, {
      method: 'POST',
    }).then((res) => res.json());
    return res.message;
  };
  return (
    <div
      className={`w-full px-4 py-3.5 last:border-none h-[90px] ${
        !isRead && 'bg-neutral-200'
      } border-b border-zinc-300 flex items-center cursor-pointer hover:bg-slate-100 active:bg-sky-200 transition-all`}
      onClick={() => {
        router.push(`/detail/${postId}`);
        fetchRead();
      }}
    >
      <div className="flex ">
        <div className="flex items-center justify-center min-w-[40px]">
          <Image
            src={profile}
            alt="유저이미지"
            width={40}
            height={40}
            className="rounded-full bg-zinc-300"
          />
        </div>
        <div className="flex pl-2.5 flex-col">
          <div className="w-full leading-tight">
            <div
              className="text-black text-sm font-normal leading-[0.9]"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
          <div className="w-11 text-neutral-500 text-xs font-normal leading-5">
            {getTimeAgo(registeredAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlertActiveItem;
