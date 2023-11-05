import { createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';
import { BankAccount } from '../../../../../app/entities/BankAccount';

type TransactionType = 'INCOME' | 'EXPENSE';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: TransactionType | null;
  toggleValuesVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  openNewTransactionModal: (type: TransactionType) => void;
  closeNewTransactionModal: () => void;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: BankAccount | null;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    const storedValue = localStorage.getItem(
      localStorageKeys.ARE_VALUES_VISIBLE,
    );

    return storedValue !== 'false';
  });
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] =
    useState<TransactionType | null>(null);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<BankAccount | null>(null);

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.ARE_VALUES_VISIBLE,
      JSON.stringify(areValuesVisible),
    );
  }, [areValuesVisible]);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: TransactionType) => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null);
    setIsEditAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        newTransactionType,
        isEditAccountModalOpen,
        accountBeingEdited,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        openEditAccountModal,
        closeEditAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
