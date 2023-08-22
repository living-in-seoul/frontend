'use client';
import Icons from '@/components/common/Icons';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import { AuthOpenModalState } from '@/recoil/authStates';
import { Like } from '@/utils/Icon';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import AuthModal from './AuthModal';
import { useSWRConfig } from 'swr';
import { communityKeyState } from '@/recoil/communityStates';

interface CommunityLikeBtnProps {
  likeSize: number;
  postId: number;
  category?: string;
  tags?: string | never[] | null;
  isPop?: SelectPopType;
}

const CommunityLikeBtn = ({
  likeSize,
  postId,
  category,
  isPop,
  tags,
}: CommunityLikeBtnProps) => {
  const [likeCount, setLikeCount] = useState(likeSize);
  const [isLiked, setIsLiked] = useState(false);
  const [authOpenModal, setAuthOpenModal] = useRecoilState(AuthOpenModalState);
  const [communityKey, setCommunityKey] = useRecoilState(communityKeyState);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    return () => {
      setAuthOpenModal(false);
      document.body.style.overflow = 'auto';
    };
  }, [setAuthOpenModal]);
  const likeHandler = async () => {
    const res = await fetch(`/api/community/like`, {
      method: 'POST',
      body: JSON.stringify({ postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          mutate(communityKey);
        } else if (res.status === 401) {
          setAuthOpenModal(true);
          document.body.style.overflow = 'hidden';
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex gap-2">
      {isLiked ? (
        <Icons
          fill="red"
          className={'cursor-pointer'}
          path={Like}
          option={{
            fill: '##404040',
          }}
          onClick={() => {
            setIsLiked(false);
          }}
        />
      ) : (
        <Icons
          path={Like}
          className={'cursor-pointer'}
          onClick={() => likeHandler()}
          option={{
            fill: '##404040',
          }}
        />
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
