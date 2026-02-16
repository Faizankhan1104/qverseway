// src/components/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Agar user already logged in hai, toh redirect karo
  if (isAuthenticated) {
    // Role ke basis pe redirect
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/student" replace />;
  }

  return children;
};

export default PublicRoute;