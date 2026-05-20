import api from './axios';

/**
 * =========================================================
 * ADMIN / STAFF ENDPOINTS (Management Hub)
 * =========================================================
 */

// Fetch ALL ads (Active, Inactive, Expired) for the Admin Table
export const getAllAds = () => {
    return api.get('/ads/admin-list/');
};

// Deploy a new marketing campaign banner
// Note: Uses '/create/' to match your backend BannerCreateView
export const createAd = (adData) => {
    return api.post('/ads/create/', adData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Decommission an active campaign
// Matches path('<int:pk>/', BannerDetailView...) in Django
export const deleteAd = (id) => {
    return api.delete(`/ads/${id}/`);
};


/**
 * =========================================================
 * PUBLIC ENDPOINTS (Home Page & Sidebar)
 * =========================================================
 */

// Fetch only valid banners for the homepage slider
// Your backend ActiveBannerListView already filters for is_active and dates
export const getActiveAds = () => {
    return api.get('/ads/');
};

// Fetch sponsored products for the sidebar
export const getPromotedProducts = () => {
    return api.get('/ads/promoted-products/');
};