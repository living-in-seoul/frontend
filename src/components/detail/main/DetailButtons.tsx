'use client';

import { Like, fillLike, scrapIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import toast, { Toaster } from 'react-hot-toast';
import useSWR, { useSWRConfig } from 'swr';
import { useSetRecoilState } from 'recoil';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { userClientVerify } from '@/service/oauth';
import { clientCommentLike, clientPostScrap } from '@/service/clientCommet';
import { useState } from 'react';

const DetailButtons = ({ postId }: { postId: string }) => {
  const { data } = useSWR<RessponseLikeandScrap>(`/api/post/${postId}`);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const openLoginBottomSheet = () => {
    setBottomSheetState({
      isActive: true,
      type: 'login',
      link: null,
    });
  };

  const onClickLikeHandler = async () => {
    setIsLoading(true);
    const userVerify = await userClientVerify();
    if (userVerify && userVerify.status === 200) {
      try {
        mutate(
          `/api/post/${postId}`,
          {
            ...data,
            hasLiked: !data?.hasLiked,
            likeSize: data?.hasLiked
              ? data.likeSize - 1
              : data && data.likeSize + 1,
          },
          false,
        );
        const response = await clientCommentLike(Number(postId), 'detail');
        mutate(`/api/post/${postId}`);
        toast.success(response.message);
      } catch (error) {
        toast.error('로그인을 먼저 해주세요');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('로그인이 필요합니다.', { position: 'top-center' });
      openLoginBottomSheet();
      setIsLoading(false);
    }
  };

  const onClickScrapHandler = async () => {
    setIsLoading(true);
    const response = await userClientVerify();
    if (response && response.status === 200) {
      try {
        mutate(
          `/api/post/${postId}`,
          {
            ...data,
            hasScrapped: !data?.hasScrapped,
            scrapSize: data?.hasScrapped
              ? data.scrapSize - 1
              : data && data.scrapSize + 1,
          },
          false,
        );
        const response = await clientPostScrap(Number(postId));
        mutate(`/api/post/${postId}`);
        toast.success(response.message);
      } catch (error) {
        toast.error('로그인을 먼저 해주세요');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('로그인이 필요합니다.', { position: 'top-center' });
      openLoginBottomSheet();
      setIsLoading(false);
    }
  };
  const userActive =
    'active:bg-emerald-50 active:border-teal-400 active:text-teal-400';
  const liekdDiv = 'bg-emerald-50 border-teal-400 text-teal-400';
  const normalDiv = 'border-gray5';
  const basicDivStyle =
    'h-8 w-full border rounded-3xl py-1 flex justify-center items-center gap-3';
  return (
    <>
      <Toaster />
      {data && (
        <>
          <div className="flex flex-row gap-2 w-full">
            <div
              onClick={isLoading ? () => {} : onClickLikeHandler}
              className={`${basicDivStyle} ${
                data.hasLiked ? liekdDiv : normalDiv
              } ${userActive}`}
            >
              <Icons path={data.hasLiked ? fillLike : Like} />
              <span>{data.likeSize}</span>
            </div>
            <div
              onClick={isLoading ? () => {} : onClickScrapHandler}
              className={`${basicDivStyle} ${
                data.hasScrapped ? liekdDiv : normalDiv
              } ${userActive}`}
            >
              <Icons
                path={scrapIcon}
                fill={data.hasScrapped ? '#00C092' : '#404040'}
              />
              <span>{data.scrapSize}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailButtons;
