import { OverlayView, OverlayViewF } from '@react-google-maps/api';

const CustomOverlayMarker = ({ position, text, onClick }: any) => {
  return (
    <OverlayViewF
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className="relative hover:scale-105 transition-all active:scale-105 ">
        <div
          className="top-0 cursor-pointer flex justify-center items-center px-3 py-1.5 overflow-hidden rounded-3xl bg-zinc-700 text-white text-xs  "
          onClick={onClick}
        >
          {text}
          <div className="absolute bottom-[-15%] left-1/2 w-2 h-2 -translate-x-1/2 bg-zinc-700 transform rotate-45"></div>
        </div>
      </div>
    </OverlayViewF>
  );
};

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height / 25),
});

export default CustomOverlayMarker;
