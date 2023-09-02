'use client';
import { FormEvent } from 'react';

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
}

const Input = ({
  placeholder,
  value,
  onChange,
  onSubmit,
  onFocus,
  onClick,
  rightElement,
  leftElement,
  formColor,
  inputColor,
}: SearchInputProps) => {
  return (
    <section className="flex justify-center items-center ">
      <form
        className={`rounded-3xl w-full h-9 flex items-center justify-between shadow-sm border border-neutral-300 px-4 ${
          formColor ? formColor : 'bg-white'
        }`}
        onSubmit={onSubmit}
      >
        <input
          className={`outline-none text-sm w-full pl-3 ${inputColor}`}
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
          onChange={onChange}
          onClick={onClick}
        ></input>
        {rightElement}
      </form>
      <ul></ul>
    </section>
  );
};

export default Input;
