'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useMapInstance from '@/hooks/useMapInstance';
import { MapStyleVersionTwo } from '@/utils/styles';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import {
  boardListState,
  filterOptionState,
  gudongState,
  markerIdState,
} from '@/recoil/mapStates';

const containerStyle = {
  width: '100%',
  height: '100vh',
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
  const [zoom, setZoom] = useState<number>(18);
  const { map, onLoad, onUnmount } = useMapInstance();
  const [center, setCenter] = useState<LatLng>({
    lat: 37.5665,
    lng: 126.978,
  });
  const filterOption = useRecoilValue(filterOptionState);
  const gudong = useRecoilValue(gudongState);
  const [markerId, setMarkerId] = useRecoilState(markerIdState);
  const { data: boardList } = useSWR<ResponseRegister>(
    `/api/map/category/${filterOption}/${sample[0].gu}/${sample[0].dong}`,
  );
  const setBoardListState = useSetRecoilState(boardListState);

  useEffect(() => {
    if (boardList) {
      setBoardListState(boardList);
    }
  }, [boardList, filterOption, setBoardListState]);

  const onClickMarker = (e: google.maps.event, postId: number) => {
    setMarkerId(postId);
  };

  return (
    <section className="w-full h-full bg-slate-400">
      <GoogleMap
        onClick={(e) => e.stop()}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          ...mapOptions,
        }}
      >
        {boardList?.result.map((post) => {
          const { postId } = post.post;
          //
          // const latlng: LatLng = {
          //   lat: Number(post.location.lat),
          //   lng: Number(post.location.lng),
          // };
          return (
            <MarkerF
              key={postId}
              position={{
                lat: 37.4967,
                lng: 127.063,
              }}
              onClick={(e) => onClickMarker(e, postId)}
              // position={latlng}
            ></MarkerF>
          );
        })}
      </GoogleMap>
    </section>
  );
};

export default CommunityMap;

// 1. 전체 보드 리스트 가져오기
// 2. 디테일 페이지 제작
// 3. 마커 커스텀 (윈도우박스)
// 4. 업로드 페이지, 맵페이지 - 현재 위치 가져오기
// 5. 맵 - 게시글 작성, 현재 위치 버튼 만들기
