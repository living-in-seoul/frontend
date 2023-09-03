import Icons from '@/components/common/Icons';
import { closeX } from '@/utils/Icon';

interface DisplayTags {
  tags: string[];
  onDeleteTag?: (data: string) => void;
}

const DisplayTags = ({ tags, onDeleteTag }: DisplayTags) => {
  return (
    <div className="flex gap-1 w-auto overflow-x-auto scrollbar-hide px-1">
      {tags.map((tag, _) => (
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
      ))}
    </div>
  );
};

export default DisplayTags;
