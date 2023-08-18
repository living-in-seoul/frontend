'use client';

import { useEffect, useRef } from 'react';

export const useBottomSheet = (minY: number) => {
  const sheet = useRef<HTMLDivElement>(null); //바텀 시트 영역
  const content = useRef<HTMLDivElement>(null); // 컨텐츠 영역
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    contentBeingTouched: false,
  });

  const breakpoints = {};

  useEffect(() => {
    const maxY = window.innerHeight - 160;
    const ableToMoveSheet = () => {
      const { touchMove, contentBeingTouched } = metrics.current;

      if (!contentBeingTouched) {
        return true;
      }

      if (sheet.current!.getBoundingClientRect().y !== minY) {
        return true;
      }

      if (touchMove.movingDirection === 'down') {
        return content.current!.scrollTop <= 0;
      }
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouching = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }
      if (touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouching.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentTouching.clientY) {
        touchMove.movingDirection = 'up';
      }

      if (ableToMoveSheet()) {
        e.preventDefault();

        const diff = currentTouching.clientY - touchStart.sheetY;
        let nextMoveY = touchStart.sheetY + diff;

        if (nextMoveY <= minY) {
          nextMoveY = minY;
        }

        if (nextMoveY >= maxY) {
          nextMoveY = maxY;
        }

        sheet.current!.style.setProperty(
          'transform',
          `translateY(${nextMoveY - maxY}px)`,
        );
      } else {
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';
      const { touchStart, touchMove } = metrics.current;

      const currentSheetY = sheet.current!.getBoundingClientRect().y;
      const draggedDistance = touchStart.touchY - e.changedTouches[0].clientY;

      if (draggedDistance > 50) {
        sheet.current!.style.setProperty(
          'transform',
          `translateY(${minY - maxY}px)`,
        );
      } else {
        if (currentSheetY !== minY) {
          if (touchMove.movingDirection === 'down') {
            sheet.current!.style.setProperty('transform', 'translateY(0)');
          }

          if (touchMove.movingDirection === 'up') {
            sheet.current!.style.setProperty(
              'transform',
              `translateY(${minY - maxY})`,
            );
          }
        }
      }

      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        contentBeingTouched: false,
      };
    };
    if (sheet.current) {
      sheet.current!.addEventListener('touchstart', handleTouchStart);
      sheet.current!.addEventListener('touchmove', handleTouchMove);
      sheet.current!.addEventListener('touchend', handleTouchEnd);
    }
  }, [minY]);

  useEffect(() => {
    const handleTouchStartContent = (e: TouchEvent) => {
      if (e.target === content.current) {
        metrics.current!.contentBeingTouched = true;
      }
    };
    content.current!.addEventListener('touchstart', handleTouchStartContent);
  }, []);

  return { sheet, content };
};
