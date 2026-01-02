// ============================================
// SCSRP - API Service Layer
// ============================================
// This file handles all communication with the backend API
// Provides centralized error handling, token management, and request/response processing

// ============================================
// Core API Configuration
// ============================================

const API_CONFIG = {
    baseUrl: CONFIG.api.baseUrl,
    timeout: CONFIG.api.timeout,
    tokenKey: CONFIG.auth.tokenKey,
    userKey: CONFIG.auth.userKey
};

// ============================================
// Token Management
// ============================================

function getToken() {
    return localStorage.getItem(API_CONFIG.tokenKey);
}

function setToken(token) {
    localStorage.setItem(API_CONFIG.tokenKey, token);
}

function removeToken() {
    localStorage.removeItem(API_CONFIG.tokenKey);
    localStorage.removeItem(API_CONFIG.userKey);
}

function getCurrentUser() {
    const userJson = localStorage.getItem(API_CONFIG.userKey);
    return userJson ? JSON.parse(userJson) : null;
}

function setCurrentUser(user) {
    localStorage.setItem(API_CONFIG.userKey, JSON.stringify(user));
}

// ============================================
// Core API Request Function
// ============================================

async function apiCall(endpoint, options = {}) {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    const token = getToken();

    // Default headers
    const headers = {
        ...options.headers
    };

    // Add Authorization header if token exists (unless explicitly excluded)
    if (token && !options.excludeAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Add Content-Type for JSON requests (unless multipart/form-data)
    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    // Build fetch options
    const fetchOptions = {
        method: options.method || 'GET',
        headers,
        ...options
    };

    // Convert body to JSON string if it's an object (not FormData)
    if (fetchOptions.body && !(fetchOptions.body instanceof FormData)) {
        fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    try {
        // Make the request with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Parse JSON response
        const data = await response.json();

        // Handle HTTP errors
        if (!response.ok) {
            // Handle 401 Unauthorized - token expired or invalid
            if (response.status === 401) {
                removeToken();
                if (window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('/')) {
                    window.location.href = 'index.html';
                }
                throw new Error(data.error || CONFIG.messages.errors.unauthorized);
            }

            // Handle 403 Forbidden
            if (response.status === 403) {
                throw new Error(data.error || CONFIG.messages.errors.forbidden);
            }

            // Handle 404 Not Found
            if (response.status === 404) {
                throw new Error(data.error || CONFIG.messages.errors.notFound);
            }

            // Handle other errors
            throw new Error(data.error || `Request failed with status ${response.status}`);
        }

        return data;

    } catch (error) {
        // Handle network errors
        if (error.name === 'AbortError') {
            throw new Error('Request timeout. Please try again.');
        }

        // Handle fetch errors (network failure, etc.)
        if (error instanceof TypeError) {
            throw new Error(CONFIG.messages.errors.network);
        }

        // Re-throw other errors
        throw error;
    }
}

// ============================================
// Authentication API
// ============================================

async function registerUser(email, password, fullName) {
    const data = await apiCall('/auth/register', {
        method: 'POST',
        body: { email, password, full_name: fullName },
        excludeAuth: true // No token needed for registration
    });

    return data;
}

async function loginUser(email, password) {
    const data = await apiCall('/auth/login', {
        method: 'POST',
        body: { email, password },
        excludeAuth: true // No token needed for login
    });

    // Store token and user info
    if (data.success && data.token) {
        setToken(data.token);
        setCurrentUser(data.user);
    }

    return data;
}

function logoutUser() {
    removeToken();
    window.location.href = 'index.html';
}

// ============================================
// Student API Functions
// ============================================

async function fetchUserRequests(status = null) {
    let endpoint = '/requests';

    if (status && status !== 'all') {
        endpoint += `?status=${status}`;
    }

    return await apiCall(endpoint);
}

async function createServiceRequest(formData) {
    // formData should already be a FormData object with:
    // - category
    // - title
    // - description
    // - image (optional)

    return await apiCall('/requests', {
        method: 'POST',
        body: formData
        // Note: Don't set Content-Type header for FormData, browser will set it automatically
    });
}

async function fetchRequestDetails(requestId) {
    return await apiCall(`/requests/${requestId}`);
}

// ============================================
// Admin API Functions
// ============================================

async function fetchAllRequests(status = null, category = null) {
    let endpoint = '/admin/requests';
    const params = new URLSearchParams();

    if (status && status !== 'all') {
        params.append('status', status);
    }

    if (category && category !== 'all') {
        params.append('category', category);
    }

    if (params.toString()) {
        endpoint += `?${params.toString()}`;
    }

    return await apiCall(endpoint);
}

async function fetchStatistics() {
    return await apiCall('/admin/statistics');
}

async function updateStatus(requestId, status) {
    return await apiCall(`/admin/requests/${requestId}/status`, {
        method: 'PUT',
        body: { status }
    });
}

async function assignRequest(requestId, assignedTo) {
    return await apiCall(`/admin/requests/${requestId}/assign`, {
        method: 'PUT',
        body: { assigned_to: assignedTo }
    });
}

async function addNotes(requestId, notes) {
    return await apiCall(`/admin/requests/${requestId}/notes`, {
        method: 'PUT',
        body: { admin_notes: notes }
    });
}

// ============================================
// Utility Functions
// ============================================

function getImageUrl(imagePath) {
    if (!imagePath) return null;

    // If imagePath is already a full URL, return it
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Otherwise, prepend the base URL (without /api)
    const baseUrl = API_CONFIG.baseUrl.replace('/api', '');
    return `${baseUrl}${imagePath}`;
}

// ============================================
// Export API Functions
// ============================================

// Make functions available globally
if (typeof window !== 'undefined') {
    window.API = {
        // Auth
        registerUser,
        loginUser,
        logoutUser,
        getCurrentUser,

        // Student
        fetchUserRequests,
        createServiceRequest,
        fetchRequestDetails,

        // Admin
        fetchAllRequests,
        fetchStatistics,
        updateStatus,
        assignRequest,
        addNotes,

        // Utils
        getImageUrl
    };
}
