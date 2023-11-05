export interface BankAccount {
  id: string;
  name: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  initialBalance: number;
  currentBalance: number;
  color: string;
}
