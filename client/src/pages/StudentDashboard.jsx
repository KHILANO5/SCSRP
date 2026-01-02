import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userRequests } from '../lib/api';
import RequestCard from '../components/RequestCard';
import NewRequestModal from '../components/NewRequestModal';
import RequestDetailsModal from '../components/RequestDetailsModal';
import { Plus, LogOut } from 'lucide-react';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const loadRequests = async (status = null) => {
        setLoading(true);
        try {
            const data = await userRequests.getAll(status === 'all' ? null : status);
            setRequests(data.requests);
        } catch (error) {
            console.error("Failed to load requests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests(filter);
    }, [filter]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleCreateRequest = async (formData) => {
        await userRequests.create(formData);
        setIsNewRequestModalOpen(false);
        loadRequests(filter); // Reload
    };

    // Need to handle closing details modal
    // And refreshing logic if something changed? Student dashboard is read-only for updates usually, 
    // unless creating.

    return (
        <div className="page" id="student-dashboard">
            <nav className="navbar">
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
                <div className="navbar-user">
                    <div className="user-info">
                        <span className="user-name" id="student-name">{user?.full_name}</span>
                        <span className="user-role">Student</span>
                    </div>
                    <button className="btn btn-ghost" onClick={logout} id="student-logout">Logout</button>
                </div>
            </nav>

            <div className="dashboard-container">
                <div className="dashboard-header">
                    <div>
                        <h1>My Service Requests</h1>
                        <p>Track and manage your campus facility requests</p>
                    </div>
                    <button className="btn btn-primary" id="new-request-btn" onClick={() => setIsNewRequestModalOpen(true)}>
                        <Plus size={20} />
                        <span>New Request</span>
                    </button>
                </div>

                <div className="filter-tabs">
                    {['all', 'pending', 'in_progress', 'resolved'].map(status => (
                        <button
                            key={status}
                            className={`tab-btn ${filter === status ? 'active' : ''}`}
                            onClick={() => handleFilterChange(status)}
                        >
                            {status === 'all' ? 'All Requests' : status.replace('_', ' ')}
                            {/* Simple text formatting, could use CSS capitalize */}
                            <span style={{ textTransform: 'capitalize' }}></span>
                        </button>
                    ))}
                </div>

                <div className="requests-grid" id="student-requests">
                    {loading ? (
                        <div className="loading"></div>
                    ) : requests.length === 0 ? (
                        <div className="empty-state">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p>No requests found</p>
                        </div>
                    ) : (
                        requests.map(request => (
                            <RequestCard
                                key={request.id}
                                request={request}
                                onClick={setSelectedRequest}
                            />
                        ))
                    )}
                </div>
            </div>

            {isNewRequestModalOpen && (
                <NewRequestModal
                    onClose={() => setIsNewRequestModalOpen(false)}
                    onSubmit={handleCreateRequest}
                />
            )}

            {selectedRequest && (
                <RequestDetailsModal
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                // Student can't update status/assign
                />
            )}
        </div>
    );
};
export default StudentDashboard;
