'use client';

import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import UploadImageModal from '@/components/write/UploadImageModal';
import WriteContent from '@/components/write/WriteContent';
import WriteHeader from '@/components/write/WriteHeader';
import { ImagePortalState } from '@/recoil/BoardStates';
import { useRecoilState } from 'recoil';

import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  text: string;
};

const App: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const text = watch('text', '');

  const renderStyledText = (text: string) => {
    return text.split(/(\s+)/).map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} style={{ color: 'blue' }}>
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <pre
        style={{
          position: 'absolute',
          zIndex: 1,
          color: 'transparent',
          pointerEvents: 'none',
          whiteSpace: 'pre-wrap',
        }}
      >
        {renderStyledText(text)}
      </pre>
      <textarea
        {...register('text')}
        rows={5}
        cols={50}
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'transparent',
        }}
      />
      <button type="submit">Submit</button>
    </div>
  );
};

const WritePage = () => {
  const [openImagePortal, setOpenImagePortal] =
    useRecoilState(ImagePortalState);

  return (
    <section className="relative">
      <WriteHeader />
      <WriteContent />
      {openImagePortal && (
        <ModalPortal nodeName="imagePortal">
          <ModalOutside
            className="overflow-hidden p-2 bg-white w-4/5 h-1/4 rounded-2xl max-w-7xl"
            onClose={() => setOpenImagePortal(false)}
          >
            <UploadImageModal onClose={() => setOpenImagePortal(false)} />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  );
};

export default WritePage;
