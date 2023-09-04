import { SearchIcon } from '@/components/profile/editpage/EditImageIcon';

interface DisplayLiProps {
  predictions: string[];
  keyword?: string;
  onClick: (keyword: string) => void;
}

const DisplayLi = ({ predictions, keyword, onClick }: DisplayLiProps) => {
  return (
    <div>
      {predictions.map((gu, i) => {
        const parts = gu.split(new RegExp(`(${keyword})`, 'gi'));
        return (
          <li
            className=" py-3.5 flex justify-start items-center border-b border-gray5 last:border-[0] cursor-pointer"
            key={i}
            onClick={() => onClick(gu)}
          >
            <div className="mr-2">
              <SearchIcon />
            </div>
            {parts.map((part, index) =>
              part === keyword ? (
                <span key={index} className="font-bold text-darkMint">
                  {part}
                </span>
              ) : (
                <span key={index} className="text-gray3">
                  {part}
                </span>
              ),
            )}
          </li>
        );
      })}
    </div>
  );
};

export default DisplayLi;
