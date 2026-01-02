import React, { useState } from 'react';
import { X } from 'lucide-react';
import { getCategoryIcon, formatDate } from '../lib/utils';
import { API_BASE_URL } from '../lib/api';

const RequestDetailsModal = ({ request, onClose, isAdmin = false, onUpdateStatus, onAssign, onAddNotes }) => {

    if (!request) return null;

    const [processing, setProcessing] = useState(false);

    const handleUpdateStatus = async (status) => {
        if (processing) return;
        setProcessing(true);
        try {
            await onUpdateStatus(request.id, status);
        } finally {
            setProcessing(false);
        }
    };

    const handleAssign = async () => {
        const assignedTo = prompt('Assign to (department/person):', request.assigned_to || '');
        if (assignedTo && assignedTo !== request.assigned_to) {
            setProcessing(true);
            try {
                await onAssign(request.id, assignedTo);
            } finally {
                setProcessing(false);
            }
        }
    };

    const handleAddNotes = async () => {
        const notes = prompt('Enter admin notes:', request.admin_notes || '');
        if (notes !== null) { // Allow empty string to clear? Logic says add notes.
            setProcessing(true);
            try {
                await onAddNotes(request.id, notes);
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <div className="modal active" id="request-details-modal">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content modal-large">
                <div className="modal-header">
                    <h2>Request Details</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div id="request-details-content">
                    <div className="detail-section">
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Category</span>
                                <span className="detail-value">{getCategoryIcon(request.category)} {request.category}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Status</span>
                                <span className={`request-status ${request.status}`}>{request.status.replace('_', ' ')}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Created</span>
                                <span className="detail-value">{formatDate(request.created_at)}</span>
                            </div>
                            {request.resolved_at && (
                                <div className="detail-item">
                                    <span className="detail-label">Resolved</span>
                                    <span className="detail-value">{formatDate(request.resolved_at)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {isAdmin && request.student_name && (
                        <div className="detail-section">
                            <h3>Student Information</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Name</span>
                                    <span className="detail-value">{request.student_name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Email</span>
                                    <span className="detail-value">{request.student_email}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="detail-section">
                        <h3>Request Details</h3>
                        <div className="detail-item">
                            <span className="detail-label">Title</span>
                            <span className="detail-value"><strong>{request.title}</strong></span>
                        </div>
                        <div className="detail-item mt-lg">
                            <span className="detail-label">Description</span>
                            <span className="detail-value">{request.description}</span>
                        </div>
                        {request.image_path && (
                            <img src={`${API_BASE_URL.replace('/api', '')}${request.image_path}`} alt="Request image" className="detail-image" />
                        )}
                    </div>

                    {(request.assigned_to || request.admin_notes) && (
                        <div className="detail-section">
                            <h3>Admin Information</h3>
                            {request.assigned_to && (
                                <div className="detail-item">
                                    <span className="detail-label">Assigned To</span>
                                    <span className="detail-value">{request.assigned_to}</span>
                                </div>
                            )}
                            {request.admin_notes && (
                                <div className="detail-item mt-lg">
                                    <span className="detail-label">Admin Notes</span>
                                    <span className="detail-value">{request.admin_notes}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {isAdmin && (
                        <div className="admin-actions">
                            {request.status !== 'in_progress' && (
                                <button className="btn btn-info" onClick={() => handleUpdateStatus('in_progress')} disabled={processing}>
                                    Mark In Progress
                                </button>
                            )}
                            {request.status !== 'resolved' && (
                                <button className="btn btn-success" onClick={() => handleUpdateStatus('resolved')} disabled={processing}>
                                    Mark Resolved
                                </button>
                            )}
                            <button className="btn btn-ghost" onClick={handleAssign} disabled={processing}>
                                {request.assigned_to ? 'Reassign' : 'Assign'}
                            </button>
                            <button className="btn btn-ghost" onClick={handleAddNotes} disabled={processing}>
                                {request.admin_notes ? 'Update Notes' : 'Add Notes'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsModal;
