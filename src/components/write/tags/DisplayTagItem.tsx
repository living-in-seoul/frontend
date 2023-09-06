import Icons from '@/components/common/Icons';
import { closeX } from '@/utils/Icon';

interface DisplayTagItemProps {
  tag: string;
  onDeleteTag?: (data: string) => void;
}

const DisplayTagItem = ({ tag, onDeleteTag }: DisplayTagItemProps) => {
  return (
    <div
      className=" flex justify-center items-center rounded-md px-1.5 py-1 gap-1.5 text-xs text-neutral-500 border border-stone-300 whitespace-nowrap"
      key={tag}
      onClick={() => onDeleteTag && onDeleteTag(tag)}
    >
      #{tag}
      {onDeleteTag && (
        <Icons
          path={closeX}
          option={{
            stroke: '#787878',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
      )}
    </div>
  );
};

export default DisplayTagItem;
