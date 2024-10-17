import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const location = useLocation();
  const jwt = localStorage.getItem('jwt');

  return !jwt ? (
    <Navigate to={`signin?next=${location.pathname}`} replace={true} />
  ) : (
    <Outlet />
  );
};
