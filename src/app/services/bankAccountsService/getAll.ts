import { BankAccount } from '../../entities/BankAccount';
import { httpClient } from '../httpClient';

type BankAccountsResponse = BankAccount[];

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');

  return data;
}
