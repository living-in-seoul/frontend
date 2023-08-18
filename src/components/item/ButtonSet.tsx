import Button from '../common/Button';

interface ButtonSetProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

const ButtonSet = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: ButtonSetProps) => {
  const onSelectHandler = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex w-4/5 min-w-[200px] flex-wrap h-full justify-center items-center  rounded-xl mx-auto border border-neutral-400 overflow-hidden">
      {categories.map((category) => (
        <div key={category} className="w-[20%]">
          <Button
            className={``}
            size="medium"
            title={category}
            select={category === selectedCategory}
            onClick={() => onSelectHandler(category)}
          />
        </div>
      ))}
    </div>
  );
};

export default ButtonSet;
