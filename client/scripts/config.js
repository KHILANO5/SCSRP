// ============================================
// SCSRP Frontend Configuration
// ============================================
// This file contains all configurable settings for the frontend.
// Modify these values to customize the application without editing the main code.

const CONFIG = {
    // API Configuration
    api: {
        baseUrl: 'http://localhost:3000/api',
        timeout: 30000, // Request timeout in milliseconds
    },

    // Authentication
    auth: {
        tokenKey: 'token',
        userKey: 'user',
        tokenExpiry: 86400000, // 24 hours in milliseconds
    },

    // UI Configuration
    ui: {
        toastDuration: 3000, // Toast notification duration in ms
        animationDuration: 250, // Default animation duration in ms

        // Items per page for pagination (future feature)
        itemsPerPage: 12,

        // Date format
        dateFormat: {
            locale: 'en-US',
            options: {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }
        }
    },

    // File Upload
    upload: {
        maxSize: 5 * 1024 * 1024, // 5MB in bytes
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png'],
        allowedExtensions: ['.jpg', '.jpeg', '.png']
    },

    // Categories
    categories: [
        { value: 'classroom', label: 'Classroom', icon: '🏫' },
        { value: 'hostel', label: 'Hostel', icon: '🏠' },
        { value: 'laboratory', label: 'Laboratory', icon: '🔬' },
        { value: 'library', label: 'Library', icon: '📚' },
        { value: 'administrative', label: 'Administrative', icon: '🏢' },
        { value: 'other', label: 'Other', icon: '📋' }
    ],

    // Status Configuration
    statuses: {
        pending: {
            label: 'Pending',
            color: '#F59E0B',
            bgColor: 'hsl(35, 92%, 95%)'
        },
        in_progress: {
            label: 'In Progress',
            color: '#3B82F6',
            bgColor: 'hsl(210, 85%, 95%)'
        },
        resolved: {
            label: 'Resolved',
            color: '#10B981',
            bgColor: 'hsl(145, 65%, 95%)'
        }
    },

    // Email Domain Validation
    emailDomains: {
        student: '@student.university.edu',
        admin: '@admin.university.edu'
    },

    // Feature Flags (for future enhancements)
    features: {
        enableNotifications: false,
        enableRealTimeUpdates: false,
        enableExport: false,
        enableSearch: false,
        enableDarkModeToggle: false
    },

    // Branding
    branding: {
        appName: 'SCSRP',
        fullName: 'Smart Campus Service Request Portal',
        tagline: 'Centralized platform for campus facility management',

        // Logo (if you want to use an image instead of SVG)
        logoUrl: null, // Set to image path if needed

        // Footer
        footerText: 'Created for Hackathon Project',
        year: 2026
    },

    // Theme Colors (HSL values)
    theme: {
        primary: {
            hue: 250,
            saturation: 85,
            lightness: 58
        },
        // Add more theme customization here
    },

    // Error Messages
    messages: {
        errors: {
            network: 'Network error. Please check your connection.',
            unauthorized: 'Session expired. Please login again.',
            forbidden: 'You do not have permission to perform this action.',
            notFound: 'The requested resource was not found.',
            serverError: 'Server error. Please try again later.',
            invalidEmail: 'Please use a valid university email address.',
            invalidFile: 'Invalid file type or size. Please upload a JPG or PNG image under 5MB.'
        },
        success: {
            login: 'Login successful!',
            register: 'Registration successful! Please login.',
            requestCreated: 'Request created successfully!',
            requestUpdated: 'Request updated successfully!',
            statusUpdated: 'Status updated successfully!',
            assigned: 'Request assigned successfully!',
            notesAdded: 'Notes added successfully!'
        }
    },

    // Development Mode
    dev: {
        enableDebugLogs: false,
        mockAPI: false, // Set to true to use mock data instead of API
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
