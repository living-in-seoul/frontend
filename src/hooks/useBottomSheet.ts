'use client';

import { useEffect, useRef } from 'react';

export const useBottomSheet = (minY: number) => {
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    let isDragging = false;
    const maxY = window.innerHeight - 240;
    const ableToMoveSheet = () => {
      const { touchMove, contentBeingTouched } = metrics.current;

      if (contentBeingTouched) {
        return false;
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

    const handleMouseDown = (e: MouseEvent): void => {
      isDragging = true;
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.clientY;
    };

    const handleDrag = (currentY: number) => {
      const { touchStart, touchMove } = metrics.current;

      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentY) {
        touchMove.movingDirection = 'up';
      }

      if (ableToMoveSheet()) {
        const diff = currentY - touchStart.sheetY;
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

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleDrag(e.touches[0].clientY);
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;
      e.preventDefault();
      handleDrag(e.clientY);
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
    const handleMouseUp = (e: MouseEvent): void => {
      if (!isDragging) return;
      document.body.style.overflowY = 'auto';
      const { touchStart, touchMove } = metrics.current;

      const currentSheetY = sheet.current!.getBoundingClientRect().y;
      const draggedDistance = touchStart.touchY - e.clientY; // MouseEvent의 경우 e.clientY 사용

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
      isDragging = false;

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
      sheet.current!.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if (sheet.current) {
        sheet.current!.removeEventListener('touchstart', handleTouchStart);
        sheet.current!.removeEventListener('touchmove', handleTouchMove);
        sheet.current!.removeEventListener('touchend', handleTouchEnd);
        sheet.current!.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [minY]);

  useEffect(() => {
    const handleTouchStartContent = (e: TouchEvent) => {
      if (content.current?.contains(e.target as Node)) {
        metrics.current.contentBeingTouched = true;
      }
    };

    const handleTouchMoveContent = (e: TouchEvent) => {
      if (content.current?.contains(e.target as Node)) {
        metrics.current.contentBeingTouched = true;
      }
    };
    const handleTouchEndContent = (e: TouchEvent) => {
      metrics.current.contentBeingTouched = false;
    };

    content.current!.addEventListener('touchend', handleTouchEndContent);
    content.current!.addEventListener('touchmove', handleTouchMoveContent);
    content.current!.addEventListener('touchstart', handleTouchStartContent);
  }, []);

  return { sheet, content };
};
