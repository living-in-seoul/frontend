'use client';
import useSWR from 'swr';
import HomeLocationCard from './HomeLocationCard';
import { useCallback, useState } from 'react';
import CategoryList from '../common/CategoryList';
import PopCarousel from '../common/PopCarousel';
import axios from 'axios';

const categories = ['여성이 많은', '남성이 많은', '매우 붐빔', '여유 로운'];

const HomePopulation = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useSWR<ResponseCityImageData[]>('/api/board');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0],
  );

  const filterByCategory = useCallback(
    (data: ResponseCityImageData[]): ResponseCityImageData[] => {
      switch (selectedCategory) {
        case '남성이 많은':
          return data.filter((item) => parseFloat(item.MALE_PPLTN_RATE) > 58);
        case '여성이 많은':
          return data.filter((item) => parseFloat(item.FEMALE_PPLTN_RATE) > 58);
        case '매우 붐빔':
          return data.filter((item) => item.AREA_CONGEST_LVL === '붐빔');
        case '여유 로운':
          return data.filter((item) => item.AREA_CONGEST_LVL === '여유');

        default:
          return data;
      }
    },
    [selectedCategory],
  );

  const chunk = (array: ResponseCityImageData[], size: number) => {
    return array.reduce((result, value, index) => {
      const chunkIndex = Math.floor(index / size);

      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }

      result[chunkIndex].push(value);

      return result;
    }, [] as ResponseCityImageData[][]);
  };
  const onClick = async () => {
    await axios.get('https://seoulvival.com:8080/hc', {
      withCredentials: true,
    });
  };
  return (
    <div className="flex flex-col w-full">
      <button className="w-10 h-10" onClick={onClick}>
        asdasdasdasd
      </button>
      <CategoryList
        categories={[...categories]}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {data && (
        <PopCarousel>
          {chunk(filterByCategory(data), 4).map((group, index) => (
            <HomeLocationCard key={index} data={group} />
          ))}
        </PopCarousel>
      )}
    </div>
  );
};
export default HomePopulation;
