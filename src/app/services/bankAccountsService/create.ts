import { httpClient } from '../httpClient';

interface BankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
}
