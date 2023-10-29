import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../app/hooks/useAuth';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (isSignedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
