import { call, home, marker } from '@/utils/Icon';
import Icons from '../common/Icons';
const detailInfoIcons = {
  markerIcon: { path: marker, width: 14, height: 18 },
  callIcon: { path: call, width: 24, height: 28 },
  homeIcon: { path: home, width: 18, height: 18 },
};

interface DetainlInfoProps {
  business_status: string | undefined;
  formatted_address: string | undefined;
  formatted_phone_number: string | undefined;
}

const DetailInfo = ({
  formatted_address,
  formatted_phone_number,
  business_status,
}: DetainlInfoProps) => {
  return (
    <div className="flex flex-col  py-5 gap-2 ">
      <div className="flex items-center gap-2 ">
        <Icons
          path={detailInfoIcons.markerIcon}
          fill="white"
          stroke="#B8B8B8"
        />
        <span>{formatted_address}</span>
      </div>
      <div className="flex items-center gap-2 ">
        <Icons path={detailInfoIcons.callIcon} fill="#B8B8B8" />
        <span>{formatted_phone_number}</span>
      </div>
      <div className="flex items-center gap-2 ">
        <Icons path={detailInfoIcons.homeIcon} fill="#B8B8B8" />
        <span>
          {business_status === 'OPERATIONAL' ? '운영중입니다' : '영업 안해요~'}
        </span>
      </div>
    </div>
  );
};

export default DetailInfo;
// marker+
{
  /* <div className="border-b-4 border-zinc-300">
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
        </div> */
}
