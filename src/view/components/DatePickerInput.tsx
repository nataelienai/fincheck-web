import { useState } from 'react';
import { cn } from '../../app/utils/cn';
import { formatDate } from '../../app/utils/formatDate';
import { DatePicker } from './DatePicker';
import { FormFieldError } from './FormFieldError';
import { Popover } from './Popover';

interface DatePickerInputProps {
  error?: string;
}

export function DatePickerInput({ error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'relative bg-white w-full text-sm rounded-lg border border-gray-500 px-3 pt-4 h-[54px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left',
              error && '!border-red-900',
            )}
          >
            <span className="absolute text-xs leading-none left-[13px] top-2.5 pointer-events-none text-gray-700 peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 transition-all">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Popover.Content>
      </Popover.Root>

      {error && <FormFieldError error={error} />}
    </div>
  );
}
