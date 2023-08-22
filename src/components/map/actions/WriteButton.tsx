import Icons from '@/components/common/Icons';
import { write } from '@/utils/Icon';

const WriteButton = () => {
  return (
    <div className="p-1.5 bg-white rounded-full shadow-2xl hover:cursor-pointer">
      <div>
        <Icons path={write} />
      </div>
    </div>
  );
};

export default WriteButton;
