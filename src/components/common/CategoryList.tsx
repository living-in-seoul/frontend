import { Dispatch, SetStateAction } from 'react';
import Button from './Category';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  noScroll?: boolean;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  noScroll,
}: CategoryListProps) => {
  const onSelectHandler = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className={`${displayOption(noScroll)}`}>
      {categories.map((category) => (
        <Button
          className="mr-[10px] nowrap"
          key={category}
          title={`# ${category}`}
          select={category === selectedCategory}
          onClick={() => onSelectHandler(category)}
        />
      ))}
    </div>
  );
};
export default CategoryList;

const displayOption = (noScroll: boolean | undefined) => {
  if (noScroll) {
    return 'w-full flex whitespace-nowrap  flex-wrap  items-center gap-1 px-2';
  } else {
    return 'flex whitespace-nowrap scrollbar-hide overflow-x-auto';
  }
};
