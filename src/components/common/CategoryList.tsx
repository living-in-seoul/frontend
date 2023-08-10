import { Dispatch, SetStateAction } from 'react';
import Button from './Category';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) => {
  const onSelectHandler = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className="flex whitespace-nowrap scrollbar-hide overflow-x-auto">
      {categories.map((category) => (
        <Button
          className="mr-[10px] nowrap"
          key={category}
          title={`#${category}`}
          select={category === selectedCategory}
          onClick={() => onSelectHandler(category)}
        />
      ))}
    </div>
  );
};
export default CategoryList;
