import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderPosition, setSliderPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { data: accounts = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
  });

  const totalBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0,
    );
  }, [accounts]);

  return {
    sliderPosition,
    setSliderPosition,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    totalBalance,
  };
}
