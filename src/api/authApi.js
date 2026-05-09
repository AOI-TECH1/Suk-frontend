import api from './axios';

/**
 * AUTHENTICATION ENDPOINTS
 */

// 1. Normal Email/Password Login
export const loginUser = (credentials) => {
    // credentials = { email, password }
    return api.post('/auth/token/', credentials);
};

// 2. Register New User (Buyer or Seller)
export const registerUser = (userData) => {
    // userData = { email, password, confirm_password, role, phone_number }
    return api.post('/auth/register/', userData);
};

// 3. Google Social Login
export const googleLogin = (accessToken) => {
    return api.post('/auth/google/', { access_token: accessToken });
};

// 4. Get Current Logged-in User Data
// This is used by AuthContext to verify the user on page refresh
export const getProfile = () => {
    return api.get('/auth/profile/');
};

// 5. Update Profile (Name, Phone, etc.)
export const updateProfile = (profileData) => {
    return api.patch('/auth/profile/update/', profileData);
};

// 6. Forgot Password (Step 1: Request Reset Link)
export const forgotPassword = (email) => {
    return api.post('/auth/password/reset/', { email });
};

// 7. Reset Password (Step 2: Submit new password with token)
export const resetPasswordConfirm = (data) => {
    // data = { uid, token, new_password }
    return api.post('/auth/password/reset/confirm/', data);
};

// 8. Refresh Token (To keep the session alive)
export const refreshToken = (refresh) => {
    return api.post('/auth/token/refresh/', { refresh });
};