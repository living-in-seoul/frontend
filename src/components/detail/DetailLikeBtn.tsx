'use client';

import { largeEmptyHeart, largeHeart } from '@/utils/Icon';
import { useState, useTransition } from 'react';
import Icons from '@/components/common/Icons';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import { AuthOpenModalState } from '@/recoil/authStates';
import { Like } from '@/utils/Icon';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePosts from '@/hooks/usePosts';
import { communityKeyState } from '@/recoil/communityStates';
import AuthModal from '@/app/(nav)/community/AuthModal';

interface CommunityLikeBtnProps {
  likeSize: number;
  postId: number;
  hasLiked: boolean;
}

const DetailLikeBtn = ({
  likeSize,
  postId,
  hasLiked,
}: CommunityLikeBtnProps) => {
  //   const [authOpenModal, setAuthOpenModal] = useRecoilState(AuthOpenModalState);
  //   const { setLike } = usePosts(communityKeyState);
  //   const [isPending, startTransition] = useTransition();
  //   const [LikeState, setLikeState] = useState<number>(likeSize);
  //   const [hasLikeState, setHasLikeState] = useState<boolean | undefined>(
  //     hasLiked,
  //   );
  //   const onClickHandler = async () => {
  //     const response = await fetch(`/api/comment/like/${postId}`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //     }).then((response) => response.json());
  //     startTransition(() => {
  //       setLikeState((prev) => (hasLikeState ? prev + 1 : prev - 1));
  //       setHasLikeState((prev) => !prev);
  //     });
  //   useEffect(() => {
  //     return () => {
  //       setAuthOpenModal(false);
  //       document.body.style.overflow = 'auto';
  //     };
  //   }, [setAuthOpenModal]);
  //   const likeHandler = () => {
  //     setLike(postId);
  //   };
  //   switch (type) {
  //     case 'detail':
  //       return (
  //         <>
  //           {!hasLikeState ? (
  //             <div
  //               onClick={onClickHandler}
  //               className="relative flex justify-center items-center"
  //             >
  //               <Icons path={largeHeart} fill="#404040" />
  //               <span className="absolute text-white ">{LikeState}</span>
  //             </div>
  //           ) : (
  //             <div
  //               onClick={onClickHandler}
  //               className="relative flex justify-center items-center"
  //             >
  //               <Icons
  //                 path={largeEmptyHeart}
  //                 fill="none"
  //                 option={{ stroke: '#B8B8B8' }}
  //               />
  //               <span className="absolute  ">{LikeState}</span>
  //             </div>
  //           )}
  //           {authOpenModal && (
  //             <ModalPortal nodeName="portalSignin">
  //               <ModalOutside
  //                 className="max-w-md scroll overflow-hidden bg-white w-4/5 px-10 rounded-lg shadow-sm py-10"
  //                 onClose={() => {
  //                   setAuthOpenModal(false);
  //                   document.body.style.overflow = 'auto';
  //                 }}
  //               >
  //                 <AuthModal />
  //               </ModalOutside>
  //             </ModalPortal>
  //           )}
  //         </>
  //       );
  //     case 'comment':
  //       return (
  //         <div className="flex gap-2">
  //           {hasLiked ? (
  //             <div>
  //               <Icons
  //                 fill="red"
  //                 className={'cursor-pointer'}
  //                 path={Like}
  //                 option={{
  //                   fill: '##404040',
  //                 }}
  //               />
  //             </div>
  //           ) : (
  //             <div>
  //               <Icons
  //                 path={Like}
  //                 className={'cursor-pointer'}
  //                 option={{
  //                   fill: '##404040',
  //                 }}
  //               />
  //             </div>
  //           )}
  //           <div className="text-neutral-700 text-xs font-normal leading-3">
  //             {likeSize}
  //           </div>
  //           {authOpenModal && (
  //             <ModalPortal nodeName="portalSignin">
  //               <ModalOutside
  //                 className="max-w-md scroll overflow-hidden bg-white w-4/5 px-10 rounded-lg shadow-sm py-10"
  //                 onClose={() => {
  //                   setAuthOpenModal(false);
  //                   document.body.style.overflow = 'auto';
  //                 }}
  //               >
  //                 <AuthModal />
  //               </ModalOutside>
  //             </ModalPortal>
  //           )}
  //         </div>
  //       );
  //   }
  // };
};
export default DetailLikeBtn;
// interface DetailLikeBtnProps {
//   likeSize: number;
//   postId: number;
//   hasLiked?: boolean;
//   type?: 'detail' | 'comment';
// }

// const DetailLikeBtn = ({
//   likeSize,
//   postId,
//   hasLiked,
//   type = 'comment',
// }: DetailLikeBtnProps) => {
