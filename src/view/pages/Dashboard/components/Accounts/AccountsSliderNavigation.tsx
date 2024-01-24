import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

interface AccountsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
  isNeeded: boolean;
}

export function AccountsSliderNavigation({
  isBeginning,
  isEnd,
  isNeeded,
}: AccountsSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-teal-800 transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={!isNeeded || isBeginning}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>
      <button
        className="py-3 pl-3.5 pr-2.5 rounded-full enabled:hover:bg-teal-800 transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={!isNeeded || isEnd}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
