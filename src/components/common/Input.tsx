'use client';
import { InputRefState } from '@/recoil/homeState';
import React, { FormEvent, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

interface SearchInputProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent) => void;
  onFocus?: () => void;
  onClick?: () => void;
  rightElement?: JSX.Element;
  leftElement?: JSX.Element;
  formColor?: string;
  inputColor?: string;
  className?: string;
}

const Input = ({
  placeholder,
  value,
  onChange,
  onSubmit,
  onFocus,
  onClick,
  rightElement,
  formColor,
  inputColor,
  className,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setInputRef = useSetRecoilState(InputRefState);

  useEffect(() => {
    if (inputRef.current) {
      setInputRef({ current: inputRef.current });
    }
  }, []);
  return (
    <section className="flex justify-center items-center ">
      <form
        className={`rounded-3xl w-full h-9 flex items-center justify-between shadow-sm px-4 ${
          formColor ? formColor : 'bg-white'
        }`}
        onSubmit={onSubmit}
      >
        <input
          ref={inputRef}
          className={`outline-none text-sm w-full pl-3 ${inputColor} ${className}`}
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
          onChange={onChange}
          onClick={onClick}
        ></input>
        {rightElement}
      </form>
    </section>
  );
};

export default Input;
