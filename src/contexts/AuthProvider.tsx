import { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api';
import authContext from './authContext';

export interface UserData {
  id: 'string';
  username: string;
}

interface UserAPIResponse {
  data: { data: { user: UserData; token: string } };
}

interface ErrorResponse {
  response: {
    data: { message: string };
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response: UserAPIResponse = await API.get('/user');
      setUser(response.data.data.user);
    } catch (error) {
      setUser(null);
      toast.error((error as ErrorResponse).response.data.message);

      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      fetchUser().catch(() => {});
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    let loadingId;
    try {
      setLoading(true);
      loadingId = toast.loading('Logging in');
      const response: UserAPIResponse = await API.post('/login', {
        username,
        password,
      });
      setUser(response.data.data.user);

      const { token } = response.data.data;
      localStorage.setItem('token', token);
      API.defaults.headers.common.Authorization = `Bearer ${token}`;

      toast.success('Login successful');
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    } finally {
      setLoading(false);
      toast.dismiss(loadingId);
    }
  };

  const signup = async (data: { username: string; password: string }) => {
    try {
      setLoading(true);
      const response: UserAPIResponse = await API.post('/signup', data);

      const { token } = response.data.data;

      localStorage.setItem('token', token);
      API.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { user: signupUser } = response.data.data;
      setUser(signupUser);
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      delete API.defaults.headers.common.Authorization;
      setUser(null);
    } catch (error) {
      toast.error('logout failed');
    }
  };

  return (
    <authContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        loading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
