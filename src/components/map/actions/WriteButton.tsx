import Icons from '@/components/common/Icons';
import { write } from '@/utils/Icon';

const WriteButton = () => {
  return (
    <div className="p-2 bg-white rounded-full shadow-3xl hover:cursor-pointer">
      <Icons path={write} />
    </div>
  );
};

export default WriteButton;
