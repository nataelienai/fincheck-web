import { createContext, useCallback, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';

interface AuthContextValue {
  isSignedIn: boolean;
  signin: (accessToken: string) => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return Boolean(accessToken);
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setIsSignedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, signin }}>
      {children}
    </AuthContext.Provider>
  );
}
