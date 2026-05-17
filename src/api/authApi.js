import api from './axios';

/**
 * AUTHENTICATION ENDPOINTS
 */

// 1. Normal Email/Password Login
export const loginUser = (credentials) => {
    // We map 'email' to 'email' (or 'username' depending on your backend config)
    // Based on your successful Postman test, your backend expects 'email'
    return api.post('/auth/token/', {
        email: credentials.email,
        password: credentials.password
    });
};

// 2. Register New User (Buyer or Seller)
export const registerUser = (userData) => {
    return api.post('/auth/register/', userData);
};

// 3. Google Social Login
export const googleLogin = (accessToken) => {
    return api.post('/auth/google/', { access_token: accessToken });
};

// 4. Get Current User (Important for the Navbar)
export const getUserData = () => {
    return api.get('/auth/user/'); 
};

// 5. Update Profile
export const updateProfile = (profileData) => {
    return api.patch('/auth/user/', profileData);
};

// 6. Forgot Password
export const forgotPassword = (email) => {
    return api.post('/password/reset/', { email });
};

// 7. Reset Password Confirm
export const resetPasswordConfirm = (data) => {
    return api.post('/password/reset/confirm/', data);
};

// 8. Refresh Token
export const refreshToken = (refresh) => {
    return api.post('/auth/token/refresh/', { refresh });
};