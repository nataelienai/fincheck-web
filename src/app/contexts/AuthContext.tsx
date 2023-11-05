import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LaunchScreen } from '../../view/components/LaunchScreen';
import { localStorageKeys } from '../config/localStorageKeys';
import { User } from '../entities/User';
import { usersService } from '../services/usersService';

interface AuthContextValue {
  isSignedIn: boolean;
  user?: User;
  signin: (accessToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return Boolean(accessToken);
  });

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: usersService.me,
    enabled: isSignedIn,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setIsSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.clear();

    setIsSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: isSignedIn && isSuccess,
        user: data,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
