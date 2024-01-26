import { NumericFormat } from 'react-number-format';
import { cn } from '../../app/utils/cn';
import { FormFieldError } from './FormFieldError';

interface CurrencyInputProps {
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function CurrencyInput({ error, value, onChange }: CurrencyInputProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          error && 'text-red-900',
        )}
        value={value}
        onValueChange={({ value }) => onChange?.(value)}
      />

      {error && (
        <div className="absolute top-full left-0">
          <FormFieldError error={error} />
        </div>
      )}
    </div>
  );
}
