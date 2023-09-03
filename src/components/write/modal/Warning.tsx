import Button from '@/components/common/Button';
import Icons from '@/components/common/Icons';
import { warning } from '@/utils/Icon';

interface WarningProps {
  mainText: string;
  boldText?: string;
  subText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Warning = ({
  mainText,
  subText,
  boldText,
  onCancel,
  onConfirm,
}: WarningProps) => {
  const parts = mainText.split(new RegExp(`(${boldText})`, 'g'));

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="px-2 py-2 bg-lightestMint rounded-full">
        <Icons
          path={warning}
          option={{
            stroke: '#2DDAB0',
            strokeWidth: '7',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
      </div>
      <div>
        {parts.map((part, index) =>
          part === boldText ? (
            <span key={index} className="font-bold">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
        <p className="text-neutral-400 text-sm w-full text-center my-1">
          {subText ?? ''}
        </p>
      </div>
      <div className=" flex gap-3 w-full px-4">
        <div className="h-[58px] w-1/2">
          <Button
            size="full"
            title="아니오"
            bgColor="bg-lightMint"
            textColor="text-white"
            onClick={onCancel}
          />
        </div>
        <div className="h-[58px] w-1/2">
          <Button
            size="full"
            title="네"
            bgColor="bg-primary"
            textColor="text-white"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default Warning;
