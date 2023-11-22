'use client';
import useSWR from 'swr';
import HomePlaceCard from './HomePlaceCard';
import useDrag from '@/hooks/useDrag';

interface HomePlaceComponentProps {
  data: CityData[];
}

const HomePlaceComponent = ({ data }: HomePlaceComponentProps) => {
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
        {data.map((list, index) => (
          <HomePlaceCard list={list} key={list.AREA_NM} />
        ))}
      </div>
    </section>
  );
};
export default HomePlaceComponent;
