import { useRef, useState } from 'react';

const useDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const slider = sliderRef.current;
    if (!slider) return;
    setIsDragging(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
    setMoveX(e.pageX);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  };

  return {
    sliderRef,
    isDragging,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    moveX,
    setMoveX,
  };
};

export default useDrag;
