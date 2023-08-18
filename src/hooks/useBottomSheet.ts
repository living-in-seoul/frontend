'use client';

import { useEffect, useRef } from 'react';

export const useBottomSheet = (minY: number) => {
  const sheet = useRef<HTMLDivElement>(null); //바텀 시트 영역
  const content = useRef<HTMLDivElement>(null); // 컨텐츠 영역
  const metrics = useRef<BottomSheetMetrics>({
    // 초기 세팅
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

  //바텀시트 동작 제어 effect
  useEffect(() => {
    const maxY = window.innerHeight - 160;
    //바텀시트가 움직일 수 있는 경우
    const ableToMoveSheet = () => {
      const { touchMove, contentBeingTouched } = metrics.current;

      if (!contentBeingTouched) {
        return true;
      }

      if (sheet.current!.getBoundingClientRect().y !== minY) {
        return true;
      }

      //컨텐츠 리스트 쭉 올리는데 아이템이 없을 경우 바텀시트가 내려가게 함
      if (touchMove.movingDirection === 'down') {
        return content.current!.scrollTop <= 0; //boolean
      }
      return false; //아니면 움직일 수 없음
    };

    //바텀시트 터치 시작 함수
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      //현재 시트 y 위치 담기
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      // 터치한 곳의 좌표 담기
      touchStart.touchY = e.touches[0].clientY;
    };

    //바텀 시트 드래그 함수
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
        let nextMoveY = touchStart.sheetY + diff; //드래그한 만큼 움직임

        if (nextMoveY <= minY) {
          nextMoveY = minY;
        }

        if (nextMoveY >= maxY) {
          nextMoveY = maxY;
        }

        sheet.current!.style.setProperty(
          'transform',
          `translateY(${nextMoveY - maxY}px)`, //기본 높이는 빼주기
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
        //이 Y값이 최대치에 올라와있는게 아니라면
        if (currentSheetY !== minY) {
          // 내렸을 때 최소로 내려가야함
          if (touchMove.movingDirection === 'down') {
            sheet.current!.style.setProperty('transform', 'translateY(0)');
          }

          // 올렸을 때 최대로 올라가야함
          if (touchMove.movingDirection === 'up') {
            sheet.current!.style.setProperty(
              'transform',
              `translateY(${minY - maxY})`, //최소 높이 빼줘야함
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

  //컨텐츠 영역 터치
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
