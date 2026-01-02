// ============================================
// SCSRP - Smart Campus Service Request Portal
// Frontend Application Logic
// ============================================

// Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// State Management
let currentUser = null;
let currentFilter = 'all';
let currentCategory = 'all';
let selectedRole = 'student';

// ============================================
// Utility Functions
// ============================================

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');

    toast.className = `toast ${type}`;
    toastMessage.textContent = message;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
}

function getCategoryIcon(category) {
    const icons = {
        classroom: '🏫',
        hostel: '🏠',
        laboratory: '🔬',
        library: '📚',
        administrative: '🏢',
        other: '📋'
    };
    return icons[category] || '📋';
}

// ============================================
// API Functions
// ============================================

async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        ...options.headers,
    };

    if (token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData
    if (!(options.body instanceof FormData)) {
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

// Authentication APIs
async function register(email, password, fullName) {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.register(email, password, fullName);
    }
    return await apiCall('/auth/register', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({
            email,
            password,
            full_name: fullName
        })
    });
}

async function login(email, password) {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.login(email, password);
    }
    return await apiCall('/auth/login', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({
            email,
            password
        })
    });
}

// Student APIs
async function getUserRequests(status = null) {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.getUserRequests(currentUser.id, status);
    }
    const query = status && status !== 'all' ? `?status=${status}` : '';
    return await apiCall(`/requests${query}`);
}

async function createRequest(formData) {
    if (window.DEMO_MODE && window.DemoAPI) {
        const category = formData.get('category');
        const title = formData.get('title');
        const description = formData.get('description');
        return await window.DemoAPI.createRequest(currentUser.id, category, title, description);
    }
    return await apiCall('/requests', {
        method: 'POST',
        body: formData
    });
}

async function getRequestDetails(id) {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.getRequestDetails(parseInt(id));
    }
    return await apiCall(`/requests/${id}`);
}

// Admin APIs
async function getAllRequests(status = null, category = null) {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.getAllRequests(status, category);
    }
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (category && category !== 'all') params.append('category', category);

    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiCall(`/admin/requests${query}`);
}

