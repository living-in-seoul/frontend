import { atom } from 'recoil';

export const mapBottomSheetState = atom<boolean>({
  key: 'mapBottomSheetState',
  default: false,
});

/** 후기 동향소통 ... */
export const writeBottomSheetState = atom<boolean>({
  key: 'writeBottomSheetState',
  default: false,
});

export const loginBottomSheetState = atom<boolean>({
  key: 'loginBottomSheetState',
  default: false,
});

export const locationBottomSheetState = atom<boolean>({
  key: 'locationBottomSheetState',
  default: false,
});

interface BottomSheetStateProps {
  isActive: boolean;
  type: 'map' | 'write' | 'login' | 'location' | 'default';
  link: null | string;
  selectedOption?: string | null; // Add this line
}

export const bottomSheetState = atom<BottomSheetStateProps>({
  key: 'bottomSheetState',
  default: {
    isActive: false,
    type: 'default',
    link: null,
    selectedOption: null, // Add this line
  },
});
