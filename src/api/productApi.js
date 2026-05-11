import api from './axios';

/**
 * Endpoints from your Products/urls.py:
 * path('', ProductListView) -> /api/products/
 * path('seller-products/', SellerProductListView) -> /api/products/seller-products/
 * path('<slug:slug>/', ProductionDetailView) -> /api/products/<slug>/
 */

// 1. Pull all products for Home/Shop
export const getAllProducts = (params) => api.get('/products/', { params });

// 2. Pull products for the logged-in Seller
export const getSellerProducts = () => api.get('/products/seller-products/');

// 3. Pull details for one product using the slug
export const getProductDetail = (slug) => api.get(`/products/${slug}/`);