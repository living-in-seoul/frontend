import { OverlayView, OverlayViewF } from '@react-google-maps/api';

const CustomOverlayMarker = ({ position, text, onClick }: any) => {
  return (
    <OverlayViewF
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <span
        className="flex justify-center items-center w-16 py-1 overflow-hidden rounded-3xl bg-zinc-700 text-white text-sm"
        onClick={onClick}
      >
        {text}
      </span>
    </OverlayViewF>
  );
};

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height / 25), // Adjusted the vertical offset to -25 as per InfoWindowF options.
});

export default CustomOverlayMarker;
