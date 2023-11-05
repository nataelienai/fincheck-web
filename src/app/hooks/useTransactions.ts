import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactionsService';
import { TransactionsFilters } from '../services/transactionsService/getAll';

export function useTransactions(filters: TransactionsFilters) {
  const {
    data: transactions = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  });

  return { transactions, isFetching, isInitialLoading: isLoading, refetch };
}
