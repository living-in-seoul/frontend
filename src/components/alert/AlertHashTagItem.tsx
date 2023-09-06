import { getTimeAgo } from '@/utils/utilFunc';
import Select from '../common/Select';

interface AleartHashTagItemProps {
  item: AlarmItem;
}
const AlertHashTagItem = ({ item }: AleartHashTagItemProps) => {
  return (
    <div className="w-full h-32 last:border-none border-b flex-col flex px-4 pb-3 pt-2.5">
      <div className="py-[7px]">
        <Select
          title={item.hashTagName}
          size="large"
          className="rounded-md bg-white"
          select
        />
      </div>
      <div className="w-full text-black text-sm font-normal leading-tight">
        {item.text}
      </div>
      <div className="text-neutral-500 text-xs font-normal leading-tight pt-1">
        {getTimeAgo(item.registeredAt)}
      </div>
    </div>
  );
};
export default AlertHashTagItem;
