import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// 1. CONTEXT & LAYOUTS
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

// 2. ROUTE GUARDS
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

// 3. PUBLIC MARKETPLACE PAGES
import Home from './pages/public/Home';
import Shop from './pages/public/Shop';
import ProductDetail from './pages/public/ProductDetail';
import Cart from './pages/public/Cart';
import Checkout from './pages/public/Checkout';
import Wishlist from './pages/public/WishList'; 
import CategoryPage from './pages/public/CategoryPage';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import PublicStore from './pages/public/PublicStore';

// 4. STATIC PUBLIC PAGES
import Terms from './pages/public/Terms';
import DeliveryInfo from './pages/public/DeliveryInfo';
import RefundPolicy from './pages/public/RefundPolicy';
import FAQ from './pages/public/FAQ'; 
import GoodsService from './pages/public/GoodServices';
import PrivacyPolicy from './pages/public/PrivacyPolicy';

// 5. AUTH PAGES
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SellerOnboarding from './pages/auth/SellerOnboarding';

// 6. BUYER PAGES
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerOrders from './pages/buyer/Orders';
import BuyerSettings from './pages/buyer/Settings';

// 7. SELLER PAGES
import SellerDashboard from './pages/seller/Dashboard';
import SellerProducts from './pages/seller/Products';
import AddProduct from './pages/seller/AddProduct';
import SellerSettings from './pages/seller/Settings';

// 8. STAFF/ADMIN PAGES
import StaffLogin from './pages/staff/StaffLogin';
import AdminDashboard from './pages/staff/AdminDashboard';
import UserManagement from './pages/staff/UserMgmt';
import AdminProducts from './pages/staff/AdminProducts'; // New
import AdminOrders from './pages/staff/AdminOrders';     // New
import AdminMerchants from './pages/staff/AdminMerchants'; // New
import AdManagement from './pages/staff/Ads';

// --- HELPER COMPONENT ---
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
        <ScrollToTop />
        <Routes>
          
          {/* =============================================================
              GROUP A: MARKETPLACE AREA (Navbar + Footer)
              ============================================================= */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Dedicated Public Storefront (e.g. /store/Aliko-Gadgets) */}
            <Route path="/store/:storeName" element={<PublicStore />} />

            {/* Static Content */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/delivery-info" element={<DeliveryInfo />} />
            <Route path="/services" element={<GoodsService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* AUTH ROUTES */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/staff/login" element={<StaffLogin />} />
            </Route>

            {/* CHECKOUT & ONBOARDING (Any logged in user) */}
            <Route element={<ProtectedRoute allowedRoles={['BUYER', 'SELLER', 'MANAGER', 'ADMIN']} />}>
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/setup-store" element={<SellerOnboarding />} />
            </Route>

            {/* BUYER DASHBOARD (Any logged in user) */}
            <Route element={<ProtectedRoute allowedRoles={['BUYER', 'SELLER', 'MANAGER', 'ADMIN']} />}>
               <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
               <Route path="/buyer/orders" element={<BuyerOrders />} />
               <Route path="/buyer/settings" element={<BuyerSettings />} />
            </Route>

            {/* SELLER DASHBOARD (Sellers Only) */}
            <Route element={<ProtectedRoute allowedRoles={['SELLER']} />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/add-product" element={<AddProduct />} />
              <Route path="/seller/settings" element={<SellerSettings />} />
            </Route>
          </Route>

          {/* =============================================================
              GROUP B: STAFF COMMAND CENTER (Internal Use Only)
              ============================================================= */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']} />}>
            <Route path="/staff/dashboard" element={<AdminDashboard />} />
            <Route path="/staff/users" element={<UserManagement />} />
            <Route path="/staff/products" element={<AdminProducts />} />
            <Route path="/staff/orders" element={<AdminOrders />} />
            <Route path="/staff/merchants" element={<AdminMerchants />} />
            <Route path="/staff/ads" element={<AdManagement />} />
          </Route>

          {/* --- 404 NOT FOUND --- */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;