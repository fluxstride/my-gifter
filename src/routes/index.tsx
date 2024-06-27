import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

export function AuthRoute() {
  const { user, loading } = useAuthContext();

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return !user ? null : <Outlet />;
}

export function NonAuthRoute() {
  const { user, loading } = useAuthContext();

  if (!loading && user) {
    return <Navigate to="/dashboard" />;
  }

  return loading || (!loading && !!user) ? null : <Outlet />;
}
