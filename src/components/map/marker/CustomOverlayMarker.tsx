import { OverlayView, OverlayViewF } from '@react-google-maps/api';

interface CustomOverlayMarkerProps {
  position: LatLng | google.maps.LatLng;
  text: string;
  onClick?: (e: google.maps.event) => void;
  onWrite?: boolean;
}

const CustomOverlayMarker = ({
  position,
  text,
  onClick,
  onWrite,
}: CustomOverlayMarkerProps) => {
  const adjustedGetPixelPositionOffset = (width: number, height: number) => {
    return getPixelPositionOffset(width, height, onWrite ? 35 : 0);
  };

  return (
    <OverlayViewF
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={adjustedGetPixelPositionOffset}
    >
      <div className="relative hover:scale-105 transition-all active:scale-105">
        {!onWrite && (
          <div className="absolute z-10 bottom-[-15%] left-1/2 w-1.5 h-2 -translate-x-1/2 bg-secondary transform rotate-45"></div>
        )}
        <div
          className="relative z-20 top-0 cursor-pointer flex justify-center items-center px-3 py-1 overflow-hidden rounded-3xl border-2 border-secondary bg-white text-secondary text-sm font-semibold"
          onClick={onClick ? onClick : undefined}
        >
          {text}
        </div>
      </div>
    </OverlayViewF>
  );
};

const getPixelPositionOffset = (
  width: number,
  height: number,
  onWritePixel: number = 0,
) => {
  const tailHeightPercentage = 0.15;
  const offsetY = height * tailHeightPercentage - onWritePixel;

  return {
    x: -(width / 2),
    y: -(height + offsetY),
  };
};

export default CustomOverlayMarker;
