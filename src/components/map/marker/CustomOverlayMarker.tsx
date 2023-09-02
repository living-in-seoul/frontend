import { OverlayView, OverlayViewF } from '@react-google-maps/api';

const CustomOverlayMarker = ({ position, text, onClick }: any) => {
  return (
    <OverlayViewF
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className="relative hover:scale-105 transition-all active:scale-105">
        <div className="absolute z-10 bottom-[-15%] left-1/2 w-1.5 h-2 -translate-x-1/2 bg-primary transform rotate-45"></div>
        <div
          className="relative z-20 top-0 cursor-pointer flex justify-center items-center px-3 py-1 overflow-hidden rounded-3xl border-2 border-primaryText bg-white text-primaryText text-sm font-semibold"
          onClick={onClick}
        >
          {text}
        </div>
      </div>
    </OverlayViewF>
  );
};

//꼬리 부분을 중심으로 만들어쥼!
const getPixelPositionOffset = (width: number, height: number) => {
  const tailHeightPercentage = 0.15;
  const offsetY = height * tailHeightPercentage;

  return {
    x: -(width / 2),
    y: -(height + offsetY),
  };
};

export default CustomOverlayMarker;
