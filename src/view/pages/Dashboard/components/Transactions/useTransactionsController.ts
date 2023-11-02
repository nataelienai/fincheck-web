import { useState } from 'react';

export function useTransactionsController() {
  const [sliderPosition, setSliderPosition] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return { sliderPosition, setSliderPosition };
}
