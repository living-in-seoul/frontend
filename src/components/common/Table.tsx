import Button from './Button';

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
  const totalCellNumber = column * row;
  const emptiedCellNumber = totalCellNumber - categories.length;
  const emptoedCellArray = Array.from({ length: emptiedCellNumber }, () => '');
  const totalArray = categories.concat(emptoedCellArray);
  return (
    <div className="flex flex-col gap-3">
      <label className="text-neutral-500 ">{label}</label>
      <div
        className={`flex ${width} min-w-[200px] ${height} flex-wrap justify-center items-center  rounded-xl mx-auto border overflow-hidden`}
      >
        {totalArray.map((cell, index) => (
          <div
            className={`flex items-center justify-center w-1/${row} h-1/${column} border`}
            key={index}
          >
            <Button
              type="button"
              className={``}
              size="w-full"
              title={cell}
              select={cell === selectedCategory}
              onClick={() => onSelectHandler(cell)}
              hoverColor="bg-teal-400"
              isRounded={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
