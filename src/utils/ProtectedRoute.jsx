import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no role restriction, allow access
  if (!allowedRoles) {
    return children;
  }

  // Check role permission
  if (allowedRoles && user?.role && allowedRoles.includes(user.role)) {
    return children;
  }

  // Redirect based on user role
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  if (user?.role === 'student') {
    return <Navigate to="/student" replace />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;