'use client';
import { back } from '@/utils/Icon';
import Icons from '../common/Icons';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';

const WriteHeader = () => {
  const router = useRouter();
  const onClickToBack = () => {
    router.back();
  };
  return (
    <div className="h-16  w-full flex justify-between items-center px-6">
      <div className="flex items-center gap-5">
        {<Icons path={back} onClick={onClickToBack} />}
        <span className="text-[1.1rem] font-semibold">글 작성하기</span>
      </div>
      <div className="w-20 h-8 text-white">
        <Button title="등록하기" size="full" bgColor="bg-neutral-800" />
      </div>
    </div>
  );
};

export default WriteHeader;
