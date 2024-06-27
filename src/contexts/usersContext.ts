import { createContext } from 'react';
import { User } from '../types';

interface UsersContext {
  loading: boolean;
  users: User[] | null;
  addUser: (name: string, code: string) => Promise<void>;
  editUser: (name?: string, code?: string, userId?: string) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
}

const usersContext = createContext<UsersContext>({
  loading: false,
  users: null,
  addUser: () => Promise.resolve(),
  editUser: () => Promise.resolve(),
  removeUser: () => Promise.resolve(),
});

export default usersContext;
