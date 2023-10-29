import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ className, ...props }: ButtonProps) {
  const buttonClassName = className ? className + ' ' : '';

  return (
    <button
      {...props}
      className={buttonClassName?.concat(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all tracking-[-0.5px]',
      )}
    ></button>
  );
}
