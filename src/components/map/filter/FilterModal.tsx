'use client';

import CategoryList from '@/components/common/CategoryList';
import { useState } from 'react';
import FilterModalRadius from '../../common/RangeSlider';

const FilterModal = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [range, setRange] = useState<number>(500);

  return (
    <section className="h-full w-full flex flex-col justify-center items-center py-4 bg-neutral-200 gap-5">
      <h1 className="text-gray-600"></h1>

      <CategoryList
        categories={Filters.map((filter) => filter.name)}
        selectedCategory={selectedFilter}
        setSelectedCategory={(filter) => setSelectedFilter(filter)}
        noScroll
      />
      <FilterModalRadius range={range} setRange={setRange} />
    </section>
  );
};

export default FilterModal;

const Filters = [
  { name: '음식점', category: 'restaurants' },
  { name: '카페', category: 'cafe' },
  { name: '편의점', category: 'convenience_store' },
  { name: '마트', category: 'supermarket' },
  { name: '은행', category: 'bank' },
  { name: '병원', category: 'hospital' },
  { name: '약국', category: 'pharmacy' },
  { name: '헬스장', category: 'gym' },
  { name: '세탁시설', category: 'laundry' },
  { name: '공원', category: 'park' },
  { name: '도서관', category: 'library' },
];

//문화시설, 공공기관, pc방
