import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

/**
 * REQUEST INTERCEPTOR:
 * Automatically attaches the JWT Access Token to every outgoing request.
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * RESPONSE INTERCEPTOR:
 * Catches errors globally. If we get a 401 (Unauthorized), it means
 * the token has expired. This logic can be expanded to refresh the token.
 */
api.interceptors.response.use(
    (response) => response, // Return response if successful
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    // Attempt to get a new access token using the refresh token
                    const res = await axios.post('http://127.0.0.1:8000/api/auth/token/refresh/', {
                        refresh: refreshToken,
                    });

                    if (res.status === 200) {
                        const newAccessToken = res.data.access;
                        localStorage.setItem('token', newAccessToken);
                        
                        // Update the failed request with the new token and retry
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh token is also expired - log user out
                    console.error("Session expired. Logging out.");
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login'; 
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;