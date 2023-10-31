import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';

export function useAccountsController() {
  const windowWidth = useWindowWidth();

  const [sliderPosition, setSliderPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderPosition,
    setSliderPosition,
    windowWidth,
  };
}
