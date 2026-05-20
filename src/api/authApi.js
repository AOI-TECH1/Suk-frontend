import api from './axios';

/**
 * =========================================================
 * 1. AUTHENTICATION ENDPOINTS
 * =========================================================
 */

// Normal Email/Password Login
export const loginUser = (credentials) => {
    return api.post('/auth/token/', {
        email: credentials.email,
        password: credentials.password
    });
};

// Register New User (Defaults to role: BUYER)
export const registerUser = (userData) => {
    return api.post('/auth/register/', userData);
};

// Google Social Login
export const googleLogin = (accessToken) => {
    return api.post('/auth/google/', { access_token: accessToken });
};

/**
 * =========================================================
 * 2. USER PROFILE ENDPOINTS
 * =========================================================
 */

// Get Current User (Hydrates AuthContext/Navbar)
// Returns: { id, email, role, has_shop, ... }
export const getUserData = () => {
    return api.get('/auth/user/'); 
};

// Update Basic User Profile (Name, Phone, etc.)
export const updateProfile = (profileData) => {
    return api.patch('/auth/user/', profileData);
};

/**
 * =========================================================
 * 3. SELLER & STORE ENDPOINTS
 * =========================================================
 */

// Seller Onboarding (The "Direct Entry" for registered buyers)
export const onboardSeller = (storeData) => {
    return api.post('/auth/seller/onboarding/', storeData);
};

// Get Store Details (Dashboard info, bank details, logo)
export const getStoreDetails = () => {
    return api.get('/auth/seller/store/');
};

// Update Store Details
export const updateStoreDetails = (storeData) => {
    return api.patch('/auth/seller/store/', storeData);
};

/**
 * =========================================================
 * 4. ADMIN MANAGEMENT (Restricted to Role: ADMIN)
 * =========================================================
 */

// Create a new Staff or Manager account
// Only works if the person making the call is an ADMIN
export const createStaffAccount = (staffData) => {
    // staffData = { email, password, full_name, role: 'MANAGER' }
    return api.post('/auth/admin/manage-staff/', staffData);
};

// List all Staff and Managers
export const listStaffAccounts = () => {
    return api.get('/auth/admin/manage-staff/');
};

/**
 * =========================================================
 * 5. PASSWORD & TOKEN MANAGEMENT
 * =========================================================
 */

// Forgot Password (Request Link)
export const forgotPassword = (email) => {
    return api.post('/auth/password/reset/', { email });
};

// Reset Password Confirm (Submit New Password)
export const resetPasswordConfirm = (data) => {
    return api.post('/auth/password/reset/confirm/', data);
};

// Refresh JWT Token
export const refreshToken = (refresh) => {
    return api.post('/auth/token/refresh/', { refresh });
};

// Logout (Clears tokens)
export const logoutUser = () => {
    return api.post('/auth/logout/');
};