'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useMapInstance from '@/hooks/useMapInstance';
import { MapStyleVersionTwo } from '@/utils/styles';
import { GoogleMap, InfoWindowF, MarkerF } from '@react-google-maps/api';
import {
  boardListState,
  centerState,
  currentState,
  filterOptionState,
  gudongState,
  markerIdState,
} from '@/recoil/mapStates';

const containerStyle = {
  width: '100%',
  height: '90vh',
};
const mapOptions: google.maps.MapOptions = {
  fullscreenControl: true,
  gestureHandling: 'greedy',
  disableDoubleClickZoom: true,
  disableDefaultUI: true,
  styles: MapStyleVersionTwo,
};
const sample = [
  { gu: '강남구', dong: '신사동' },
  { gu: '강남구', dong: '역삼동' },
];

const CommunityMap = () => {
  const { map, onLoad, onUnmount } = useMapInstance();
  const [zoom, setZoom] = useState(18);
  const [center, setCenter] = useRecoilState(centerState);
  const filterOption = useRecoilValue(filterOptionState);
  const gudong = useRecoilValue(gudongState);
  const currentValue = useRecoilValue(currentState);
  const setBoardListState = useSetRecoilState(boardListState);
  const [markerId, setMarkerId] = useRecoilState(markerIdState);
  const { data: boardList } = useSWR<ResponseRegister>(
    //sample gu -> gudong으로 바꾸기
    `/api/map/category/${filterOption}/${sample[0].gu}/${sample[0].dong}`,
  );

  useEffect(() => {
    if (boardList) {
      setBoardListState(boardList);
      console.log(boardList);
    }
    if (currentValue) {
      setCenter(currentValue);
    }
  }, [boardList, currentValue, filterOption, setBoardListState, setCenter]);

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center]);

  const onClickMarker = (
    _: google.maps.event,
    postId: number,
    latlng: LatLng,
  ) => {
    setMarkerId(postId);
    setCenter(latlng);
  };

  return (
    <section className="w-full h-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          ...mapOptions,
        }}
      >
        {<MarkerF position={center} />}
        <>
          {boardList &&
            boardList.result.map((post) => {
              const { postId, hashtag } = post.post;
              const latlng: LatLng = {
                // lat: Number(post.location.lat),
                // lng: Number(post.location.lng),
                lat: 37.4967,
                lng: 127.063,
              };
              return (
                <InfoWindowF
                  key={postId}
                  position={latlng}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -25),
                  }}
                >
                  <div
                    className=" relative flex-none flex justify-center items-center p-0 m-0 h-2 w-10 overflow-hidden"
                    onClick={(e) => onClickMarker(e, postId, latlng)}
                  >
                    <span className="fixed flex justify-center items-center w-24 h-[40px]  rounded-3xl bg-zinc-700 text-white">
                      # {hashtag.split('#')[1]}
                    </span>
                  </div>
                </InfoWindowF>
              );
            })}
        </>
      </GoogleMap>
    </section>
  );
};

export default CommunityMap;

// 1. 전체 보드 리스트 가져오기 -> 왜 안되지?
// 3. 마커 커스텀 (윈도우박스)
// 2. 디테일 페이지 제작
// 4. 업로드 페이지, 맵페이지 - 현재 위치 가져오기
// 5. 맵 - 게시글 작성, 현재 위치 버튼 만들기
