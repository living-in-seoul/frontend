import Select from '../common/Select';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  dropdown?: boolean;
  noScroll?: boolean;
  onClickToOpenFilter?: () => void;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  onClickToOpenFilter,
  noScroll,
  dropdown,
}: CategoryListProps) => {
  const onSelectHandler = (category: string) => {
    setSelectedCategory(category);
  };
  const onClickHandler = (category: string) => {
    onSelectHandler(category);
    onClickToOpenFilter && onClickToOpenFilter();
  };
  return (
    <div className={`${displayOption(noScroll)}`}>
      {categories.map((category) => (
        <Select
          className="mr-[10px] nowrap"
          key={category}
          title={dropdown ? `🔽 ${category}` : `# ${category}`}
          select={category === selectedCategory}
          onClick={() => onClickHandler(category)}
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
