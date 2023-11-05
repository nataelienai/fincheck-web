import { useEffect, useState } from 'react';
import { Transaction } from '../../../../../app/entities/Transaction';
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
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<Transaction | null>(null);

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

  function handleApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters('bankAccountId', filters.bankAccountId);
    handleChangeFilters('year', filters.year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditTransactionModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditTransactionModalOpen(true);
  }

  function handleCloseEditTransactionModal() {
    setTransactionBeingEdited(null);
    setIsEditTransactionModalOpen(false);
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
    handleApplyFilters,
    isEditTransactionModalOpen,
    transactionBeingEdited,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal,
  };
}
