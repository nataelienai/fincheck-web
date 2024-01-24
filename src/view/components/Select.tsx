import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';
import { useState } from 'react';
import { cn } from '../../app/utils/cn';
import { FormFieldError } from './FormFieldError';

interface SelectProps {
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Select({
  error,
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  function handleSelectValue(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 text-sm pointer-events-none',
            selectedValue &&
              'text-xs left-[13px] top-2.5 transition-all translate-y-0',
          )}
        >
          {placeholder}
        </label>

        <RadixSelect.Root value={value} onValueChange={handleSelectValue}>
          <RadixSelect.Trigger
            className={cn(
              'relative bg-white w-full text-sm rounded-lg border border-gray-500 px-3 h-[54px] text-gray-800 focus:border-gray-800 transition-all outline-none text-left pt-4',
              error && '!border-red-900',
            )}
          >
            <RadixSelect.Value />

            <RadixSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content className="z-[51] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgb(0,0,0,0.1)]">
              <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>

              <RadixSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    value={option.value}
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>

              <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>

      {error && <FormFieldError error={error} />}
    </div>
  );
}
