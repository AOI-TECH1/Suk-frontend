import api from './axios';

/**
 * =========================================================
 * 1. OVERSIGHT & FETCHING (GET REQUESTS)
 * =========================================================
 */

// FIXED: Points to the new list view that returns EVERYONE
// This fixes the "Blank List" issue on the Identity Control page
export const getAllUsers = () => {
    return api.get('/auth/admin/users/all/'); 
};

// Fetch all internal personnel (Admins and Managers)
export const listStaffAccounts = () => {
    return api.get('/auth/admin/manage-staff/');
};

// Fetch every product on the platform for moderation
export const getAllProductsAdmin = () => {
    return api.get('/products/');
};

// Fetch platform-wide orders for the logistics log
export const getAllOrdersAdmin = () => {
    return api.get('/orders/');
};


/**
 * =========================================================
 * 2. COMMAND & CONTROL (POST/PATCH/DELETE REQUESTS)
 * =========================================================
 */

// DEPLOY NEW STAFF: Used to add new internal Managers/Admins
export const createStaffAccount = (staffData) => {
    return api.post('/auth/admin/manage-staff/', staffData);
};

// Toggle User Access (Ban/Unban)
export const toggleUserStatus = (userId, status) => {
    return api.patch(`/auth/admin/users/${userId}/`, { is_active: status });
};

// Verify a Merchant Store
export const verifyStore = (storeId) => {
    return api.patch(`/auth/admin/verify-store/${storeId}/`, { is_active: true });
};

// Administrative SKU Deletion
export const deleteProductAdmin = (productId) => {
    return api.delete(`/products/${productId}/`);
};

// Purge a user identity from the database
export const deleteUserAdmin = (userId) => {
    return api.delete(`/auth/admin/users/${userId}/`);
};


/**
 * =========================================================
 * 3. ANALYTICS
 * =========================================================
 */

// Fetch high-level platform stats (Revenue, Growth, Active Nodes)
export const getPlatformStats = () => {
    return api.get('/auth/admin/stats/');
};