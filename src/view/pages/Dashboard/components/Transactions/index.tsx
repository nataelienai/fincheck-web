import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import emptyStateIllustration from '../../../../../assets/empty-state.svg';
import { Spinner } from '../../../../components/Spinner';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { useTransactionsController } from './useTransactionsController';

export function Transactions() {
  const {
    sliderPosition,
    setSliderPosition,
    areValuesVisible,
    isInitialLoading,
    isLoadingTransactions,
    transactions,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-6 lg:p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown />

              <button className="p-3">
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                spaceBetween={16}
                className="px-12"
                onSlideChange={(swiper) =>
                  setSliderPosition({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                  })
                }
              >
                <SliderNavigation
                  isBeginning={sliderPosition.isBeginning}
                  isEnd={sliderPosition.isEnd}
                />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoadingTransactions && (
              <div className="flex flex-col justify-center items-center h-full">
                <Spinner />
              </div>
            )}

            {!hasTransactions && !isLoadingTransactions && (
              <div className="flex flex-col justify-center items-center h-full">
                <img src={emptyStateIllustration} alt="Estado vazio" />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoadingTransactions && (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" category="food" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>

                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'text-red-800 tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-[8px]',
                    )}
                  >
                    - {formatCurrency(1234)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Salário
                      </strong>

                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'text-green-800 tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-[8px]',
                    )}
                  >
                    + {formatCurrency(1234)}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
