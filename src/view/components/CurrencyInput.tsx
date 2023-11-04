import { NumericFormat } from 'react-number-format';

export function CurrencyInput() {
  return (
    <NumericFormat
      className="w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      defaultValue={0}
    />
  );
}
