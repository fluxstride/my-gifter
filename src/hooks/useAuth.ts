import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import API from '../api';
import {
  ApiErrorResponse,
  AuthUserAPIResponse,
  ErrorResponse,
  UserData,
} from '../types';

function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    let loadingId;

    try {
      loadingId = toast.loading('Loading');
      const response: AuthUserAPIResponse = await API.get('/user');
      setUser(response.data.data.user);
    } catch (error) {
      setUser(null);
      toast.error(
        (error as ApiErrorResponse).response.data.message ??
          (error as ErrorResponse).message,
      );

      localStorage.removeItem('token');
    } finally {
      setLoading(false);
      toast.dismiss(loadingId);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    let loadingId;
    try {
      setLoading(true);
      loadingId = toast.loading('Logging in');
      const response: AuthUserAPIResponse = await API.post('/login', {
        username,
        password,
      });
      setUser(response.data.data.user);

      const { token } = response.data.data;
      localStorage.setItem('token', token);
      API.defaults.headers.common.Authorization = `Bearer ${token}`;

      toast.success('Login successful');
    } catch (error) {
      toast.error(
        (error as ApiErrorResponse).response.data.message ??
          (error as ErrorResponse).message,
      );
    } finally {
      setLoading(false);
      toast.dismiss(loadingId);
    }
  };

  const signup = async (data: { username: string; password: string }) => {
    try {
      setLoading(true);
      const response: AuthUserAPIResponse = await API.post('/signup', data);

      const { token } = response.data.data;

      localStorage.setItem('token', token);
      API.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { user: signupUser } = response.data.data;
      setUser(signupUser);
    } catch (error) {
      toast.error(
        (error as ApiErrorResponse).response.data.message ??
          (error as ErrorResponse).message,
      );
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

  return {
    user,
    loading,
    login,
    logout,
    signup,
  };
}

export default useAuth;
