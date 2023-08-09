import { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface HomePopCarouselProp {
  children: ReactNode;
}

const HomePopCarousel = (props: HomePopCarouselProp) => {
  const { children } = props;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2, // Carousel에서 한 번에 2개의 아이템을 보여주도록 설정
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
    // 다른 반응형 설정 생략
  };

  return (
    <Carousel showDots infinite responsive={responsive}>
      {children}
    </Carousel>
  );
};
export default HomePopCarousel;
