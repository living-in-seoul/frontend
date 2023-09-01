'use client';
import useSWR from 'swr';
import HomePlaceCard from './HomePlaceCard';
import useDrag from '@/hooks/useDrag';

const HomePlaceComponent = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useSWR<ResponseCityImageData[]>('/api/home/place');

  console.log(data);
  const {
    sliderRef,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    moveX,
  } = useDrag();
  return (
    <section
      className=" ml-5 overflow-x-auto  whitespace-nowrap flex gap-2 scrollbar-hide"
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className="flex w-full h-52 px-3.5 py-2 gap-3.5">
        {data &&
          data.map((list, index) => (
            <HomePlaceCard list={list} key={list.AREA_NM} />
          ))}
      </div>
    </section>
  );
};
export default HomePlaceComponent;
