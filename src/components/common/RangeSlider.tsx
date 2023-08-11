interface RangeSliderProps {
  range: number;
  setRange: (value: number) => void;
}

const RangeSlider = ({ range, setRange }: RangeSliderProps) => {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(Number(e.target.value));
  };

  return (
    <section>
      <h1 className="text-gray-600">거리</h1>
      <p>{range}</p>
      <input
        type="range"
        min={300}
        max={1500}
        value={range}
        onChange={handleRangeChange}
        className="w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-neutral-600 focus:outline-none focus:ring"
      />
    </section>
  );
};

export default RangeSlider;
