'use client';
import useSWR from 'swr';
import { CODES_TYPE } from '@/utils/constants/constants';
import YouthItem from './YouthItem';
import useDrag from '@/hooks/useDrag';

const Youth = () => {
  const { data: youthList } = useSWR<YouthInfo[][]>(`/api/youth`, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    suspense: true,
  });
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
      className=" ml-5 overflow-x-auto  whitespace-nowrap flex gap-2 scrollbar-hide"
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
                if (Math.abs(moveX - e.pageX) > 10) return; // 추가: 클릭 이벤트 내에서도 체크
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
  return;
};

export default Youth;
