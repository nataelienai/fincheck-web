import { httpClient } from '../httpClient';

type BankAccountsResponse = {
  id: string;
  name: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  initialBalance: number;
  currentBalance: number;
  color: string;
}[];

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');

  return data;
}
