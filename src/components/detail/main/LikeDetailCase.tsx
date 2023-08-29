'use client';
import { Like, scrapIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import { useState, useTransition } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthOpenModalState } from '@/recoil/authStates';
import ModalPortal from '../../modal/ModalPortal';
import ModalOutside from '../../modal/ModalOutside';
import AuthModal from '@/components/community/AuthModal';
import useSWR from 'swr';
interface LikeDetailCaseProps {
  likeSize: number;
  hasLiked: boolean;
  postId: number;
}

export const buttonArray = [{ path: Like }, { path: scrapIcon }];

const LikeDetailCase = ({
  likeSize,
  hasLiked,
  postId,
}: LikeDetailCaseProps) => {
  const [isPending, startTransition] = useTransition();
  const [LikeState, setLikeState] = useState<number>(likeSize);
  const [authOpenModal, setAuthOpenModal] = useRecoilState(AuthOpenModalState);
  const [hasLikeState, setHasLikeState] = useState<boolean | undefined>(
    hasLiked,
  );

  const { data: likeData } = useSWR('/');
  // swr mutate로 업데이트를 해보자!!!!
  const onClickLikeHandler = async () => {
    fetch(`/api/community/like`, {
      method: 'POST',
      body: JSON.stringify({ postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        setAuthOpenModal(true);
        document.body.style.overflow = 'hidden';
      } else {
        throw new Error(res.statusText);
      }
    });
    startTransition(() => {
      setLikeState((prev) => (hasLikeState ? prev + 1 : prev - 1));
      setHasLikeState((prev) => !prev);
    });
  };
  return (
    <>
      <div onClick={onClickLikeHandler} className="flex flex-row gap-2 w-full">
        <div className="bg-neutral-500 w-full text-white rounded-3xl py-1 flex justify-center items-center gap-3">
          <Icons path={Like} fill="white" />
          <span>{likeSize}</span>
        </div>
        <div className="bg-neutral-500 w-full text-white rounded-3xl py-1 flex justify-center items-center gap-3">
          {' '}
          <Icons path={scrapIcon} fill="none" />
          <span> 201</span>
        </div>
      </div>
      {authOpenModal && (
        <ModalPortal nodeName="portalSignin">
          <ModalOutside
            className="max-w-md scroll overflow-hidden bg-white w-4/5 px-10 rounded-lg shadow-sm py-10"
            onClose={() => {
              setAuthOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <AuthModal />
          </ModalOutside>
        </ModalPortal>
      )}
    </>
  );
};

export default LikeDetailCase;
