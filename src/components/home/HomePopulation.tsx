'use client';
import useSWR from 'swr';
import HomeLocationCard from './HomeLocationCard';
import HomePopCarousel from './HomePopCarousel';
import { useCallback, useState } from 'react';
import CategoryList from '../common/CategoryList';

const categories = ['여성이 많은', '남성이 많은', '매우 붐빔', '여유 로운'];

const HomePopulation = () => {
  const { data, isLoading: loading, error } = useSWR<CityData[]>('/api/board');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0],
  );

  const filterByCategory = useCallback(
    (data: CityData[]): CityData[] => {
      switch (selectedCategory) {
        case '남성이 많은':
          return data.filter(
            (item) =>
              parseFloat(item.MALE_PPLTN_RATE) >
              parseFloat(item.FEMALE_PPLTN_RATE),
          );
        case '여성이 많은':
          return data.filter(
            (item) =>
              parseFloat(item.MALE_PPLTN_RATE) <
              parseFloat(item.FEMALE_PPLTN_RATE),
          );
        case '매우 붐빔':
          return data.filter((item) => item.AREA_CONGEST_LVL === '매우 붐빔');
        case '여유 로운':
          return data.filter((item) => item.AREA_CONGEST_LVL === '여유');

        default:
          return data;
      }
    },
    [selectedCategory],
  );

  const chunk = (array: CityData[], size: number) => {
    return array.reduce((result, value, index) => {
      const chunkIndex = Math.floor(index / size);

      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }

      result[chunkIndex].push(value);

      return result;
    }, [] as CityData[][]);
  };

  return (
    <div className="flex flex-col w-full">
      <CategoryList
        categories={[...categories]}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {data && (
        <HomePopCarousel>
          {chunk(filterByCategory(data), 4).map((group, index) => (
            <HomeLocationCard key={index} data={group} />
          ))}
        </HomePopCarousel>
      )}
    </div>
  );
};
export default HomePopulation;