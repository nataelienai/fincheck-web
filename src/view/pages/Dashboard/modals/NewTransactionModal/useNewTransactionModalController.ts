import { useDashboard } from '../../components/DashboardContext/useDashboard';

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal,
  };
}
