import { useEffect, useState } from 'react';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const [sliderPosition, setSliderPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { areValuesVisible } = useDashboard();
  const { transactions, isFetching, isInitialLoading, refetch } =
    useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter,
    value: TransactionsFilters[TFilter],
  ) {
    if (value === filters[filter]) return;

    setFilters((prevState) => ({
      ...prevState,
      [filter]: value,
    }));
  }

  return {
    sliderPosition,
    setSliderPosition,
    areValuesVisible,
    isInitialLoading,
    isLoadingTransactions: isFetching,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilters,
  };
}
