// ============================================
// SCSRP - Demo Data for Testing Without Backend
// ============================================
// This file contains dummy data and mock API functions
// to test the frontend without a running backend

const DEMO_MODE = true; // Set to false to use real API

// Dummy Users
const DEMO_USERS = [
    {
        id: 1,
        email: 'student@demo.com',
        password: 'demo123',
        full_name: 'Demo Student',
        role: 'student'
    },
    {
        id: 2,
        email: 'admin@demo.com',
        password: 'admin123',
        full_name: 'Demo Admin',
        role: 'admin'
    },
    {
        id: 3,
        email: 'john.doe@student.university.edu',
        password: 'password123',
        full_name: 'John Doe',
        role: 'student'
    },
    {
        id: 4,
        email: 'admin@admin.university.edu',
        password: 'password123',
        full_name: 'Admin User',
        role: 'admin'
    }
];

// Dummy Service Requests
const DEMO_REQUESTS = [
    {
        id: 1,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'classroom',
        title: 'Projector not working in Room 301',
        description: 'The projector in classroom 301 is not turning on. We have an important presentation tomorrow. Please fix it urgently.',
        image_path: null,
        status: 'pending',
        admin_notes: null,
        assigned_to: null,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 2,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'hostel',
        title: 'Water leakage in Hostel Block B',
        description: 'There is continuous water leakage from the ceiling in Room 205, Block B. The entire room is getting wet.',
        image_path: null,
        status: 'in_progress',
        admin_notes: 'Plumber has been assigned. Work in progress.',
        assigned_to: 'Maintenance Team',
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 3,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'library',
        title: 'AC not working in Reading Hall',
        description: 'The air conditioning in the main reading hall has stopped working. It is very hot and uncomfortable to study.',
        image_path: null,
        status: 'pending',
        admin_notes: null,
        assigned_to: null,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 4,
        user_id: 3,
        student_name: 'John Doe',
        student_email: 'john.doe@student.university.edu',
        category: 'laboratory',
        title: 'Computer Lab 2 - Multiple PCs not booting',
        description: 'Around 5 computers in Computer Lab 2 are not booting up. Students are unable to complete their assignments.',
        image_path: null,
        status: 'pending',
        admin_notes: null,
        assigned_to: null,
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 5,
        user_id: 3,
        student_name: 'John Doe',
        student_email: 'john.doe@student.university.edu',
        category: 'administrative',
        title: 'ID Card Printing Machine Down',
        description: 'The ID card printing machine at the admin office is not working. Need urgent repair.',
        image_path: null,
        status: 'pending',
        admin_notes: null,
        assigned_to: null,
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 6,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'classroom',
        title: 'Broken chairs in Room 105',
        description: 'Multiple chairs in classroom 105 are broken and uncomfortable to sit on. Need replacement.',
        image_path: null,
        status: 'in_progress',
        admin_notes: 'Furniture replacement order placed. Expected delivery in 2 days.',
        assigned_to: 'Maintenance Team',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 7,
        user_id: 3,
        student_name: 'John Doe',
        student_email: 'john.doe@student.university.edu',
        category: 'hostel',
        title: 'WiFi connectivity issues in Block A',
        description: 'WiFi is very slow and keeps disconnecting in Hostel Block A, Floor 3.',
        image_path: null,
        status: 'in_progress',
        admin_notes: 'Technician dispatched to check the issue. WiFi router replacement scheduled.',
        assigned_to: 'IT Department',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 8,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'laboratory',
        title: 'Microscopes need calibration in Biology Lab',
        description: 'Several microscopes in the biology lab are out of focus and need professional calibration.',
        image_path: null,
        status: 'in_progress',
        admin_notes: 'Scheduled for calibration on next Monday. External specialist will be called.',
        assigned_to: 'Laboratory Technician',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 9,
        user_id: 3,
        student_name: 'John Doe',
        student_email: 'john.doe@student.university.edu',
        category: 'library',
        title: 'Insufficient lighting in reference section',
        description: 'The reference section of the library has very dim lighting. Students are having difficulty reading.',
        image_path: null,
        status: 'in_progress',
        admin_notes: 'LED tube lights ordered. Installation planned for tomorrow.',
        assigned_to: 'Electrical Department',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 10,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'other',
        title: 'Parking lot pothole repair needed',
        description: 'Large potholes in the student parking lot near Gate 2. Risk of vehicle damage.',
        image_path: null,
        status: 'in_progress',
        admin_notes: 'Road repair work scheduled for this weekend.',
        assigned_to: 'Campus Maintenance',
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: null
    },
    {
        id: 11,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'classroom',
        title: 'Whiteboard markers needed in Room 202',
        description: 'All whiteboard markers in Room 202 are dried out. Please replace them.',
        image_path: null,
        status: 'resolved',
        admin_notes: 'New markers supplied to the classroom.',
        assigned_to: 'Stores Department',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 12,
        user_id: 3,
        student_name: 'John Doe',
        student_email: 'john.doe@student.university.edu',
        category: 'hostel',
        title: 'Broken window in Room 310',
        description: 'The window glass in my hostel room (310) is cracked and needs replacement.',
        image_path: null,
        status: 'resolved',
        admin_notes: 'Window glass replaced successfully.',
        assigned_to: 'Hostel Maintenance',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 13,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'laboratory',
        title: 'Chemistry Lab - Fume hood not working',
        description: 'The fume hood in Chemistry Lab is not extracting properly. Safety concern.',
        image_path: null,
        status: 'resolved',
        admin_notes: 'Fume hood motor repaired and tested. Working properly now.',
        assigned_to: 'Lab Safety Team',
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 14,
        user_id: 3,
        student_name: 'John Doe',
        student_email: 'john.doe@student.university.edu',
        category: 'library',
        title: 'Book request: Advanced Database Management',
        description: 'Please add more copies of "Advanced Database Management" by Ramakrishnan. Only 1 copy available.',
        image_path: null,
        status: 'resolved',
        admin_notes: '5 additional copies of the book have been added to the library collection.',
        assigned_to: 'Library Administration',
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
        updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 15,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'administrative',
        title: 'Certificate collection delay',
        description: 'My course completion certificate was supposed to be ready last week. Still not available.',
        image_path: null,
        status: 'resolved',
        admin_notes: 'Certificate issued and available for collection at counter 3.',
        assigned_to: 'Academic Office',
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        updated_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 16,
        user_id: 3,
        student_name: 'John Doe',
        student_email: 'john.doe@student.university.edu',
        category: 'classroom',
        title: 'Sound system issues in Auditorium',
        description: 'The microphone and speakers in the main auditorium are producing static noise.',
        image_path: null,
        status: 'resolved',
        admin_notes: 'Sound system serviced. Replaced faulty connectors and tested.',
        assigned_to: 'Audio-Visual Team',
        created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
        updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 17,
        user_id: 1,
        student_name: 'Demo Student',
        student_email: 'student@demo.com',
        category: 'other',
        title: 'Drinking water cooler empty in Block C',
        description: 'The water cooler on the 2nd floor of Academic Block C has been empty for 2 days.',
        image_path: null,
        status: 'resolved',
        admin_notes: 'Water cooler refilled and scheduled for regular maintenance.',
        assigned_to: 'Housekeeping',
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        resolved_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
];

// Mock API Functions
const DemoAPI = {
    // Authentication
    login: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

        const user = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        return {
            success: true,
            token: 'demo-jwt-token-' + user.id,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role
            }
        };
    },

    register: async (email, password, fullName) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if user already exists
        if (DEMO_USERS.find(u => u.email === email)) {
            throw new Error('Email already exists');
        }

        // Determine role based on email
        let role = 'student';
        if (email.includes('@admin')) {
            role = 'admin';
        }

        const newUser = {
            id: DEMO_USERS.length + 1,
            email,
            password,
            full_name: fullName,
            role
        };

        DEMO_USERS.push(newUser);

        return {
            success: true,
            message: 'User registered successfully',
            userId: newUser.id
        };
    },

    // Student APIs
    getUserRequests: async (userId, status = null) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        let requests = DEMO_REQUESTS.filter(r => r.user_id === userId);

        if (status) {
            requests = requests.filter(r => r.status === status);
        }

        return {
            success: true,
            requests: requests
        };
    },

    createRequest: async (userId, category, title, description) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = DEMO_USERS.find(u => u.id === userId);

        const newRequest = {
            id: DEMO_REQUESTS.length + 1,
            user_id: userId,
            student_name: user.full_name,
            student_email: user.email,
            category,
            title,
            description,
            image_path: null,
            status: 'pending',
            admin_notes: null,
            assigned_to: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            resolved_at: null
        };

        DEMO_REQUESTS.push(newRequest);

        return {
            success: true,
            message: 'Request created successfully',
            requestId: newRequest.id
        };
    },

    getRequestDetails: async (requestId) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const request = DEMO_REQUESTS.find(r => r.id === requestId);
        if (!request) {
            throw new Error('Request not found');
        }

        return {
            success: true,
            request
        };
    },

    // Admin APIs
    getAllRequests: async (status = null, category = null) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        let requests = [...DEMO_REQUESTS];

        if (status) {
            requests = requests.filter(r => r.status === status);
        }

        if (category) {
            requests = requests.filter(r => r.category === category);
        }

        return {
            success: true,
            requests
        };
    },

    getStatistics: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const pending = DEMO_REQUESTS.filter(r => r.status === 'pending').length;
        const in_progress = DEMO_REQUESTS.filter(r => r.status === 'in_progress').length;
        const resolved = DEMO_REQUESTS.filter(r => r.status === 'resolved').length;

        const byCategory = {
            classroom: DEMO_REQUESTS.filter(r => r.category === 'classroom').length,
            hostel: DEMO_REQUESTS.filter(r => r.category === 'hostel').length,
            laboratory: DEMO_REQUESTS.filter(r => r.category === 'laboratory').length,
            library: DEMO_REQUESTS.filter(r => r.category === 'library').length,
            administrative: DEMO_REQUESTS.filter(r => r.category === 'administrative').length,
            other: DEMO_REQUESTS.filter(r => r.category === 'other').length
        };

        return {
            success: true,
            statistics: {
                total_requests: DEMO_REQUESTS.length,
                pending,
                in_progress,
                resolved,
                by_category: byCategory,
                avg_resolution_time_hours: 48.5,
                resolved_today: 2
            }
        };
    },

    updateRequestStatus: async (requestId, status) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const request = DEMO_REQUESTS.find(r => r.id === requestId);
        if (!request) {
            throw new Error('Request not found');
        }

        request.status = status;
        request.updated_at = new Date().toISOString();

        if (status === 'resolved') {
            request.resolved_at = new Date().toISOString();
        }

        return {
            success: true,
            message: 'Request status updated successfully'
        };
    },

    assignRequest: async (requestId, assignedTo) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const request = DEMO_REQUESTS.find(r => r.id === requestId);
        if (!request) {
            throw new Error('Request not found');
        }

        request.assigned_to = assignedTo;
        request.updated_at = new Date().toISOString();

        return {
            success: true,
            message: 'Request assigned successfully'
        };
    },

    addAdminNotes: async (requestId, notes) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const request = DEMO_REQUESTS.find(r => r.id === requestId);
        if (!request) {
            throw new Error('Request not found');
        }

        request.admin_notes = notes;
        request.updated_at = new Date().toISOString();

        return {
            success: true,
            message: 'Notes added successfully'
        };
    }
};

// Export for use in app.js
if (typeof window !== 'undefined') {
    window.DEMO_MODE = DEMO_MODE;
    window.DemoAPI = DemoAPI;
}
