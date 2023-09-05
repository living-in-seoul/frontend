import Icons from '@/components/common/Icons';
import { closeX } from '@/utils/Icon';
import DisplayTagItem from './DisplayTagItem';

interface DisplayTags {
  tags: string[];
  onDeleteTag?: (data: string) => void;
}

const DisplayTags = ({ tags, onDeleteTag }: DisplayTags) => {
  return (
    <div className="flex gap-1 w-auto overflow-x-auto scrollbar-hide px-1">
      {tags.map((tag, _) => (
        <DisplayTagItem key={tag} tag={tag} onDeleteTag={onDeleteTag} />
      ))}
    </div>
  );
};

export default DisplayTags;
