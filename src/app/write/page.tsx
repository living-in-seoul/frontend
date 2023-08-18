'use client';
import WriteContent from '@/components/write/WriteContent';
import WriteHeader from '@/components/write/WriteHeader';
import WriteTags from '@/components/write/WriteTags';

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
  return (
    <section>
      <WriteHeader />
      <WriteContent />
      <WriteTags />
      <App />
    </section>
  );
};

export default WritePage;
