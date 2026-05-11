import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

/**
 * ProtectedRoute Logic:
 * 1. Checks if the app is still "loading" user data from the backend.
 * 2. If not logged in -> Redirect to Login.
 * 3. If logged in but WRONG ROLE -> Show Error and Redirect to Home.
 * 4. If all good -> Allow access to the page (Outlet).
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. WHILE LOADING: Show a spinner so the user isn't kicked out while we check the token
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-gray-200"></div>
          <p className="text-gray-500 font-bold animate-pulse tracking-widest text-xs uppercase">SuK Security Check...</p>
        </div>
      </div>
    );
  }

  // 2. NOT LOGGED IN: If there is no user, send them to login.
  // 'replace' stops them from going back to the protected page via the back button.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. WRONG ROLE: If the user role (e.g., BUYER) is not in the allowed list (e.g., ['SELLER'])
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    toast.error(`Access Denied: You are a ${user.role}, you cannot enter this area.`);
    
    // Redirect them to their own dashboard based on their role
    const redirectPath = `/${user.role.toLowerCase()}/dashboard`;
    return <Navigate to={redirectPath} replace />;
  }

  // 4. AUTHORIZED: User is logged in and has the right role. 
  // Outlet renders the children (the dashboard, settings, etc.)
  return <Outlet />;
};

export default ProtectedRoute;