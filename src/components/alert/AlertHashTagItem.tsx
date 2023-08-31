import Select from '../common/Select';

const AlertHashTagItem = () => {
  return (
    <div className="w-full h-32 last:border-none border-b flex-col flex px-4 pb-3 pt-2.5">
      <div className="py-[7px]">
        <Select
          title="#맛집후기"
          size="large"
          className="rounded-md bg-white"
          select
        />
      </div>
      <div className="w-full text-black text-sm font-normal leading-tight">
        그냥 집 옆에 있길래 멀리 가기 귀찮아서 와봤는데 생각 외로 너무
        맛있더라구요 서울 와서 처음으로 먹은 한식이었는데 진짜 너무..
      </div>
      <div className="text-neutral-500 text-xs font-normal leading-tight pt-1">
        20분 전
      </div>
    </div>
  );
};
export default AlertHashTagItem;
