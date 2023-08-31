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

const WriteHeader = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useRecoilState(formDataState);
  const [imageState, setImageState] = useRecoilState(ImageState);
  const router = useRouter();

  const onClickToBack = useCallback(() => {
    setOpenConfirm(true);
  }, []);

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
    console.log(post);

    data.append(
      'post',
      new Blob([JSON.stringify(post)], { type: 'application/json' }),
    );
    if (imageState) {
      imageState.forEach((file) => {
        data.append('photos', file);
      });
    }

    const tokenValidResponse = await fetch('/api/user', {
      method: 'GET',
    });

    if (tokenValidResponse.status === 200) {
      try {
        const res = await fetch('/api/write', {
          method: 'POST',
          body: data,
        });
        const message = await res.json();
        alert(message);
        setImageState(null);
        router.back();
      } catch (e) {
        alert('게시물 작성 실패!');
      }
    } else {
      alert('로그인 모달 나와주세요');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="h-16 mt-4 w-full flex justify-between items-center px-6">
        <div className="flex items-center gap-5">
          {<Icons path={back} onClick={onClickToBack} />}
          <span className="text-[1.1rem] font-semibold">글 작성하기</span>
        </div>
        <div className="w-20 h-8 text-white">
          <Button
            title={
              isLoading ? <BeatLoader size={10} color="#2DDAB0" /> : '등록하기'
            }
            size="full"
            bgColor="bg-neutral-200"
            className="text-white"
            onClick={(e) => onSubmit(e)}
            disable={isLoading}
          />
        </div>
      </div>
      {openConfirm && (
        <ModalPortal nodeName="confirmPortal">
          <ModalOutside
            onClose={() => setOpenConfirm(false)}
            className=" overflow-hidden p-2 bg-white w-4/5 py-6 rounded-xl max-w-7xl"
          >
            <Warning
              mainText="작성 중인 글을 취소하시겠습니까?"
              subText="작성 취소된 글은 저장되지 않습니다."
              onConfirm={() => router.back()}
              onCancel={() => setOpenConfirm(false)}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </>
  );
};

export default WriteHeader;
