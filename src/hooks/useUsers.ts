import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  ApiErrorResponse,
  ErrorResponse,
  User,
  UsersAPIResponse,
} from '../types';
import API from '../api';

function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response: UsersAPIResponse = await API.get('/gifters');

        setUsers(response.data.data.gifters);
      } catch (error) {
        toast.error(
          (error as ApiErrorResponse).response.data.message ??
            (error as ErrorResponse).message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers().catch(() => {});
  }, []);

  const addUser = async (name: string, code: string) => {
    let loadingId;

    try {
      setLoading(true);
      loadingId = toast.loading('Adding user');

      const response: UsersAPIResponse = await API.post('/gifters', {
        name,
        code,
      });

      setUsers(response.data.data.gifters);

      toast.success('User added successfully');
    } catch (error) {
      toast.error(
        (error as ApiErrorResponse).response.data.message ??
          (error as ErrorResponse).message,
      );

      throw Error('Code exists');
    } finally {
      setLoading(false);
      toast.dismiss(loadingId);
    }
  };

  const editUser = async (name?: string, code?: string, userId?: string) => {
    let loadingId;

    try {
      loadingId = toast.loading('Processing request');
      setLoading(true);

      const response: UsersAPIResponse = await API.patch(`/gifters/${userId}`, {
        name,
        code,
      });

      setUsers(response.data.data.gifters);

      toast.success('User updated successfully');
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

  const removeUser = async (userId: string) => {
    try {
      setLoading(true);
      toast.loading('Removing user', { id: 'deleting' });

      const response: UsersAPIResponse = await API.delete(`/gifters/${userId}`);
      setUsers(response.data.data.gifters);
      toast.success('User removed successfully');
    } catch (error) {
      toast.error(
        (error as ApiErrorResponse).response.data.message ??
          (error as ErrorResponse).message,
      );
    } finally {
      toast.dismiss('deleting');
      setLoading(false);
    }
  };

  return { users, loading, addUser, editUser, removeUser };
}

export default useUsers;
