'use client';
import { back } from '@/utils/Icon';
import Icons from '../common/Icons';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import { MouseEvent, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageState, formDataState } from '@/recoil/BoardStates';
import ModalOutside from '../modal/ModalOutside';
import Warning from './modal/Warning';
import ModalPortal from '../modal/ModalPortal';

const WriteHeader = () => {
  const formData = useRecoilValue(formDataState);
  const imageState = useRecoilValue(ImageState);
  const [openConfirm, setOpenConfirm] = useState(false);

  const router = useRouter();
  const onClickToBack = () => {
    setOpenConfirm(true);
    // router.back();
  };

  const onSubmit = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const data = new FormData();
      const post = {
        category: formData.category,
        content: formData.content,
        hashtag: '#' + formData.hashTag.join('#'),
        lat: formData.lat,
        lng: formData.lng,
        gu: '강남구',
        dong: '신사동',
      };

      data.append(
        'post',
        new Blob([JSON.stringify(post)], { type: 'application/json' }),
      );
      if (imageState) {
        imageState.forEach((file) => {
          data.append('photos', file);
        });
      }

      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      const response = await fetch('/api/write', {
        method: 'POST',
        body: data,
      }).then((response) => response.json());
      alert(response);
    },
    [formData, imageState],
  );

  return (
    <>
      <div className="h-16 mt-4 w-full flex justify-between items-center px-6">
        <div className="flex items-center gap-5">
          {<Icons path={back} onClick={onClickToBack} />}
          <span className="text-[1.1rem] font-semibold">글 작성하기</span>
        </div>
        <div className="w-20 h-8 text-white">
          <Button
            title="등록하기"
            size="full"
            bgColor="bg-neutral-200"
            className="text-white"
            onClick={(e) => onSubmit(e)}
          />
        </div>
      </div>
      {openConfirm && (
        <ModalPortal nodeName="confirmPortal">
          <ModalOutside
            onClose={() => setOpenConfirm(false)}
            className=" overflow-hidden p-2 bg-white w-4/5 h-1/2 py-10 rounded-2xl max-w-7xl"
          >
            <Warning />
          </ModalOutside>
        </ModalPortal>
      )}
    </>
  );
};

export default WriteHeader;
