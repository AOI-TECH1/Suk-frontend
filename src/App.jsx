import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// 1. CONTEXT & LAYOUTS
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

// 2. ROUTE GUARDS/
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

// 3. PUBLIC PAGES
import Home from './pages/public/Home';
import Shop from './pages/public/Shop';
import ProductDetail from './pages/public/ProductDetail';
import Cart from './pages/public/Cart';
import Checkout from './pages/public/Checkout';
import Wishlist from './pages/public/WishList'; 
import CategoryPage from './pages/public/CategoryPage';


// 4. STATIC PUBLIC PAGES (The ones your student just added)
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
import ForgotPassword from './pages/auth/ForgotPassword';

// 6. BUYER PAGES
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerOrders from './pages/buyer/Orders';
import BuyerSettings from './pages/buyer/Settings';

// 7. SELLER PAGES
import SellerDashboard from './pages/seller/Dashboard';
import SellerProducts from './pages/seller/Products';
import AddProduct from './pages/seller/AddProduct';

// 8. STAFF PAGES
import AdminDashboard from './pages/staff/AdminDashboard';
import UserManagement from './pages/staff/UserMgmt';
import AdManagement from './pages/staff/Ads';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

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
        <ScrollToTop />
        <Routes>
          
          {/* =============================================================
              GROUP A: PUBLIC PAGES (MainLayout = Navbar + Footer)
              ============================================================= */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category/:slug" element={<CategoryPage />} />

            
            {/* Static Content Pages */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/delivery-info" element={<DeliveryInfo />} />
            <Route path="/services" element={<GoodsService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* AUTH ROUTES (Redirects logged-in users away from Login/Register) */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* CHECKOUT (Requires Login) */}
            <Route element={<ProtectedRoute allowedRoles={['BUYER', 'SELLER', 'MANAGER', 'ADMIN']} />}>
               <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* SELLER ONBOARDING (Logged in users only) */}
            <Route element={<ProtectedRoute allowedRoles={['BUYER', 'SELLER', 'MANAGER', 'ADMIN']} />}>
               <Route path="/setup-store" element={<SellerOnboarding />} />
            </Route>

            {/* BUYER DASHBOARD AREA */}
            <Route element={<ProtectedRoute allowedRoles={['BUYER', 'SELLER', 'MANAGER', 'ADMIN']} />}>
               <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
               <Route path="/buyer/orders" element={<BuyerOrders />} />
               <Route path="/buyer/settings" element={<BuyerSettings />} />
            </Route>

            {/* SELLER DASHBOARD AREA */}
            <Route element={<ProtectedRoute allowedRoles={['SELLER']} />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/add-product" element={<AddProduct />} />
            </Route>
          </Route>

          {/* =============================================================
              GROUP B: STAFF AREA (No standard Footer, usually a Sidebar)
              ============================================================= */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']} />}>
            <Route path="/staff/dashboard" element={<AdminDashboard />} />
            <Route path="/staff/users" element={<UserManagement />} />
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