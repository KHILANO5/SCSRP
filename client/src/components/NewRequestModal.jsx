import React, { useState } from 'react';
import { X } from 'lucide-react';

const NewRequestModal = ({ onClose, onSubmit }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('category', e.target.category.value);
        formData.append('title', e.target.title.value);
        formData.append('description', e.target.description.value);

        const imageFile = e.target.image.files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal active" id="new-request-modal">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create New Request</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="request-category">Category</label>
                        <select id="request-category" name="category" required>
                            <option value="">Select a category</option>
                            <option value="classroom">Classroom</option>
                            <option value="hostel">Hostel</option>
                            <option value="laboratory">Laboratory</option>
                            <option value="library">Library</option>
                            <option value="administrative">Administrative</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="request-title">Title</label>
                        <input type="text" id="request-title" name="title" placeholder="Brief description of the issue" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="request-description">Description</label>
                        <textarea id="request-description" name="description" rows="4" placeholder="Provide detailed information about the issue" required></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="request-image">Image (Optional)</label>
                        <input type="file" id="request-image" name="image" accept="image/jpeg,image/jpg,image/png" />
                        <small className="form-hint">Max 5MB. Formats: JPG, PNG</small>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewRequestModal;
