'use client';
import { Like, scrapIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import { useRecoilState } from 'recoil';
import { AuthOpenModalState } from '@/recoil/authStates';
import ModalPortal from '../../modal/ModalPortal';
import ModalOutside from '../../modal/ModalOutside';
import AuthModal from '@/components/community/AuthModal';
import useSWR, { useSWRConfig } from 'swr';
import toast, { Toaster } from 'react-hot-toast';

export const buttonArray = [{ path: Like }, { path: scrapIcon }];

const DetailButtons = ({ postId }: { postId: number }) => {
  const [authOpenModal, setAuthOpenModal] = useRecoilState(AuthOpenModalState);

  const { data, mutate } = useSWR<ResponseDetialButtonsData>(
    `/api/post/${postId}`,
  );

  // swr mutate로 업데이트를 해보자!!!!
  const onClickLikeHandler = async () => {
    try {
      const response = await fetch(`/api/post/like`, {
        method: 'POST',
        body: JSON.stringify(postId),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status === 200) {
          mutate(`/api/post/${postId}`);
          return response.json();
        } else if (response.status === 401) {
          setAuthOpenModal(true);
          document.body.style.overflow = 'hidden';
        } else {
          throw new Error(response.statusText);
        }
      });
      toast.success(response.message);
    } catch (error) {
      toast.error('좋아요 실패했어요..');
    }
  };
  const onClickScrapHandler = async () => {
    try {
      const response = await fetch(`/api/post/scrap`, {
        method: 'POST',
        body: JSON.stringify(postId),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status === 200) {
          mutate(`/api/post/${postId}`);
          return response.json();
        } else if (response.status === 401) {
          setAuthOpenModal(true);
          document.body.style.overflow = 'hidden';
        } else {
          throw new Error(response.statusText);
        }
      });
      toast.success(response.message);
    } catch (error) {
      toast.error('스크랩 실패했어요..');
    }
  };
  return (
    <>
      <div className="flex flex-row gap-2 w-full">
        <div
          onClick={onClickLikeHandler}
          className="bg-neutral-500 h-8 w-full text-white rounded-3xl py-1 flex justify-center items-center gap-3"
        >
          <Toaster />
          <Icons path={Like} fill="white" />
          <span>{data?.likeSize}</span>
        </div>
        <div
          onClick={onClickScrapHandler}
          className="bg-neutral-500 h-8 w-full text-white rounded-3xl py-1 flex justify-center items-center gap-3"
        >
          {' '}
          <Icons path={scrapIcon} fill="none" />
          <span>{data?.scrapSize}</span>
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

export default DetailButtons;
