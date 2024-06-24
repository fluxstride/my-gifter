/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export function AuthRoute() {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }

  return !user ? <div>Loading...</div> : <Outlet />;
}

export function NonAuthRoute() {
  const { user, isLoading } = useAuth();

  if (!isLoading && user) {
    return <Navigate to="/dashboard" />;
  }

  return isLoading || (!isLoading && !!user) ? (
    <div>Loading ...</div>
  ) : (
    <Outlet />
  );
}
