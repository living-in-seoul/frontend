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
  const [openConfirm, setOpenConfirm] = useState(false);
  const formData = useRecoilValue(formDataState);
  const imageState = useRecoilValue(ImageState);
  const router = useRouter();

  const onClickToBack = useCallback(() => {
    setOpenConfirm(true);
  }, []);

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

/*
1. submit 버튼 누른 후 next server api로 요청
2. cookie에서 AT 꺼내오기 (있음 -> status 200)
3. 없음 -> RT 가지고 refresh token 요청하기
4. 200 -> token 날라오면 set하기(신범님 코드 보기 (signin))
5. set 성공? client에 status 200 / set 실패? 405 보내고 client에서 로그인하라고 모달 띄우기
 */
