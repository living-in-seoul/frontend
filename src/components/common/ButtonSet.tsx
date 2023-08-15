import Button from './Category';

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
  const onClickHandler = (category: string) => {
    onSelectHandler(category);
  };

  return (
    <div className="gap-0 justify-center items-center marker:w-3/4 ">
      {categories.map((category) => (
        <Button
          className="mr-[10px] nowrap"
          key={category}
          title={category}
          select={category === selectedCategory}
          onClick={() => onClickHandler(category)}
        />
      ))}
    </div>
  );
};

export default ButtonSet;
