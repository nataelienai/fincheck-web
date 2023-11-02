import { useState } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const [sliderPosition, setSliderPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const { areValuesVisible } = useDashboard();

  return {
    sliderPosition,
    setSliderPosition,
    areValuesVisible,
    isInitialLoading: false,
    isLoadingTransactions: false,
    transactions: [],
  };
}
