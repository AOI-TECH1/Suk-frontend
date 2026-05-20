import api from './axios';

/**
 * =========================================================
 * 1. STORE & ONBOARDING
 * =========================================================
 */

// Fetch the current user's Store Profile (Logo, Name, Plan, Bank Info)
// This populates the Merchant Center and Onboarding status
export const getStoreDetails = () => {
    return api.get('/auth/seller/store/');
};

// Update store information (Handles Logo uploads via FormData)
export const updateStoreDetails = (storeData) => {
    return api.patch('/auth/seller/store/', storeData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};


/**
 * =========================================================
 * 2. PRODUCT & INVENTORY MANAGEMENT
 * =========================================================
 */

// Fetch only categories (used for the dropdown in the Add Product form)
export const getCategories = () => {
    return api.get('/categories/');
};

// Fetch products belonging specifically to the logged-in seller
// Used for the "Active Items" count and the Inventory list
export const getSellerProducts = () => {
    return api.get('/products/me/'); 
};

// Create a new product (MUST use FormData for the main_image)
export const addProduct = (productData) => {
    return api.post('/products/', productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// Update an existing product (e.g., change price or stock)
export const updateProduct = (id, productData) => {
    return api.patch(`/products/${id}/`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// Remove a product from the marketplace
export const deleteProduct = (id) => {
    return api.delete(`/products/${id}/`);
};


/**
 * =========================================================
 * 3. SALES & ORDERS
 * =========================================================
 */

// Fetch orders where customers bought THIS seller's items
// Used for the "Incoming Orders" table in the Merchant Center
export const getSellerOrders = () => {
    return api.get('/orders/seller/');
};

// Mark an order as 'Shipped' or 'Processing'
export const updateOrderStatus = (orderId, statusData) => {
    return api.patch(`/orders/seller/${orderId}/`, statusData);
};