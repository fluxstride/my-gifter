import { ReactNode, useMemo } from 'react';
import authContext from './authContext';
import useAuth from '../hooks/useAuth';

function AuthProvider({ children }: { children: ReactNode }) {
  const { loading, signup, login, user, logout } = useAuth();

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      signup,
    }),
    [loading, login, logout, signup, user],
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
