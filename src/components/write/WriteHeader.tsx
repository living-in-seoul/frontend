'use client';
import { back } from '@/utils/Icon';
import Icons from '../common/Icons';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import { MouseEvent, useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ImageState, formDataState } from '@/recoil/BoardStates';
import ModalOutside from '../modal/ModalOutside';
import Warning from './modal/Warning';
import ModalPortal from '../modal/ModalPortal';
import BeatLoader from '../common/Spinner';
import { initialForm } from '@/utils/constants/constants';
import { detailState } from '@/recoil/mapStates';
import toast from 'react-hot-toast';

const WriteHeader = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useRecoilState(formDataState);
  const [imageState, setImageState] = useRecoilState(ImageState);
  const [detailValue, setdetailState] = useRecoilState(detailState);
  const router = useRouter();

  const onClickToBack = useCallback(() => {
    setOpenConfirm(true);
  }, []);

  const resetStates = () => {
    setFormData(initialForm);
    setImageState(null);
    setdetailState(null);
  };

  const onConfirmToBack = () => {
    resetStates();
    router.back();
  };

  const checkAllFilled = (data: RequestBoardWrite) => {
    for (let key in data) {
      const value = data[key as keyof RequestBoardWrite];

      if (value === null || value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
    }
    return true;
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    const post = {
      category: formData.category,
      content: formData.content,
      hashtag: '#' + formData.hashTag.join('#'),
      lat: formData.lat,
      lng: formData.lng,
      gu: formData.gu,
      address: formData.address,
      lname: formData.lname,
    };

    data.append(
      'post',
      new Blob([JSON.stringify(post)], { type: 'application/json' }),
    );

    if (imageState) {
      imageState.forEach((file) => {
        data.append('photos', file);
      });
    } else {
      data.append('photos', new Blob([]));
    }

    const tokenValidResponse = await fetch('/api/user', {
      method: 'GET',
    });
    console.log(post);

    if (tokenValidResponse.status === 200) {
      try {
        const res = await fetch('/api/write', {
          method: 'POST',
          body: data,
        });
        const message = await res.json();
        setImageState(null);
        resetStates();
        router.back();
      } catch (e) {
        toast('모든 필드를 입력해주세요.', {
          icon: '❕',
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            fontSize: '15px',
          },
        });
      }
    } else {
      alert('로그인 모달 나와주세요');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full h-full flex justify-between items-center px-6 py-4  ">
        <div className="flex items-center gap-5 cursor-pointer">
          {<Icons path={back} onClick={onClickToBack} />}
          <span className="text-[1.1rem] font-semibold">글 작성하기</span>
        </div>
        <div className="w-20 h-8 text-white">
          <Button
            title={
              isLoading ? <BeatLoader size={10} color="#2DDAB0" /> : '등록하기'
            }
            size="full"
            bgColor={checkAllFilled(formData) ? 'bg-primary' : 'bg-gray-200'}
            textColor="text-white"
            className="text-sm font-semibold"
            onClick={(e) => onSubmit(e)}
            disable={isLoading}
          />
        </div>
      </div>
      {openConfirm && (
        <ModalPortal nodeName="confirmPortal">
          <ModalOutside
            onClose={() => setOpenConfirm(false)}
            className="  max-w-sm overflow-hidden p-2 bg-white w-4/5 py-7 rounded-xl "
          >
            <Warning
              mainText="작성 중인 글을 취소하시겠습니까?"
              subText="작성 취소된 글은 저장되지 않습니다."
              boldText="취소"
              onConfirm={onConfirmToBack}
              onCancel={() => setOpenConfirm(false)}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </>
  );
};

export default WriteHeader;
