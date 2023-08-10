import ReviewItem from '@/components/common/ReviewItem';
import StarRate from '@/components/common/StarRate';
import DetailInfo from '@/components/detail/DetailInfo';
import { post } from '@/utils/dummydata';
import Image from 'next/image';
import React from 'react';

const MapDetail = () => {
  return (
    <>
      <Image
        className="w-full h-52 bg-zinc-300 flex items-center justify-center "
        alt="good dog"
        src={'/dog.jpg'}
        width={30000000000}
        height={30000000000}
      />
      <div className="px-4">
        <div className="border-b-4 border-zinc-300">
          <div className="w-full flex flex-col bg-white  ">
            <div className="w-full h-40 flex items-center  flex-col text-black text-xl font-semibold  gap-1 mt-6">
              <span>장소 이름</span>
              <div className="flex flex-row justify-center w-full gap-3">
                <StarRate />

                <div className=" text-black text-sm font-normal leading-loose">
                  <span className="border-r-2 pr-2 border-stone-300">5.0</span>
                </div>
                <div className="left-[115px] top-0  text-zinc-600 text-sm font-normal leading-loose ">
                  <span>리뷰 830</span>
                </div>
              </div>
              <div className="w-full h-7 flex mt-5 ">
                <div className="w-full h-11  rounded-lg border border-zinc-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-4 border-zinc-300">
          <div className="flex flex-col  py-5 gap-2 ">
            <DetailInfo text="서울특별시 서초구 서초동" />
            <DetailInfo text="매일 11:00 - 23:00" />
            <DetailInfo text="www.hanghae.com" />
          </div>
        </div>
        <div className="border-b-4 border-zinc-300">
          <div className="flex flex-col  py-5 gap-2 ">
            <DetailInfo text="서울특별시 서초구 서초동" />
            <DetailInfo text="매일 11:00 - 23:00" />
            <DetailInfo text="www.hanghae.com" />
          </div>
        </div>
        <div>
          <div className=" font-semibold ">
            <div className="py-5 flex flex-row gap-3 ">
              <span className="">방문자 사진</span>
              <span className="text-zinc-600">105</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="w-28 h-32 bg-zinc-300"></div>
              <div className="w-28 h-32 bg-zinc-300"></div>
              <div className="w-28 h-32 bg-zinc-300"></div>
              <div className="w-28 h-32 bg-zinc-300"></div>
              <div className="w-28 h-32 bg-zinc-300"></div>
              <div className="w-28 h-32 bg-zinc-300"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="py-5 flex flex-row gap-3  ">
            <span className="">커뮤니티에 등록된 리뷰</span>
            <span className="text-zinc-600">12</span>
          </div>
          <ReviewItem {...post} />
          <ReviewItem {...post} />
          <ReviewItem {...post} />
        </div>
      </div>
    </>
  );
};

export default MapDetail;
