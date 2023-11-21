import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export const ProtectedPages = () => {
  const { user } = useAuth();

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};