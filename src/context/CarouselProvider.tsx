'use client';
import { Children, ReactNode, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface CaroucelProp {
  children: ReactNode;
}
const Dots = ({ totalItems, activeSlide }: any) => {
  return (
    <div className="flex w-full p-5 pt-[30px] justify-center">
      <div className="relative flex bg-zinc-100 w-[100px] rounded-3xl overflow-hidden">
        <div // 검은색 dot
          className={`w-[25px] h-[7px] rounded-3xl bg-zinc-300`}
          style={{
            left: `${activeSlide === 0 ? 0 : activeSlide * 25}px`,
            transition: 'left 0.2s ease-in-out',
            position: 'relative',
            top: '0',
          }}
        />
      </div>
    </div>
  );
};
const CarouselProvider = ({ children }: CaroucelProp) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div>
      <Carousel
        arrows={false}
        customButtonGroup={<></>}
        responsive={responsive}
        beforeChange={(currentSlide) => setActiveSlide(currentSlide)}
      >
        {children}
      </Carousel>
      <Dots totalItems={4} activeSlide={activeSlide} />
    </div>
  );
};
export default CarouselProvider;
