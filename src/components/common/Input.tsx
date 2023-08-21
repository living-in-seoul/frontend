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
}: SearchInputProps) => {
  return (
    <section className="w-full flex justify-center items-center ">
      <form
        className="ml-4 w-4/5 rounded-[1.875rem] bg-white h-[38px] flex items-center justify-between shadow-sm border border-neutral-300 px-4"
        onSubmit={onSubmit}
      >
        <input
          className="outline-none text-sm w-full pl-3"
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
          onChange={onChange}
          onClick={onClick}
        ></input>
      </form>
      <ul></ul>
    </section>
  );
};

export default Input;
