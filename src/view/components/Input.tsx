import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  name: string;
}

export function Input({ id, name, placeholder, ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        id={name}
        name={inputId}
        className="bg-white w-full text-sm rounded-lg border border-gray-500 px-3 pt-6 pb-2 h-[54px] text-gray-800 peer placeholder-shown:pt-0 placeholder-shown:pb-0 focus:border-gray-800 transition-all outline-none"
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs leading-none left-[13px] top-2.5 pointer-events-none text-gray-700 peer-autofill:text-xs peer-autofill:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:top-[17px] transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
}
