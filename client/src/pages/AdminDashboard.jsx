import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminRequests } from '../lib/api';
import RequestCard from '../components/RequestCard';
import RequestDetailsModal from '../components/RequestDetailsModal';
import { LogOut, Filter, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState({ pending: 0, in_progress: 0, resolved: 0, total_requests: 0 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [category, setCategory] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [statsData, requestsData] = await Promise.all([
                adminRequests.getStats(),
                adminRequests.getAll(filter === 'all' ? null : filter, category === 'all' ? null : category)
            ]);
            setStats(statsData.statistics);
            setRequests(requestsData.requests);
        } catch (error) {
            console.error("Failed to load admin data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [filter, category]);

    const handleUpdateStatus = async (id, status) => {
        await adminRequests.updateStatus(id, status);
        setSelectedRequest(null); // Close modal
        loadData(); // Reload
    };

    const handleAssign = async (id, assignedTo) => {
        await adminRequests.assign(id, assignedTo);
        loadData(); // Reload to update list if needed, though details usually update
        // We probably want to keep the modal open and refresh the request object?
        // For simplicity, close and reload.
        setSelectedRequest(null);
    };

    const handleAddNotes = async (id, notes) => {
        await adminRequests.addNotes(id, notes);
        setSelectedRequest(null);
        loadData();
    };

    return (
        <div className="page" id="admin-dashboard">
            <nav className="navbar">
                <div className="navbar-brand">
                    <div className="logo-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span>SCSRP Admin</span>
                </div>
                <div className="navbar-user">
                    <div className="user-info">
                        <span className="user-name" id="admin-name">{user?.full_name}</span>
                        <span className="user-role">Administrator</span>
                    </div>
                    <button className="btn btn-ghost" onClick={logout} id="admin-logout">Logout</button>
                </div>
            </nav>

            <div className="dashboard-container">
                <div className="dashboard-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Manage all campus service requests</p>
                    </div>
                </div>

                <div className="stats-grid" id="admin-stats">
                    <div className="stat-card">
                        <div className="stat-icon pending">
                            <AlertCircle size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-label">Pending</span>
                            <span className="stat-value">{stats.pending}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon in-progress">
                            <Clock size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-label">In Progress</span>
                            <span className="stat-value">{stats.in_progress}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon resolved">
                            <CheckCircle size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-label">Resolved</span>
                            <span className="stat-value">{stats.resolved}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon total">
                            <FileText size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-label">Total Requests</span>
                            <span className="stat-value">{stats.total_requests}</span>
                        </div>
                    </div>
                </div>

                <div className="filter-section">
                    <div className="filter-tabs">
                        {['all', 'pending', 'in_progress', 'resolved'].map(status => (
                            <button
                                key={status}
                                className={`tab-btn ${filter === status ? 'active' : ''}`}
                                onClick={() => setFilter(status)}
                            >
                                {status === 'all' ? 'All Requests' : status.replace('_', ' ')}
                            </button>
                        ))}
                    </div>

                    <div className="filter-dropdown">
                        <select
                            id="category-filter"
                            className="filter-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="classroom">Classroom</option>
                            <option value="hostel">Hostel</option>
                            <option value="laboratory">Laboratory</option>
                            <option value="library">Library</option>
                            <option value="administrative">Administrative</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="requests-grid" id="admin-requests">
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
                                isAdmin={true}
                                onClick={setSelectedRequest}
                            />
                        ))
                    )}
                </div>
            </div>

            {selectedRequest && (
                <RequestDetailsModal
                    request={selectedRequest}
                    isAdmin={true}
                    onClose={() => setSelectedRequest(null)}
                    onUpdateStatus={handleUpdateStatus}
                    onAssign={handleAssign}
                    onAddNotes={handleAddNotes}
                />
            )}
        </div>
    );
};
export default AdminDashboard;
