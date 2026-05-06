import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import SellerDashboard from './pages/seller/Dashboard';

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES - Everyone sees these */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* SELLER ROUTES - Only Sellers can enter */}
      <Route element={<ProtectedRoute allowedRoles={['SELLER']} />}>
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        {/* Other seller pages go here */}
      </Route>
    </Routes>
  );
}