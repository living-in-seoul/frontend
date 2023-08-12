// import {
//   ChangeHandler,
//   FieldError,
//   FieldErrors,
//   RefCallBack,
// } from 'react-hook-form';

// /** errorState : error.email , errorMessage: error.email.message */
// interface AuthInputProps {
//   typeProps: {
//     onChange: ChangeHandler;
//     onBlur: ChangeHandler;
//     ref: RefCallBack;
//     name: 'email';
//   };
//   isSubmitted: boolean;
//   errorsState: FieldError;
//   errorMessage: FieldError;
//   label: string;
//   formNmae: string;
// }

// const AuthInput = ({
//   typeProps,
//   isSubmitted,
//   errorsState,
//   errorMessage,
//   label,
//   formNmae,
// }: AuthInputProps) => {
//   return (
//     <div>
//       <label>{label}</label>
//       <input
//         id={formNmae}
//         type="text"
//         className="w-full h-14 text-sm border border-zinc-400 rounded-xl"
//         placeholder="ex) seuol123@vival.com"
//         {...typeProps}
//         aria-invalid={
//           isSubmitted ? (errorsState ? 'true' : 'false') : undefined
//         }
//       />
//       {errorsState && <small>{errorMessage}</small>}
//     </div>
//   );
// };

// export default AuthInput;
