'use client';

import { useState } from 'react';
import CategoryList from '../common/CategoryList';
import CategoryPostList from './CategoryPostList';
const Category = ['여행', '맛집', '꿀팁'];
interface CommunityBoardProps {
  title: string;
}
const CommunityBoardList = ({ title }: CommunityBoardProps) => {
  const [selectCategory, setSelectCategory] = useState<string | null>(
    Category[0],
  );
  return (
    <article>
      <h1>{title}</h1>
      <CategoryList
        selectedCategory={selectCategory}
        setSelectedCategory={setSelectCategory}
        categories={[...Category]}
      />
      <CategoryPostList selectCategory={selectCategory} />
    </article>
  );
};
export default CommunityBoardList;
