'use client';
import UserProfile from '../../item/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  buttonRefState,
  commentKeyState,
  inputTextRefState,
  totalCommentState,
} from '@/recoil/commentState';
import ModalPortal from '@/components/modal/ModalPortal';
import ModalOutside from '@/components/modal/ModalOutside';
import { commentModalArray, reportModalArray } from '@/utils/constants/modal';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Icons from '@/components/common/Icons';
import { detailColThreeDotIcon } from '@/utils/Icon';

const DetailReCommentItem = ({
  reCommentData,
}: {
  reCommentData: ReComment;
}) => {
  const commentKey = useRecoilValue(commentKeyState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const buttonRef = useRecoilValue(buttonRefState);
  const inputRef = useRecoilValue(inputTextRefState);
  const [totalComment, setTotalComment] = useRecoilState(totalCommentState);
  const [isReCommentChange, setIsReCommentChange] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const {
    createdAt,
    nickname,
    reComment,
    reCommentHasLiked,
    reCommentId,
    userImg,
  } = reCommentData;
  const modalArray =
    username === nickname ? commentModalArray : reportModalArray;
  useEffect(() => {
    const username = localStorage.getItem('nickname');
    username && setUsername(username);
  }, []);

  const handleClickOutside = useCallback(
    (e: any) => {
      if (
        inputRef?.current &&
        !inputRef.current.contains(e.target) &&
        buttonRef?.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setTotalComment((prev) => ({
          ...prev,
          reCommentChange: false,
          isComment: true,
          isReComment: false,
        }));
      }
    },
    [buttonRef, inputRef, setTotalComment],
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const onClickDeleteHandler = async () => {
    try {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        const response = await fetch(`/api/comment/re/${reCommentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then(() => {
            toast.success('삭제하기 완료');
            mutate(commentKey);
          });
      }
    } catch (error) {
      toast.error('삭제하기 실패');
    } finally {
      setOpenModal(false);
    }
  };
  const onClickChagneHandler = () => {
    if (inputRef?.current) {
      inputRef.current?.focus();
      setTotalComment((prev) => ({
        ...prev,
        reCommentChange: !prev.reCommentChange,
        reCommentId,
        isComment: false,
        isReComment: true,
      }));
    }
    setOpenModal(false);
  };
  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <UserProfile
          createdAt={createdAt}
          nickname={nickname}
          userImg={userImg}
        />
        <Icons
          path={detailColThreeDotIcon}
          fill="#404040"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 w-5/6 ml-auto">
        <span className="bg-neutral-100 p-2 rounded-lg text-xs">
          {reComment}
        </span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center"></div>
          <div className="flex flex-row gap-1 items-center"></div>
        </div>
      </div>
      {openModal && (
        <ModalPortal nodeName="detailPortal">
          <ModalOutside
            className=" bg-white shadow-sm bottom-0 w-full"
            onClose={() => {
              setOpenModal(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <article>
              {modalArray.map((modal, index) => (
                <div key={index}>
                  <div
                    className={`border-t-2 py-3 flex justify-center border-collapse ${modal.color}`}
                    onClick={
                      modal.first ? onClickChagneHandler : onClickDeleteHandler
                    }
                  >
                    <span>{modal.text}</span>
                  </div>
                </div>
              ))}
            </article>
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  );
};

export default DetailReCommentItem;
