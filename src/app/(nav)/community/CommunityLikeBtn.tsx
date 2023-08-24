'use client';
import Icons from '@/components/common/Icons';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import { AuthOpenModalState } from '@/recoil/authStates';
import { Like } from '@/utils/Icon';
import { useEffect } from 'react';
import AuthModal from './AuthModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePosts from '@/hooks/usePosts';
import { communityKeyState } from '@/recoil/communityStates';

interface CommunityLikeBtnProps {
  likeSize: number;
  postId: number;
  hasLiked: boolean;
}

const CommunityLikeBtn = ({
  likeSize,
  postId,
  hasLiked,
}: CommunityLikeBtnProps) => {
  const [authOpenModal, setAuthOpenModal] = useRecoilState(AuthOpenModalState);
  const { setLike } = usePosts(communityKeyState);

  useEffect(() => {
    return () => {
      setAuthOpenModal(false);
      document.body.style.overflow = 'auto';
    };
  }, [setAuthOpenModal]);

  const likeHandler = () => {
    setLike(postId);
  };
  return (
    <div className="flex gap-2">
      {hasLiked ? (
        <div onClick={likeHandler}>
          <Icons
            fill="red"
            className={'cursor-pointer'}
            path={Like}
            option={{
              fill: '##404040',
            }}
          />
        </div>
      ) : (
        <div onClick={likeHandler}>
          <Icons
            path={Like}
            className={'cursor-pointer'}
            option={{
              fill: '##404040',
            }}
          />
        </div>
      )}
      <div className="text-neutral-700 text-xs font-normal leading-3">
        {likeSize}
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
    </div>
  );
};
export default CommunityLikeBtn;
