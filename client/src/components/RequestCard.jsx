import React from 'react';
import { formatDate, getCategoryIcon } from '../lib/utils';

const RequestCard = ({ request, onClick, isAdmin = false }) => {
    return (
        <div className="request-card" onClick={() => onClick(request)}>
            <div className="request-card-header">
                <span className="request-category">
                    {getCategoryIcon(request.category)} {request.category}
                </span>
                <span className={`request-status ${request.status}`}>
                    {request.status.replace('_', ' ')}
                </span>
            </div>
            <h3 className="request-title">{request.title}</h3>
            <p className="request-description">{request.description}</p>
            <div className="request-meta">
                {isAdmin ? (
                    <div className="request-student">
                        <strong>{request.student_name}</strong>
                        <span>{request.student_email}</span>
                    </div>
                ) : null}
                <span className="request-date">{formatDate(request.created_at)}</span>
            </div>
        </div>
    );
};

export default RequestCard;
