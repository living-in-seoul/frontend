'use client';
import HomeWeekleyItem, { PostSkeleton } from './HomeWeekleyItem';
import useDrag from '@/hooks/useDrag';

interface HomeWeekleyTopFiveSectionProps {
  weekleyTopFivelist: ResponseRegister;
}

const HomeWeekleyTopFiveSection = ({
  weekleyTopFivelist,
}: HomeWeekleyTopFiveSectionProps) => {
  const {
    sliderRef,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    moveX,
  } = useDrag();
  return (
    <article
      className="relative w-full whitespace-nowrap scrollbar-hide overflow-x-auto"
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <ul className="flex gap-4 pl-4">
        {weekleyTopFivelist ? (
          weekleyTopFivelist.result.map((item, index) => (
            <HomeWeekleyItem {...item} key={item.post.postId} />
          ))
        ) : (
          <>게시물이 없습니다</>
        )}
        <PostSkeleton />
      </ul>
    </article>
  );
};
export default HomeWeekleyTopFiveSection;
