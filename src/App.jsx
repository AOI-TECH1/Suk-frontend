import React, { useEffect } from 'react'; // Added useEffect
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// 1. CONTEXT & LAYOUTS
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

// 2. ROUTE GUARDS
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

// 3. PUBLIC PAGES
import Home from './pages/public/Home';
import Shop from './pages/public/Shop';
import ProductDetail from './pages/public/ProductDetail';
import Terms from './pages/public/Terms';
import DeliveryInfo from './pages/public/DeliveryInfo';
import Wishlist from './pages/public/WishList'; 
import RefundPolicy from './pages/public/RefundPolicy';
import FAQ from './pages/public/FAQ'; 
import GoodsService from './pages/public/GoodServices';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Cart from './pages/public/Cart'; // ONLY ONE IMPORT HERE

// 4. AUTH PAGES
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BuyerRegister from './pages/auth/BuyerRegister';

// 5. BUYER PAGES
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerOrders from './pages/buyer/Orders';
import BuyerSettings from './pages/buyer/Settings';

// 6. SELLER PAGES
import SellerDashboard from './pages/seller/Dashboard';
import SellerProducts from './pages/seller/Products';
import AddProduct from './pages/seller/AddProduct';

// 7. STAFF PAGES
import AdminDashboard from './pages/staff/AdminDashboard';
import UserManagement from './pages/staff/UserMgmt';
import AdManagement from './pages/staff/Ads';

// --- HELPER COMPONENT: Forces page to jump to top when link is clicked ---
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop /> {/* This fixes the "it doesn't move" feeling */}
        <Routes>
          
          {/* --- PUBLIC AREA --- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} /> 
            
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/delivery-info" element={<DeliveryInfo />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/services" element={<GoodsService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/buyerregister" element={<BuyerRegister />} />
            </Route>
          </Route>

          {/* --- PROTECTED ROUTES --- */}
          <Route element={<ProtectedRoute allowedRoles={['BUYER', 'SELLER', 'ADMIN', 'MANAGER']} />}>
            <Route element={<MainLayout />}>
               <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
               <Route path="/buyer/orders" element={<BuyerOrders />} />
               <Route path="/buyer/settings" element={<BuyerSettings />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['SELLER']} />}>
            <Route element={<MainLayout />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/add-product" element={<AddProduct />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']} />}>
            <Route path="/staff/dashboard" element={<AdminDashboard />} />
            <Route path="/staff/users" element={<UserManagement />} />
            <Route path="/staff/ads" element={<AdManagement />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;