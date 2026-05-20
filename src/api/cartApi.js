import axios from './axios';

export const getCart = async () => {
  const response = await axios.get('/carts/');
  return response.data; // This returns the cart object with items
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post('/carts/add/', { product_id: productId, quantity });
  return response.data;
};