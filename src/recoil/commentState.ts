import { atom } from 'recoil';

export const inoutTextFocusState = atom<number | null>({
  key: 'inoutTextFocusState',
  default: null,
});

export interface totalCommentStateProps {
  isReComment: boolean;
  isComment: boolean;
  commentId: number | null;
  isCommentChange: boolean;
  reCommentChange: boolean;
  reCommentId: number | null;
}
export const totalCommentState = atom<totalCommentStateProps>({
  key: 'totalCommentState',
  default: {
    isReComment: false,
    isComment: true,
    commentId: null,
    isCommentChange: false,
    reCommentChange: false,
    reCommentId: null,
  },
});

export const reCommentState = atom<{
  reCommentChange: boolean;
  reCommentId: number | null;
}>({
  key: 'reCommentState',
  default: { reCommentChange: false, reCommentId: null },
});

export const commentKeyState = atom<string>({
  key: 'commentState',
  default: '',
});

export const onReCommentState = atom<number | null>({
  key: 'onReCommentState',
  default: null,
});
export const commentIdState = atom<number | null>({
  key: 'commentIdState',
  default: null,
});
export interface RefObject<T> {
  current: T | null;
}
export const buttonRefState = atom<RefObject<HTMLButtonElement>>({
  key: 'buttonRefState',
  default: { current: null },
});

export const textareaRefState = atom<RefObject<HTMLTextAreaElement>>({
  key: 'textareaRefState',
  default: { current: null },
});
