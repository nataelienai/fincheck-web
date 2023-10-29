import { createContext } from 'react';

interface AuthContextValue {
  isSignedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ isSignedIn: false }}>
      {children}
    </AuthContext.Provider>
  );
}
