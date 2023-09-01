import Button from '@/components/common/Button';
import Icons from '@/components/common/Icons';
import { warning } from '@/utils/Icon';

interface WarningProps {
  mainText: string;
  subText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Warning = ({ mainText, subText, onCancel, onConfirm }: WarningProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="px-2 py-2 bg-neutral-200 rounded-full">
        <Icons
          path={warning}
          option={{
            stroke: '#141414',
            strokeWidth: '7',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
      </div>
      <div>
        <p className="text-lg font-semibold text-black">{mainText}</p>
        <p className="text-neutral-400 text-sm w-full text-center my-1">
          {subText ?? ''}
        </p>
      </div>
      <div className=" flex gap-3 w-full px-5">
        <div className="h-12 w-1/2">
          <Button
            size="full"
            title="아니오"
            bgColor="bg-neutral-200"
            onClick={onCancel}
          />
        </div>
        <div className="h-12 w-1/2">
          <Button
            size="full"
            title="네"
            bgColor="bg-neutral-500"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default Warning;
