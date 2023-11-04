import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderPosition, setSliderPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderPosition,
    setSliderPosition,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal,
  };
}
