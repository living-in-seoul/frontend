'use client';
import { Like, scrapIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import { useRecoilState } from 'recoil';
import { AuthOpenModalState } from '@/recoil/authStates';
import ModalPortal from '../../modal/ModalPortal';
import ModalOutside from '../../modal/ModalOutside';
import AuthModal from '@/components/community/AuthModal';

export const buttonArray = [{ path: Like }, { path: scrapIcon }];

const LikeDetailCase = ({ postId }: { postId: number }) => {
  const [authOpenModal, setAuthOpenModal] = useRecoilState(AuthOpenModalState);

  // swr mutate로 업데이트를 해보자!!!!
  const onClickLikeHandler = async () => {
    fetch(`/api/post/like`, {
      method: 'POST',
      body: JSON.stringify(postId),
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
  };

  const onClickScrapHandler = async () => {
    await fetch(`/api/post/scrap`, {
      method: 'POST',
      body: JSON.stringify(postId),
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
  };

  return (
    <>
      <div className="flex flex-row gap-2 w-full">
        <div
          onClick={onClickLikeHandler}
          className="bg-neutral-500 h-8 w-full text-white rounded-3xl py-1 flex justify-center items-center gap-3"
        >
          {/* {data?.hasLiked ? (
            <>
              <Icons path={Like} fill="white" />
              <span>{data?.likeSize}</span>
            </>
          ) : (
            <div>이거다잉</div>
          )} */}
        </div>
        <div
          onClick={onClickScrapHandler}
          className="bg-neutral-500 h-8 w-full text-white rounded-3xl py-1 flex justify-center items-center gap-3"
        >
          {' '}
          <Icons path={scrapIcon} fill="none" />
          {/* <span>{data?.scrapSize}</span> */}
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
