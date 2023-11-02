import { Swiper, SwiperSlide } from 'swiper/react';

import { EyeIcon } from '../../../../components/icons/EyeIcon';

import { AccountCard } from './AccountCard';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { useAccountsController } from './useAccountsController';

import { PlusIcon } from '@radix-ui/react-icons';
import 'swiper/css';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Spinner } from '../../../../components/Spinner';

export function Accounts() {
  const {
    sliderPosition,
    setSliderPosition,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 lg:p-10 flex flex-col gap-10 lg:gap-0">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/40 fill-white" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="leading-6 tracking-[-0.5px] text-white">
              Saldo total
            </span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-[32px] leading-none tracking-[-1px] text-white font-bold',
                  !areValuesVisible && 'blur-md',
                )}
              >
                {formatCurrency(1000)}
              </strong>

              <button
                className="w-12 h-12 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            {accounts.length === 0 && (
              <>
                <div className="mb-4 py-3">
                  <strong className="text-white text-lg leading-6 tracking-[-1px] font-bold">
                    Minhas Contas
                  </strong>
                </div>

                <button className="h-52 p-4 border-2 border-dotted border-teal-600 rounded-2xl flex flex-col items-center justify-center gap-4 text-white">
                  <div className="w-11 h-11 rounded-full border-2 border-dotted border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              // Swiper bugs when its parent is flex
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth > 500 ? 2.1 : 1.2}
                  onSlideChange={(swiper) => {
                    setSliderPosition({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div
                    className="flex items-center justify-between mb-4"
                    slot="container-start"
                  >
                    <strong className="text-white text-lg leading-6 tracking-[-1px] font-bold">
                      Minhas Contas
                    </strong>

                    <AccountsSliderNavigation
                      isBeginning={sliderPosition.isBeginning}
                      isEnd={sliderPosition.isEnd}
                    />
                  </div>

                  <SwiperSlide>
                    <AccountCard
                      color="#7950F2"
                      name="Nubank"
                      balance={1000}
                      type="CHECKING"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard
                      color="#333"
                      name="XP"
                      balance={1000}
                      type="INVESTMENT"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard
                      color="#0f0"
                      name="Carteira"
                      balance={1000}
                      type="CASH"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
