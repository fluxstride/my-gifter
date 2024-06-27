import { ReactNode, useMemo } from 'react';

import usersContext from './usersContext';
import useUsers from '../hooks/useUsers';

function UsersProvider({ children }: { children: ReactNode }) {
  const { loading, users, addUser, editUser, removeUser } = useUsers();

  const values = useMemo(
    () => ({
      loading,
      users,
      addUser,
      editUser,
      removeUser,
    }),
    [addUser, removeUser, editUser, loading, users],
  );
  return (
    <usersContext.Provider value={values}>{children}</usersContext.Provider>
  );
}

export default UsersProvider;
