import api from './axios';

// Pull the list of categories for the Navbar or Sidebar
export const getCategories = () => api.get('/categories/');