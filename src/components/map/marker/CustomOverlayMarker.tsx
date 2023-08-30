import { InfoWindowF, OverlayView, OverlayViewF } from '@react-google-maps/api';

const CustomOverlayMarker = ({ position, text, onClick }: any) => {
  return (
    <InfoWindowF
      position={position}
      // mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      // getPixelPositionOffset={getPixelPositionOffset}
    >
      <div
        className="flex justify-center items-center w-16 py-1 overflow-hidden rounded-3xl bg-zinc-700 text-white text-sm"
        onClick={onClick}
      >
        {text}
      </div>
    </InfoWindowF>
  );
};

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height / 25), // Adjusted the vertical offset to -25 as per InfoWindowF options.
});

export default CustomOverlayMarker;
