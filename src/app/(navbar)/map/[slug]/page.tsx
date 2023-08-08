import DetailInfo from '@/components/detail/DetailInfo';
import React from 'react';

const MapDetail = () => {
  return (
    <>
      <div className="border-b-4 border-zinc-300">
        <div className="w-full flex flex-col bg-white  ">
          <div className="w-full h-52 bg-zinc-300 flex items-center justify-center ">
            <span>장소사진</span>
          </div>
          <div className="w-full h-40 flex items-center  flex-col text-black text-xl font-semibold px-4 gap-1 mt-6">
            <span>장소 이름</span>
            <div className="flex flex-row justify-center w-full gap-3">
              <div className="flex items-center ">
                <div className="w-3.5 h-3.5 bg-black" />
                <div className="w-3.5 h-3.5 bg-black " />
                <div className="w-3.5 h-3.5 bg-black " />

                <div className="w-3.5 h-3.5 bg-black " />

                <div className="w-3.5 h-3.5 bg-black " />
              </div>

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
        <div className="flex flex-col px-4 py-5 gap-2 ">
          <DetailInfo text="서울특별시 서초구 서초동" />
          <DetailInfo text="매일 11:00 - 23:00" />
          <DetailInfo text="www.hanghae.com" />
        </div>
      </div>
      <div className="border-b-4 border-zinc-300">
        <div className="flex flex-col px-4 py-5 gap-2 ">
          <DetailInfo text="서울특별시 서초구 서초동" />
          <DetailInfo text="매일 11:00 - 23:00" />
          <DetailInfo text="www.hanghae.com" />
        </div>
      </div>
      <div>
        <div className="px-4 font-semibold ">
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
        <div className="py-5 flex flex-row gap-3 px-4 ">
          <span className="">커뮤니티에 등록된 리뷰</span>
          <span className="text-zinc-600">12</span>
        </div>
      </div>

      {/* <div className="left-[15px] top-[666px] absolute text-black text-sm font-semibold leading-3">
          방문자 사진
        </div> 
        <div className="left-[87px] top-[666px] absolute text-zinc-600 text-sm font-semibold leading-3">
          105
        </div>
        <div className="left-[15px] top-[983px] absolute text-black text-sm font-semibold leading-3">
          커뮤니티에 등록된 리뷰
        </div>
        <div className="left-[15px] top-[1395px] absolute text-black text-sm font-semibold leading-3">
          이 장소와 비슷한 곳
        </div>
        <div className="left-[149px] top-[983px] absolute text-zinc-600 text-sm font-semibold leading-3">
          12
        </div>
        <div className="left-[130px] top-[1395px] absolute text-zinc-600 text-sm font-semibold leading-3">
          12
        </div>
        <div className="w-96 h-1 left-0 top-[429px] absolute bg-zinc-300" />
        <div className="w-96 h-1 left-0 top-[538px] absolute bg-zinc-300" />
        <div className="w-96 h-1 left-0 top-[640px] absolute bg-zinc-300" />
        <div className="w-96 h-1 left-0 top-[1361px] absolute bg-zinc-300" />
        <div className="w-36 h-7 left-[13px] top-[448px] absolute">
          <div className="w-5 h-5 left-0 top-[5px] absolute">
            <div className="w-3 h-4 left-[3.75px] top-[2.50px] absolute"></div>
          </div>
          <div className="left-[29px] top-0 absolute text-black text-xs font-normal leading-loose">
            서울특별시 서초구 서초동
          </div>
        </div>
        <div className="w-32 h-7 left-[16px] top-[472px] absolute">
          <div className="left-[26px] top-0 absolute text-black text-xs font-normal leading-loose">
            매일 11:00 ~ 23:00
          </div>
          <div className="w-3.5 h-3.5 left-0 top-[7px] absolute" />
        </div>
        <div className="w-32 h-7 left-[15px] top-[494px] absolute">
          <div className="left-[27px] top-0 absolute text-black text-xs font-normal leading-loose">
            www.hanghae.com
          </div>
          <div className="w-4 h-4 left-0 top-[6px] absolute" />
        </div>
        <div className="left-[42px] top-[550.50px] absolute text-black text-xs font-normal leading-loose">
          1001, 108, 33, 67
        </div>
        <div className="left-[42px] top-[587.50px] absolute text-black text-xs font-normal leading-loose">
          서초역 - 잠실역
        </div>
        <div className="left-[139px] top-[550.50px] absolute text-zinc-600 text-xs font-normal leading-loose">
          12051
        </div>
        <div className="left-[42px] top-[566.73px] absolute text-zinc-600 text-xs font-normal leading-loose">
          도보 5분
        </div>
        <div className="left-[42px] top-[602.50px] absolute text-zinc-600 text-xs font-normal leading-loose">
          도보 10분
        </div>
        <div className="w-28 h-32 left-[15px] top-[699px] absolute bg-zinc-300" />
        <div className="w-28 h-32 left-[15px] top-[831px] absolute bg-zinc-300" />
        <div className="w-28 h-32 left-[138px] top-[699px] absolute bg-zinc-300" />
        <div className="w-28 h-32 left-[138px] top-[831px] absolute bg-zinc-300" />
        <div className="w-28 h-32 left-[261px] top-[699px] absolute bg-zinc-300" />
        <div className="w-28 h-32 left-[261px] top-[831px] absolute bg-neutral-700" />
        <div className="left-[301px] top-[876px] absolute text-center text-white text-xs font-semibold leading-loose">
          + 100
        </div>
        <div className="w-20 h-20 left-[293px] top-[1013px] absolute bg-white rounded-2xl shadow" />
        <div className="w-64 h-14 left-[15px] top-[1027px] absolute">
          <div className="w-16 h-2.5 left-0 top-0 absolute">
            <div className="left-0 top-0 absolute text-black text-xs font-semibold leading-3">
              닉네임
            </div>
            <div className="left-[41px] top-0 absolute text-zinc-600 text-xs font-normal leading-3">
              동네명
            </div>
          </div>
          <div className="w-64 h-7 left-0 top-[25px] absolute">
            <div className="left-0 top-0 absolute text-black text-sm font-semibold leading-3">
              혼밥하시는 분들에게 굉장히 좋을 식당 후기
            </div>
            <div className="left-0 top-[20px] absolute text-zinc-600 text-xs font-normal leading-3">
              서울에서 올라온 지 얼마 안돼 친구가 없어서 밥을 먹…
            </div>
          </div>
        </div>
        <div className="w-20 h-20 left-[293px] top-[1111px] absolute bg-white rounded-2xl shadow" />
        <div className="w-20 h-20 left-[293px] top-[1209px] absolute bg-white rounded-2xl shadow" />
        <div className="w-64 h-14 left-[15px] top-[1125px] absolute">
          <div className="w-16 h-2.5 left-0 top-0 absolute">
            <div className="left-0 top-0 absolute text-black text-xs font-semibold leading-3">
              닉네임
            </div>
            <div className="left-[41px] top-0 absolute text-zinc-600 text-xs font-normal leading-3">
              동네명
            </div>
          </div>
          <div className="w-64 h-7 left-0 top-[25px] absolute">
            <div className="left-0 top-0 absolute text-black text-sm font-semibold leading-3">
              서울에 온 뒤로 역대급 식당에서 밥 먹었습니다
            </div>
            <div className="left-0 top-[20px] absolute text-zinc-600 text-xs font-normal leading-3">
              안녕하세요 서울에 올라온 뒤로 맛있는 밥을 먹기 힘들…
            </div>
          </div>
        </div>
        <div className="w-96 h-32 left-[15px] top-[1223px] absolute">
          <div className="w-16 h-2.5 left-0 top-0 absolute">
            <div className="left-0 top-0 absolute text-black text-xs font-semibold leading-3">
              닉네임
            </div>
            <div className="left-[41px] top-0 absolute text-zinc-600 text-xs font-normal leading-3">
              동네명
            </div>
          </div>
          <div className="w-64 h-7 left-0 top-[25px] absolute">
            <div className="left-0 top-0 absolute text-black text-sm font-semibold leading-3">
              맛은 있었지만 친절함이 부족했던 식당
            </div>
            <div className="left-0 top-[20px] absolute text-zinc-600 text-xs font-normal leading-3">
              혼밥을 하기 위해서 여러 군데 둘러보다 추천을 받고 들…
            </div>
          </div>
          <div className="w-12 h-7 left-[308px] top-[94px] absolute">
            <div className="left-0 top-0 absolute text-black text-xs font-bold leading-loose">
              더보기
            </div>
          </div>
        </div>
        <div className="w-36 h-32 left-[15px] top-[1426px] absolute">
          <div className="w-36 h-32 left-0 top-0 absolute bg-white rounded-2xl shadow" />
          <div className="left-[52px] top-[51px] absolute text-black text-xs font-normal leading-loose">
            장소 사진
          </div>
        </div>
        <div className="w-36 h-32 left-[175px] top-[1426px] absolute">
          <div className="w-36 h-32 left-0 top-0 absolute bg-white rounded-2xl shadow" />
          <div className="left-[52px] top-[51px] absolute text-black text-xs font-normal leading-loose">
            장소 사진
          </div>
        </div>
        <div className="w-36 h-32 left-[335px] top-[1426px] absolute">
          <div className="w-36 h-32 left-0 top-0 absolute bg-white rounded-2xl shadow" />
          <div className="left-[52px] top-[51px] absolute text-black text-xs font-normal leading-loose">
            장소 사진
          </div>
        </div>
        <div className="w-12 h-12 left-[15px] top-[1567px] absolute">
          <div className="left-0 top-0 absolute text-black text-sm font-semibold leading-loose">
            장소 이름
          </div>
          <div className="left-0 top-[19px] absolute text-zinc-600 text-xs font-normal leading-loose">
            장소 주소
          </div>
        </div>
        <div className="w-12 h-12 left-[175px] top-[1567px] absolute">
          <div className="left-0 top-0 absolute text-black text-sm font-semibold leading-loose">
            장소 이름
          </div>
          <div className="left-0 top-[19px] absolute text-zinc-600 text-xs font-normal leading-loose">
            장소 주소
          </div>
        </div>
        <div className="w-12 h-12 left-[335px] top-[1567px] absolute">
          <div className="left-0 top-0 absolute text-black text-sm font-semibold leading-loose">
            장소 이름
          </div>
          <div className="left-0 top-[19px] absolute text-zinc-600 text-xs font-normal leading-loose">
            장소 주소
          </div>
        </div>
        <div className="w-4 h-4 left-[16px] top-[557px] absolute" />
        <div className="w-6 h-6 left-[16px] top-[557px] absolute" />
        <div className="w-2.5 h-4 left-[19px] top-[593.90px] absolute"></div>
      </div>  */}
    </>
  );
};

export default MapDetail;
