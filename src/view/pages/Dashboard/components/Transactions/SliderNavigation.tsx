import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

interface SliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function SliderNavigation({
  isBeginning,
  isEnd,
}: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <>
      <div className="absolute left-0 top-0 z-10 w-20 bg-gradient-to-r from-gray-100 via-gray-100 via-40%">
        <button
          className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-gray-200 transition-colors disabled:opacity-40"
          onClick={() => swiper.slidePrev()}
          disabled={isBeginning}
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="absolute right-0 top-0 z-10 w-20 flex justify-end bg-gradient-to-l from-gray-100 via-gray-100 via-40%">
        <button
          className="py-3 pl-3.5 pr-2.5 rounded-full enabled:hover:bg-gray-200 transition-colors disabled:opacity-40"
          onClick={() => swiper.slideNext()}
          disabled={isEnd}
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </>
  );
}
