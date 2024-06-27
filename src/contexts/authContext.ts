import { createContext } from 'react';
import { AuthUser } from '../types';

interface AuthContext {
  loading: boolean;
  user: Omit<AuthUser, 'password'> | null;
  signup: (user: AuthUser) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = createContext<AuthContext>({
  loading: false,
  user: null,
  signup: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export default authContext;
