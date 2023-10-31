import { iconsMap } from './iconsMap';

export type BankAccountType = keyof typeof iconsMap;

interface BankAccountTypeIconProps {
  type: BankAccountType;
}

export function BankAccountTypeIcon({ type }: BankAccountTypeIconProps) {
  const Icon = iconsMap[type];

  return <Icon />;
}
