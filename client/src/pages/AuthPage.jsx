import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/api';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const searchParams = new URLSearchParams(location.search);
    const initialView = searchParams.get('view') === 'register' ? 'register' : 'login';

    const [view, setView] = useState(initialView);
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setView(searchParams.get('view') === 'register' ? 'register' : 'login');
        setError('');
        setSuccess('');
    }, [location.search]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            if (role === 'student' && !email.includes('student') && !email.includes('@demo.com')) {
                throw new Error('Please use your student email (@student.university.edu)');
            }
            if (role === 'admin' && !email.includes('admin') && !email.includes('@demo.com')) {
                throw new Error('Please use your admin email (@admin.university.edu)');
            }

            const response = await auth.login(email, password);

            if (response.user.role !== role) {
                auth.logout(); // Clear token just in case
                throw new Error(`This account is registered as a ${response.user.role}, but you tried to login as ${role}.`);
            }

            login(response.user, response.token);
            navigate(response.user.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            if (role === 'student' && !email.endsWith('@student.university.edu')) {
                throw new Error('Student email must end with @student.university.edu');
            }
            if (role === 'admin' && !email.endsWith('@admin.university.edu')) {
                throw new Error('Admin email must end with @admin.university.edu');
            }

            await auth.register(email, password, name);
            setSuccess('Registration successful! Please login.');
            navigate('/auth?view=login');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page" id="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="logo-container">
                            <div className="logo-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h1>SCSRP</h1>
                        </div>
                        <p className="subtitle">Smart Campus Service Request Portal</p>
                    </div>

                    <div className="role-switch-container">
                        <div className="role-switch">
                            <button
                                className={`role-btn ${role === 'student' ? 'active' : ''}`}
                                onClick={() => setRole('student')}
                            >
                                Student
                            </button>
                            <button
                                className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                                onClick={() => setRole('admin')}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-lg" style={{ color: 'var(--status-pending)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-lg" style={{ color: 'var(--status-resolved)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={16} /> {success}
                        </div>
                    )}

                    {view === 'login' ? (
                        <form onSubmit={handleLogin} className="auth-form active">
                            <h2>{role === 'student' ? 'Student' : 'Admin'} Login</h2>
                            <p className="form-subtitle">Sign in to manage your service requests</p>

                            <div className="form-group">
                                <label htmlFor="login-email">Email Address</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    placeholder={role === 'student' ? "student@student.university.edu" : "admin@admin.university.edu"}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <input type="password" id="login-password" name="password" placeholder="Enter your password" required />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                                {!loading && <ArrowRight size={20} />}
                            </button>

                            <p className="form-switch">
                                Don't have an account?
                                <Link to="/auth?view=register">Create Account</Link>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="auth-form active">
                            <h2>{role === 'student' ? 'Student' : 'Admin'} Registration</h2>
                            <p className="form-subtitle">Join the campus service portal</p>

                            <div className="form-group">
                                <label htmlFor="register-name">Full Name</label>
                                <input type="text" id="register-name" name="name" placeholder="John Doe" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="register-email">Email Address</label>
                                <input
                                    type="email"
                                    id="register-email"
                                    name="email"
                                    placeholder={role === 'student' ? "your.email@university.edu" : "your.email@university.edu"}
                                    required
                                />
                                <small className="form-hint">Use @student.university.edu or @admin.university.edu</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="register-password">Password</label>
                                <input type="password" id="register-password" name="password" placeholder="Create a strong password" required />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                                <span>{loading ? 'Creating...' : 'Create Account'}</span>
                                {!loading && <ArrowRight size={20} />}
                            </button>

                            <p className="form-switch">
                                Already have an account?
                                <Link to="/auth?view=login">Sign In</Link>
                            </p>
                        </form>
                    )}
                </div>

                <div className="auth-background">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>
            </div>
        </div>
    );
};
export default AuthPage;
