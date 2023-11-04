import { ComponentProps, forwardRef } from 'react';
import { cn } from '../../app/utils/cn';
import { FormFieldError } from './FormFieldError';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, name, placeholder, error, ...props },
  ref,
) {
  const inputId = id ?? name;

  return (
    <div>
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            'bg-white w-full text-sm rounded-lg border border-gray-500 px-3 pt-4 h-[54px] text-gray-800 peer placeholder-shown:pt-0 placeholder-shown:pb-0 focus:border-gray-800 transition-all outline-none',
            error && '!border-red-900',
          )}
          placeholder=" "
        />

        <label
          htmlFor={inputId}
          className={cn(
            'absolute text-xs leading-none left-[13px] top-2.5 pointer-events-none text-gray-700 peer-autofill:text-xs peer-autofill:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 transition-all',
          )}
        >
          {placeholder}
        </label>
      </div>

      {error && <FormFieldError error={error} />}
    </div>
  );
});
