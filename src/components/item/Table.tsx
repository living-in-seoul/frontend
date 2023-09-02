import Button from '../common/Button';
import { useState } from 'react';
interface TableProps {
  column: number;
  row: number;
  width: string;
  height: string;
  label: string;
  categories: string[];
  selectedCategory: string;
  onSelectHandler: (category: string) => void;
}

const Table = ({
  column,
  row,
  width,
  height,
  categories,
  selectedCategory,
  label,
  onSelectHandler,
}: TableProps) => {
  const [openTable, setOpenTable] = useState(false);
  const totalCellNumber = column * row;
  const emptiedCellNumber = totalCellNumber - categories.length;
  const emptoedCellArray = Array.from({ length: emptiedCellNumber }, () => '');
  const totalArray = [...categories, ...emptoedCellArray];
  return (
    <div className="flex flex-col gap-3">
      <label className="text-neutral-500 text-sm ">{label}</label>
      {openTable ? (
        <div
          className={`flex ${width} min-w-[200px] ${height} flex-wrap justify-center items-center  rounded-xl mx-auto border overflow-hidden`}
        >
          {totalArray.map((cell, index) => (
            <div
              className={`flex items-center justify-center w-1/2 h-1/2 border`}
              key={index}
            >
              <Button
                type="button"
                className={``}
                size="full"
                title={cell}
                select={cell === selectedCategory}
                onClick={() => onSelectHandler(cell)}
                hoverColor="bg-teal-400"
                isRounded={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => setOpenTable((prev) => !prev)}
          className="w-full h-12 text-base border border-zinc-400 rounded-xl px-4 outline-teal-400 flex items-center "
        >
          <span>~6개월</span>
        </div>
      )}
    </div>
  );
};

export default Table;
