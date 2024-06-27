import { useContext } from 'react';
import usersContext from '../contexts/usersContext';

const useUsersContext = () => {
  return useContext(usersContext);
};

export default useUsersContext;
