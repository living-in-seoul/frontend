'use client';

import useDrag from '@/hooks/useDrag';
import YouthItem from './YouthItem';
import { CODES_TYPE } from '@/utils/constants/constants';

interface YouthListProps {
  youthList: YouthInfo[][];
}
const YouthList = ({ youthList }: YouthListProps) => {
  const {
    sliderRef,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    moveX,
  } = useDrag();

  const onClickToUrl = (url: string) => {
    window.location.href = url;
  };

  return (
    <section
      className=" ml-5 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-hide"
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {youthList &&
        youthList.map((data: YouthInfo[], i: number) => {
          return data.map((list: YouthInfo, idx) => (
            <div
              className="cursor-pointer"
              key={i + idx}
              onClick={(e) => {
                if (Math.abs(moveX - e.pageX) > 10) return;
                onClickToUrl(list.rfcSiteUrla1[0]);
              }}
            >
              <YouthItem
                name={CODES_TYPE[i].name}
                bg={CODES_TYPE[i].bg}
                color={CODES_TYPE[i].color}
                data={list}
              ></YouthItem>
            </div>
          ));
        })}
    </section>
  );
};

export default YouthList;
