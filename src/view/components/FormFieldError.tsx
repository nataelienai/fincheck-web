import { CrossCircledIcon } from '@radix-ui/react-icons';

interface FormFieldErrorProps {
  error: string;
}

export function FormFieldError({ error }: FormFieldErrorProps) {
  return (
    <div className="flex gap-2 items-center mt-2 text-red-900">
      <CrossCircledIcon />
      <span className="text-xs">{error}</span>
    </div>
  );
}
