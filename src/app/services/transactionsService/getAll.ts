import { Transaction } from '../../entities/Transaction';
import { httpClient } from '../httpClient';

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
};

type TransactionsResponse = Transaction[];

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters,
  });

  return data;
}