async function updateRequestStatus(id, status) {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.updateRequestStatus(parseInt(id), status);
    }
    return await apiCall(`/admin/requests/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    });
}

async function assignRequest(id, assignedTo) {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.assignRequest(parseInt(id), assignedTo);
    }
    return await apiCall(`/admin/requests/${id}/assign`, {
        method: 'PUT',
        body: JSON.stringify({ assigned_to: assignedTo })
    });
}

async function addAdminNotes(id, notes) {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.addAdminNotes(parseInt(id), notes);
    }
    return await apiCall(`/admin/requests/${id}/notes`, {
        method: 'PUT',
        body: JSON.stringify({ admin_notes: notes })
    });
}

async function getStatistics() {
    if (window.DEMO_MODE && window.DemoAPI) {
        return await window.DemoAPI.getStatistics();
    }
    return await apiCall('/admin/statistics');
}



// ============================================
// Authentication Handlers
// ============================================

// Role Switcher Logic
document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update UI
        document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update State
        selectedRole = btn.dataset.role;

        // Update Form Texts
        const titleText = selectedRole === 'student' ? 'Student' : 'Admin';
        document.getElementById('login-title').textContent = `${titleText} Login`;
        document.getElementById('register-title').textContent = `${titleText} Registration`;

        // Update Placeholders
        const emailPlaceholder = selectedRole === 'student'
            ? 'student@student.university.edu'
            : 'admin@admin.university.edu';
        document.getElementById('login-email').placeholder = emailPlaceholder;
        document.getElementById('register-email').placeholder = emailPlaceholder;
    });
});

document.getElementById('show-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.add('active');
});

document.getElementById('show-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
});

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Basic Client-side Validation for Role
    // Allow demo accounts OR strict university domain validation
    if (selectedRole === 'student' && !email.includes('student.') && !email.includes('@demo.com')) {
        showToast('Please use your student email (@student.university.edu)', 'warning');
        return;
    }
    if (selectedRole === 'admin' && !email.includes('admin.') && !email.includes('@demo.com')) {
        showToast('Please use your admin email (@admin.university.edu)', 'warning');
        return;
    }

    try {
        const response = await login(email, password);

        // Verify the returned user role matches selected role
        if (response.user.role !== selectedRole) {
            showToast(`This account is registered as a ${response.user.role}, but you tried to login as ${selectedRole}.`, 'error');
            return;
        }

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        currentUser = response.user;

        showToast('Login successful!', 'success');

        if (currentUser.role === 'admin') {
            document.getElementById('admin-name').textContent = currentUser.full_name;
            showPage('admin-dashboard');
            loadAdminDashboard();
        } else {
            document.getElementById('student-name').textContent = currentUser.full_name;
            showPage('student-dashboard');
            loadStudentRequests();
        }
    } catch (error) {
        showToast(error.message || 'Login failed', 'error');
    }
});

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Validate domain
    if (selectedRole === 'student' && !email.endsWith('@student.university.edu')) {
        showToast('Student email must end with @student.university.edu', 'error');
        return;
    }
    if (selectedRole === 'admin' && !email.endsWith('@admin.university.edu')) {
        showToast('Admin email must end with @admin.university.edu', 'error');
        return;
    }

    try {
        await register(email, password, name);

        showToast('Registration successful! Please login.', 'success');

        document.getElementById('register-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
        document.getElementById('login-email').value = email;
        document.getElementById('register-form').reset();
    } catch (error) {
        showToast(error.message || 'Registration failed', 'error');
    }
});

// Logout handlers
document.getElementById('student-logout')?.addEventListener('click', logout);
document.getElementById('admin-logout')?.addEventListener('click', logout);



// ============================================
// Student Dashboard
// ============================================

async function loadStudentRequests(status = 'all') {
    const container = document.getElementById('student-requests');
    container.innerHTML = '<div class="loading"></div>';

    try {
        const response = await getUserRequests(status === 'all' ? null : status);
        const requests = response.requests;

        if (requests.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>No requests found</p>
                </div>
            `;
            return;
        }

        container.innerHTML = requests.map(request => createRequestCard(request)).join('');

        // Add click handlers
        container.querySelectorAll('.request-card').forEach(card => {
            card.addEventListener('click', () => {
                showRequestDetails(card.dataset.id);
            });
        });
    } catch (error) {
        container.innerHTML = `<div class="empty-state"><p>Error loading requests</p></div>`;
        showToast('Failed to load requests', 'error');
    }
}

function createRequestCard(request, isAdmin = false) {
    return `
        <div class="request-card" data-id="${request.id}">
            <div class="request-card-header">
                <span class="request-category">
                    ${getCategoryIcon(request.category)} ${request.category}
                </span>
                <span class="request-status ${request.status}">${request.status.replace('_', ' ')}</span>
            </div>
            <h3 class="request-title">${request.title}</h3>
            <p class="request-description">${request.description}</p>
            <div class="request-meta">
                ${isAdmin ? `
                    <div class="request-student">
                        <strong>${request.student_name}</strong>
                        <span>${request.student_email}</span>
                    </div>
                ` : ''}
                <span class="request-date">${formatDate(request.created_at)}</span>
            </div>
        </div>
    `;
}

// Filter tabs for student dashboard
document.querySelectorAll('#student-dashboard .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#student-dashboard .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const status = btn.dataset.status;
        currentFilter = status;
        loadStudentRequests(status);
    });
});

// New Request Modal
document.getElementById('new-request-btn')?.addEventListener('click', () => {
    document.getElementById('new-request-modal').classList.add('active');
});

document.getElementById('close-request-modal')?.addEventListener('click', closeNewRequestModal);
document.getElementById('cancel-request')?.addEventListener('click', closeNewRequestModal);

document.querySelector('#new-request-modal .modal-overlay')?.addEventListener('click', closeNewRequestModal);

function closeNewRequestModal() {
    document.getElementById('new-request-modal').classList.remove('active');
    document.getElementById('create-request-form').reset();
}

document.getElementById('create-request-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category', document.getElementById('request-category').value);
    formData.append('title', document.getElementById('request-title').value);
    formData.append('description', document.getElementById('request-description').value);

    const imageFile = document.getElementById('request-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        await createRequest(formData);
        showToast('Request created successfully!', 'success');
        closeNewRequestModal();
        loadStudentRequests(currentFilter);
    } catch (error) {
        showToast(error.message || 'Failed to create request', 'error');
    }
});

