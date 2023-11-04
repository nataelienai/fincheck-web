import { createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  toggleValuesVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    const storedValue = localStorage.getItem(
      localStorageKeys.ARE_VALUES_VISIBLE,
    );

    return storedValue !== 'false';
  });
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

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

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
