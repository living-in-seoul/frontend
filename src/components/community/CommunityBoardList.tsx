'use client';
import { useState } from 'react';
import CategoryList from '../common/CategoryList';
import CategoryPostList from './CategoryPostList';
import Link from 'next/link';

interface CommunityBoardProps {
  title: string;
  Category: string[];
  image?: boolean;
}
const CommunityBoardList = ({
  image = false,
  title,
  Category,
}: CommunityBoardProps) => {
  const [selectCategory, setSelectCategory] = useState<string | null>(
    Category[0],
  );
  return (
    <article className="flex flex-col border-b-4">
      <h1 className="p-4 text-lg font-bold">{title}</h1>
      <div className="pl-4">
        <CategoryList
          selectedCategory={selectCategory}
          setSelectedCategory={setSelectCategory}
          categories={[...Category]}
        />
      </div>
      <CategoryPostList selectCategory={selectCategory} image={image} />
      <Link href={'/'} className="self-end mx-1">
        <p className="text-xs font-bold leading-7">{`더보기 >`}</p>
      </Link>
    </article>
  );
};
export default CommunityBoardList;
