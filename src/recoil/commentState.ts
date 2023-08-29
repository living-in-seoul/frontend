import { atom } from 'recoil';

export const inputTextRefState =
  atom<React.RefObject<HTMLTextAreaElement> | null>({
    key: 'inputTextRefState',
    default: null,
  });

export const buttonRefState = atom<React.RefObject<HTMLButtonElement> | null>({
  key: 'buttonRefState',
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
