'use client';
import { Like, fillLike, scrapIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import { useRecoilState } from 'recoil';
import { AuthOpenModalState } from '@/recoil/authStates';
import ModalPortal from '../../modal/ModalPortal';
import ModalOutside from '../../modal/ModalOutside';
import AuthModal from '@/components/community/AuthModal';
import toast, { Toaster } from 'react-hot-toast';
import { useSWRConfig } from 'swr';

export const buttonArray = [{ path: Like }, { path: scrapIcon }];

const DetailButtons = ({ data }: { data: ResponseDetailData }) => {
  const [authOpenModal, setAuthOpenModal] = useRecoilState(AuthOpenModalState);
  const postId = localStorage.getItem('postId');
  const { mutate } = useSWRConfig();
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
          return response.json();
        } else if (response.status === 401) {
          setAuthOpenModal(true);
          document.body.style.overflow = 'hidden';
        } else {
          throw new Error(response.statusText);
        }
      });
      mutate(`/api/post/${postId}`, {
        ...data,
        hasLiked: !data.result.hasLiked,
        LikeSize: data.result.hasLiked
          ? data.result.post.likeSize - 1
          : data.result.post.likeSize + 1,
      });
      toast.success(response.message);
    } catch (error) {
      toast.error('로그인을 먼저 해주세요');
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
          return response.json();
        } else if (response.status === 401) {
          setAuthOpenModal(true);
          document.body.style.overflow = 'hidden';
        } else {
          throw new Error(response.statusText);
        }
      });
      mutate(`/api/post/${postId}`, {
        ...data,
        hasScrapped: !data.result.hasScrapped,
        scrapSize: data.result.hasScrapped
          ? data.result.post.scrapSize + 1
          : data.result.post.scrapSize - 1,
      });
      toast.success(response.message);
    } catch (error) {
      toast.error('로그인을 먼저 해주세요');
    }
  };
  const userActive =
    'active:bg-emerald-50 active:border-teal-400 active:text-teal-400';
  const liekdDiv = 'bg-emerald-50 border-teal-400 text-teal-400';
  const normalDiv = 'border-zinc-500';
  const basicDivStyle =
    'h-8 w-full border rounded-3xl py-1 flex justify-center items-center gap-3';
  return (
    <>
      <div className="flex flex-row gap-2 w-full">
        <Toaster />
        <div
          onClick={onClickLikeHandler}
          className={`${basicDivStyle} ${
            data.result.hasLiked ? liekdDiv : normalDiv
          } ${userActive}`}
        >
          <Icons path={data.result.hasLiked ? fillLike : Like} />
          <span>{data.result.post.likeSize}</span>
        </div>
        <div
          onClick={onClickScrapHandler}
          className={`${basicDivStyle} ${
            data.result.hasScrapped ? liekdDiv : normalDiv
          } ${userActive}`}
        >
          <Icons
            path={scrapIcon}
            fill={data.result.hasScrapped ? '#00C092' : '#404040'}
          />
          <span>{data.result.post.scrapSize}</span>
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