// ============================================
// Admin Dashboard
// ============================================

async function loadAdminDashboard() {
    await loadStatistics();
    await loadAdminRequests();
}

async function loadStatistics() {
    try {
        const response = await getStatistics();
        const stats = response.statistics;

        document.getElementById('stat-pending').textContent = stats.pending;
        document.getElementById('stat-in-progress').textContent = stats.in_progress;
        document.getElementById('stat-resolved').textContent = stats.resolved;
        document.getElementById('stat-total').textContent = stats.total_requests;
    } catch (error) {
        showToast('Failed to load statistics', 'error');
    }
}

async function loadAdminRequests(status = 'all', category = 'all') {
    const container = document.getElementById('admin-requests');
    container.innerHTML = '<div class="loading"></div>';

    try {
        const response = await getAllRequests(
            status === 'all' ? null : status,
            category === 'all' ? null : category
        );
        const requests = response.requests;

        if (requests.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>No requests found</p>
                </div>
            `;
            return;
        }

        container.innerHTML = requests.map(request => createRequestCard(request, true)).join('');

        // Add click handlers
        container.querySelectorAll('.request-card').forEach(card => {
            card.addEventListener('click', () => {
                showRequestDetails(card.dataset.id, true);
            });
        });
    } catch (error) {
        container.innerHTML = `<div class="empty-state"><p>Error loading requests</p></div>`;
        showToast('Failed to load requests', 'error');
    }
}

// Filter tabs for admin dashboard
document.querySelectorAll('#admin-dashboard .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#admin-dashboard .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const status = btn.dataset.status;
        currentFilter = status;
        loadAdminRequests(status, currentCategory);
    });
});

// Category filter
document.getElementById('category-filter')?.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    loadAdminRequests(currentFilter, currentCategory);
});

// ============================================
// Request Details Modal
// ============================================

async function showRequestDetails(requestId, isAdmin = false) {
    const modal = document.getElementById('request-details-modal');
    const content = document.getElementById('request-details-content');

    modal.classList.add('active');
    content.innerHTML = '<div class="loading"></div>';

    try {
        let request;

        if (isAdmin) {
            if (window.DEMO_MODE && window.DemoAPI) {
                // Demo Mode: Fetch from local demo data
                const response = await window.DemoAPI.getAllRequests();
                request = response.requests.find(req => req.id == requestId);
            } else {
                // Real API: Fetch all and filter (or use specific endpoint if available)
                const response = await apiCall(`/admin/requests`);
                request = response.requests.find(req => req.id == requestId);
            }

            if (!request) throw new Error('Request not found');
        } else {
            // Student View
            const response = await getRequestDetails(requestId);
            request = response.request;
        }

        content.innerHTML = `
            <div class="detail-section">
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Category</span>
                        <span class="detail-value">${getCategoryIcon(request.category)} ${request.category}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="request-status ${request.status}">${request.status.replace('_', ' ')}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Created</span>
                        <span class="detail-value">${formatDate(request.created_at)}</span>
                    </div>
                    ${request.resolved_at ? `
                        <div class="detail-item">
                            <span class="detail-label">Resolved</span>
                            <span class="detail-value">${formatDate(request.resolved_at)}</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            ${isAdmin && request.student_name ? `
                <div class="detail-section">
                    <h3>Student Information</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Name</span>
                            <span class="detail-value">${request.student_name}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">${request.student_email}</span>
                        </div>
                    </div>
                </div>
            ` : ''}

            <div class="detail-section">
                <h3>Request Details</h3>
                <div class="detail-item">
                    <span class="detail-label">Title</span>
                    <span class="detail-value"><strong>${request.title}</strong></span>
                </div>
                <div class="detail-item mt-lg">
                    <span class="detail-label">Description</span>
                    <span class="detail-value">${request.description}</span>
                </div>
                ${request.image_path ? `
                    <img src="${API_BASE_URL.replace('/api', '')}${request.image_path}" alt="Request image" class="detail-image">
                ` : ''}
            </div>

            ${request.assigned_to || request.admin_notes ? `
                <div class="detail-section">
                    <h3>Admin Information</h3>
                    ${request.assigned_to ? `
                        <div class="detail-item">
                            <span class="detail-label">Assigned To</span>
                            <span class="detail-value">${request.assigned_to}</span>
                        </div>
                    ` : ''}
                    ${request.admin_notes ? `
                        <div class="detail-item mt-lg">
                            <span class="detail-label">Admin Notes</span>
                            <span class="detail-value">${request.admin_notes}</span>
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            ${isAdmin ? `
                <div class="admin-actions">
                    ${request.status !== 'in_progress' ? `
                        <button class="btn btn-info" onclick="updateStatus(${request.id}, 'in_progress')">
                            Mark In Progress
                        </button>
                    ` : ''}
                    ${request.status !== 'resolved' ? `
                        <button class="btn btn-success" onclick="updateStatus(${request.id}, 'resolved')">
                            Mark Resolved
                        </button>
                    ` : ''}
                    <button class="btn btn-ghost" onclick="promptAssign(${request.id})">
                        ${request.assigned_to ? 'Reassign' : 'Assign'}
                    </button>
                    <button class="btn btn-ghost" onclick="promptNotes(${request.id})">
                        ${request.admin_notes ? 'Update Notes' : 'Add Notes'}
                    </button>
                </div>
            ` : ''}
        `;
    } catch (error) {
        content.innerHTML = `<div class="empty-state"><p>Error loading request details</p></div>`;
        showToast('Failed to load request details', 'error');
    }
}

document.getElementById('close-details-modal')?.addEventListener('click', closeDetailsModal);
document.querySelector('#request-details-modal .modal-overlay')?.addEventListener('click', closeDetailsModal);

function closeDetailsModal() {
    document.getElementById('request-details-modal').classList.remove('active');
}

// Admin actions (global functions for onclick handlers)
window.updateStatus = async function (requestId, status) {
    try {
        await updateRequestStatus(requestId, status);
        showToast('Status updated successfully!', 'success');
        closeDetailsModal();
        loadStatistics();
        loadAdminRequests(currentFilter, currentCategory);
    } catch (error) {
        showToast(error.message || 'Failed to update status', 'error');
    }
};

window.promptAssign = async function (requestId) {
    const assignedTo = prompt('Assign to (department/person):');
    if (assignedTo) {
        try {
            await assignRequest(requestId, assignedTo);
            showToast('Request assigned successfully!', 'success');
            showRequestDetails(requestId, true);
            loadAdminRequests(currentFilter, currentCategory);
        } catch (error) {
            showToast(error.message || 'Failed to assign request', 'error');
        }
    }
};

window.promptNotes = async function (requestId) {
    const notes = prompt('Enter admin notes:');
    if (notes) {
        try {
            await addAdminNotes(requestId, notes);
            showToast('Notes added successfully!', 'success');
            showRequestDetails(requestId, true);
        } catch (error) {
            showToast(error.message || 'Failed to add notes', 'error');
        }
    }
};

// ============================================
// Navigation Handlers (Home Page)
// ============================================

function navigateToAuth(view = 'login') {
    showPage('auth-page');
    if (view === 'register') {
        document.getElementById('login-form').classList.remove('active');
        document.getElementById('register-form').classList.add('active');
    } else {
        document.getElementById('register-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
    }
}

document.getElementById('nav-login-btn')?.addEventListener('click', () => navigateToAuth('login'));
document.getElementById('nav-register-btn')?.addEventListener('click', () => navigateToAuth('register'));
document.getElementById('hero-cta-btn')?.addEventListener('click', () => navigateToAuth('register'));
document.getElementById('hero-learn-more-btn')?.addEventListener('click', () => {
    document.querySelector('.features-section').scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// Initialize App
// ============================================

function initializeApp() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
        try {
            currentUser = JSON.parse(userStr);

            if (currentUser.role === 'admin') {
                document.getElementById('admin-name').textContent = currentUser.full_name;
                showPage('admin-dashboard');
                loadAdminDashboard();
            } else {
                document.getElementById('student-name').textContent = currentUser.full_name;
                showPage('student-dashboard');
                loadStudentRequests();
            }
        } catch (error) {
            console.error('Failed to parse user data:', error);
            logout();
        }
    } else {
        showPage('home-page');
    }
}

// Update logout to return to home page
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    showPage('home-page');
    showToast('Logged out successfully', 'info');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
