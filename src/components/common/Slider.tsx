interface RangeSliderProps {
  range: number;
  setRange: (value: number) => void;
}

const Slider = ({ range, setRange }: RangeSliderProps) => {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(Number(e.target.value));
  };

  return (
    <div>
      <h1 className="text-gray-600">거리</h1>
      <p>{range}</p>
      <input
        type="range"
        min={100}
        max={1000}
        value={range}
        onChange={handleRangeChange}
        className="w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-neutral-600 focus:outline-none focus:ring"
      />
    </div>
  );
};

export default Slider;
