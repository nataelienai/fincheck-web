import { useState } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const [sliderPosition, setSliderPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const { areValuesVisible } = useDashboard();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    sliderPosition,
    setSliderPosition,
    areValuesVisible,
    isInitialLoading: false,
    isLoadingTransactions: false,
    transactions: [],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
