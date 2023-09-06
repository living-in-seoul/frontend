'use client';
import Image from 'next/image';
import { PlaceData } from '@/utils/constants/place';
import ModalPortal from '@/components/modal/ModalPortal';
import ModalOutside from '@/components/modal/ModalOutside';
import { useState } from 'react';
import Modal from '@/components/layouts/Modal';
import HomePlaceCardDetails from './HomePlaceCardDetails';
import { CongestionLevelElemet } from '@/utils/utilFunc';
// eslint-disable-next-line @next/next/no-img-element

interface HomePlaceCardProps {
  list: CityData;
}

const HomePlaceCard = ({ list }: HomePlaceCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <article
      className="flex flex-col w-52 min-w-[208px] h-40 relative scale-100 hover:scale-105 transition-all cursor-pointer "
      onClick={() => setModalVisible(true)}
    >
      <div className="w-full bg-white h-40 rounded-2xl shadow-lg">
        <div className="relative flex w-full h-24 overflow-hidden rounded-tl-2xl rounded-tr-2xl">
          <Image
            src={`/placeimg/${list.AREA_NM}.jpg`}
            alt={'imageNone'}
            fill
            sizes={'33vw'}
            quality={30}
            className="none"
          />
        </div>
        <div className="flex justify-between items-center px-4 pb-3 pt-1.5">
          <div className="flex flex-col">
            <div className="text-neutral-700 text-base font-semibold leading-7">
              {PlaceData[`${list.AREA_NM}`].simpleName}
            </div>
            <div className="text-neutral-500 text-xs font-normal">
              {PlaceData[`${list.AREA_NM}`].adress}
            </div>
          </div>

          <div
            className={`flex justify-center items-center w-8 h-8 ${
              CongestionLevelElemet(list.AREA_CONGEST_LVL).color
            } rounded-full`}
          >
            <div className="text-center text-white text-xs font-semibold leading-3">
              {CongestionLevelElemet(list.AREA_CONGEST_LVL).text}
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <ModalPortal nodeName="placePortal">
          <Modal onClose={() => setModalVisible(false)}>
            <HomePlaceCardDetails
              list={list}
              onClose={() => {
                console.log('asdf');
                setModalVisible(false);
              }}
            />
          </Modal>
        </ModalPortal>
      )}
    </article>
  );
};
export default HomePlaceCard;
