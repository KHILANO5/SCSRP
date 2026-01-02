import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Zap } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const scrollToFeatures = () => {
        const element = document.getElementById('features');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="page" id="home-page">
            <nav className="navbar landing-nav">
                <div className="navbar-brand">
                    <div className="logo-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span>SCSRP</span>
                </div>
                <div className="navbar-actions">
                    <Link to="/auth?view=login" className="btn btn-ghost">Login</Link>
                    <Link to="/auth?view=register" className="btn btn-primary">Get Started</Link>
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-content">
                    <h1>Report & Track Campus Issues <span className="text-gradient">Instantly</span></h1>
                    <p className="hero-subtitle">The centralized platform for maintaining our smart campus. Report facilities
                        issues, track status in real-time, and ensure a better learning environment.</p>
                    <div className="hero-buttons">
                        <Link to="/auth?view=register" className="btn btn-primary btn-lg">
                            <span>Report an Issue</span>
                            <ArrowRight size={20} />
                        </Link>
                        <button className="btn btn-ghost btn-lg" onClick={scrollToFeatures}>How it Works</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-card card-1">
                        <div className="icon-box">🏫</div>
                        <div className="card-text">
                            <span className="card-title">Classroom 301</span>
                            <span className="card-status pending">Pending</span>
                        </div>
                    </div>
                    <div className="visual-card card-2">
                        <div className="icon-box">🔬</div>
                        <div className="card-text">
                            <span className="card-title">Lab Equipment</span>
                            <span className="card-status in-progress">In Progress</span>
                        </div>
                    </div>
                    <div className="visual-orbs">
                        <div className="orb orb-1"></div>
                        <div className="orb orb-2"></div>
                    </div>
                </div>
            </header>

            <section className="features-section" id="features">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <BookOpen size={32} />
                        </div>
                        <h3>Easy Reporting</h3>
                        <p>Submit service requests in seconds using our intuitive interface. Upload photos to help identify
                            the issue.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Clock size={32} />
                        </div>
                        <h3>Real-time Tracking</h3>
                        <p>Stay updated with instant status changes. know exactly when your request is received, assigned,
                            and resolved.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Zap size={32} />
                        </div>
                        <h3>Quick Resolution</h3>
                        <p>Direct connection to maintenance teams ensures faster response times and efficient campus
                            management.</p>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <p>&copy; 2026 Smart Campus Service Request Portal</p>
            </footer>
        </div>
    );
};
export default LandingPage;
