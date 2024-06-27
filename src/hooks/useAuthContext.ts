import { useContext } from 'react';
import authContext from '../contexts/authContext';

const useAuthContext = () => {
  return useContext(authContext);
};

export default useAuthContext;
