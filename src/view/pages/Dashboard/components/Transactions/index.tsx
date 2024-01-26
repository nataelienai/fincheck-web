import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { formatDate } from '../../../../../app/utils/formatDate';
import emptyStateIllustration from '../../../../../assets/empty-state.svg';
import { Spinner } from '../../../../components/Spinner';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { EditTransactionModal } from '../../modals/EditTransactionModal';
import { FiltersModal } from './FiltersModal';
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
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={(type) => handleChangeFilters('type', type)}
                selectedType={filters.type}
              />

              <button
                className="p-3 hover:bg-gray-200 rounded-full transition-colors"
                onClick={handleOpenFiltersModal}
              >
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                spaceBetween={16}
                className="px-12"
                onSlideChange={(swiper) => {
                  setSliderPosition({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                  });

                  handleChangeFilters('month', swiper.realIndex);
                }}
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

          <div className="mt-4 flex-1 overflow-y-auto">
            {isLoadingTransactions && (
              <div className="flex flex-col justify-center items-center min-h-64 lg:min-h-0 lg:h-full">
                <Spinner />
              </div>
            )}

            {!hasTransactions && !isLoadingTransactions && (
              <div className="flex flex-col justify-center items-center min-h-64 lg:min-h-0 lg:h-full">
                <img src={emptyStateIllustration} alt="Estado vazio" />
                <p className="text-gray-700 text-center">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoadingTransactions && (
              <div className="pb-10 lg:pb-0 space-y-2">
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditTransactionModalOpen}
                    onClose={handleCloseEditTransactionModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    role="button"
                    onClick={() => handleOpenEditTransactionModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === 'EXPENSE' ? 'expense' : 'income'
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>

                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'tracking-[-0.5px] font-medium',
                        transaction.type === 'EXPENSE'
                          ? 'text-red-800'
                          : 'text-green-800',
                        !areValuesVisible && 'blur-[8px]',
                      )}
                    >
                      {`${
                        transaction.type === 'EXPENSE' ? '-' : '+'
                      } ${formatCurrency(transaction.value)}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
