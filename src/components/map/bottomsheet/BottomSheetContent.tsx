import BottomSheetItem from './BottomSheetItem';

interface MapBottomSheet {
  places: Place[];
}

const BottomSheetContent = ({ places }: MapBottomSheet) => {
  return (
    <div className="flex flex-col overflow-auto h-full smooth-scroll bg-slate-100 z-10">
      {places.map((place) => {
        return <BottomSheetItem key={place.place_id} {...place} />;
      })}
    </div>
  );
};

export default BottomSheetContent;
