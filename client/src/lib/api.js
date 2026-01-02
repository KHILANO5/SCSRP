// Use relative URL for API calls - Vite proxy will handle routing to backend
export const API_BASE_URL = '/api';

async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        ...options.headers,
    };

    if (token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const auth = {
    login: (email, password) => apiCall('/auth/login', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({ email, password })
    }),
    register: (email, password, fullName) => apiCall('/auth/register', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({ email, password, full_name: fullName })
    }),
};

export const userRequests = {
    getAll: (status) => {
        const params = new URLSearchParams();
        if (status && status !== 'all') params.append('status', status);
        return apiCall(`/requests?${params.toString()}`);
    },
    create: (formData) => apiCall('/requests', {
        method: 'POST',
        body: formData
    }),
    getOne: (id) => apiCall(`/requests/${id}`),
};

export const adminRequests = {
    getAll: (status, category) => {
        const params = new URLSearchParams();
        if (status && status !== 'all') params.append('status', status);
        if (category && category !== 'all') params.append('category', category);
        return apiCall(`/admin/requests?${params.toString()}`);
    },
    updateStatus: (id, status) => apiCall(`/admin/requests/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    }),
    assign: (id, assignedTo) => apiCall(`/admin/requests/${id}/assign`, {
        method: 'PUT',
        body: JSON.stringify({ assigned_to: assignedTo })
    }),
    addNotes: (id, notes) => apiCall(`/admin/requests/${id}/notes`, {
        method: 'PUT',
        body: JSON.stringify({ admin_notes: notes })
    }),
    getStats: () => apiCall('/admin/statistics'),
};
