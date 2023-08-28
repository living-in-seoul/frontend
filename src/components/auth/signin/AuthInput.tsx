/** errorState : error.email , errorMessage: error.email.message */
interface AuthInputProps {
  id: string;
  isText?: boolean;
  placeholder: string;
  label: string;
  mainProps: any;
  isSubmitted: any;
  isErrors: any;
  errorsMessage: any | undefined;
}

const AuthInput = ({
  id,
  isText = true,
  placeholder,
  label,
  mainProps,
  isSubmitted,
  isErrors,
  errorsMessage,
}: AuthInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-neutral-500 text-sm ">{label}</label>
      <div>
        <input
          className="w-full h-12 text-base border border-zinc-400 rounded-xl px-4 outline-teal-400"
          autoComplete={isText ? 'username' : 'new-password'}
          id={id}
          type={isText ? 'text' : 'password'}
          placeholder={placeholder}
          {...mainProps}
          aria-invalid={isSubmitted ? (isErrors ? true : false) : undefined}
        />
        {
          <small className="h-10 text-teal-400 text-xs pl-4">
            {isErrors && errorsMessage}
          </small>
        }
      </div>
    </div>
  );
};

export default AuthInput;
