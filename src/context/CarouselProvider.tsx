'use client';
import { Children, ReactNode, useEffect, useState } from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
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

const responsivelist: ResponsiveType = {
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
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

interface CaroucelProp {
  children: ReactNode;
  type?: 'carousel' | 'list';
}
const Dots = ({ totalItems, activeSlide }: any) => {
  return (
    <div className="flex w-full p-5 pt-[30px] justify-center">
      <div className="relative flex bg-zinc-100 w-[100px] rounded-3xl overflow-hidden">
        <div // 검은색 dot
          className={`w-[33.3px] h-[7px] rounded-3xl bg-emerald-200`}
          style={{
            left: `${activeSlide === 0 ? 0 : activeSlide * 33}px`,
            transition: 'left 0.2s ease-in-out',
            position: 'relative',
            top: '0',
          }}
        />
      </div>
    </div>
  );
};
const CarouselProvider = ({ children, type = 'carousel' }: CaroucelProp) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div>
      <Carousel
        arrows={true}
        removeArrowOnDeviceType={'mobile'}
        responsive={type === 'list' ? responsivelist : responsive}
        beforeChange={(currentSlide) => setActiveSlide(currentSlide)}
      >
        {children}
      </Carousel>
      {type === 'carousel' && <Dots totalItems={3} activeSlide={activeSlide} />}
    </div>
  );
};
export default CarouselProvider;
